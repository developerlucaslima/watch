import { BaseException } from './base-exception'

const BAD_REQUEST_ERROR_CODE = 400

export class InvalidRequestException extends BaseException {
  public readonly code: number

  constructor(message: string) {
    super(`Invalid request: ${message}`)
    this.name = 'InvalidRequestException'
    this.code = BAD_REQUEST_ERROR_CODE
  }
}
