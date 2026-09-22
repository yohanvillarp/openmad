import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';
import { DomainException } from '../../domain/domain-exception.base.js';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DomainExceptionFilter.name);

  catch(exception: DomainException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.BAD_REQUEST;

    if (exception.code.includes('NOT_FOUND')) {
      status = HttpStatus.NOT_FOUND;
    } else if (exception.code.includes('UNAUTHORIZED') || exception.code.includes('FORBIDDEN')) {
      status = HttpStatus.FORBIDDEN;
    } else if (exception.code.includes('CONFLICT') || exception.code.includes('ALREADY_EXISTS')) {
      status = HttpStatus.CONFLICT;
    }

    this.logger.warn(`[${exception.code}] ${exception.message}`);

    response.status(status).json({
      statusCode: status,
      error: exception.code,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
