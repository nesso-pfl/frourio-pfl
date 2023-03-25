type DatetimeString = string
type DateToString<T> = T extends Date
  ? DatetimeString
  : T extends Record<string, unknown> | unknown[]
  ? { [K in keyof T]: DateToString<T[K]> }
  : T

export type Request<T> = DateToString<T>
export type Response<T extends Record<string, unknown>> = DateToString<T>

export class AppError<ErrorCode> extends Error {
  code: ErrorCode
  constructor(code: ErrorCode) {
    super()
    this.code = code
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
