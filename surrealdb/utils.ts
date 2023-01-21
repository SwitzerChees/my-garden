export const executeSafe = async <T>(fn: Promise<T>) => {
  try {
    return { result: await fn }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return { error }
  }
}
