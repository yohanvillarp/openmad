import { DomainException } from '../../../../core/domain/domain-exception.base.js';

export class TramiteNoEncontradoException extends DomainException {
  public readonly code = 'TRAMITE_NOT_FOUND';

  constructor(criterio: string) {
    super(`No se encontró el trámite con criterio: '${criterio}'.`);
  }
}
