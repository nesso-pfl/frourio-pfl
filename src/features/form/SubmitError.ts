export type SubmitError<T extends Record<string, unknown>> = { field: keyof T; message: string }
