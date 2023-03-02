export class AppError<ErrorCode> extends Error {
  code: ErrorCode
  constructor(code: ErrorCode) {
    super()
    this.code = code
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
