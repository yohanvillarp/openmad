import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { DomainException } from '../../domain/domain-exception.base.js';

/**
 * Filtro global de excepciones que intercepta cualquier error no controlado.
 *
 * Objetivo de Seguridad:
 * - Evita la fuga de información sensible (stack traces, consultas SQL, detalles internos de BD).
 * - Registra el error completo en Pino para diagnóstico de los desarrolladores.
 * - Devuelve al cliente una respuesta uniforme y segura.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let message = 'Ha ocurrido un error interno en el servidor.';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'object' && res !== null) {
        const resObj = res as Record<string, unknown>;
        errorCode = (resObj.error as string) ?? exception.name;
        message = (resObj.message as string) ?? exception.message;
      } else {
        errorCode = exception.name;
        message = String(res);
      }
    } else if (exception instanceof DomainException) {
      errorCode = exception.code;
      message = exception.message;

      if (exception.code.includes('NOT_FOUND')) {
        status = HttpStatus.NOT_FOUND;
      } else if (exception.code.includes('UNAUTHORIZED') || exception.code.includes('FORBIDDEN')) {
        status = HttpStatus.FORBIDDEN;
      } else if (exception.code.includes('CONFLICT') || exception.code.includes('ALREADY_EXISTS')) {
        status = HttpStatus.CONFLICT;
      } else {
        status = HttpStatus.BAD_REQUEST;
      }
    } else if (exception instanceof Error) {
      // Registra el error interno completo con stack trace en los logs de Pino
      this.logger.error(
        `Error inesperado en [${request.method} ${request.url}]: ${exception.message}`,
        exception.stack,
      );
    } else {
      this.logger.error(
        `Error no identificado en [${request.method} ${request.url}]: ${String(exception)}`,
      );
    }

    response.status(status).json({
      statusCode: status,
      error: errorCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
