import { BaseException } from './base-exception'

const PASSWORD_ALREADY_SET_ERROR_CODE = 400

export class PasswordAlreadySetException extends BaseException {
  public readonly code: number

  constructor() {
    super('Password is already set for this player.')
    this.name = 'PasswordAlreadySetException'
    this.code = PASSWORD_ALREADY_SET_ERROR_CODE
  }
}
