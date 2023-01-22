export const executeSafe = async <T>(fn: Promise<any>) => {
  try {
    return { result: await fn } as { result: T; error?: undefined }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return { error } as { result?: T; error?: Error }
  }
}
