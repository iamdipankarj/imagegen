export function getFormattedError(error: any) {
  if (error instanceof Error) {
    return error.message
  }
  return JSON.stringify(error)
}
