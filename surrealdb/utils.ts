export const executeSafe = async <T>(fn: Promise<T>) => {
  try {
    return { result: await fn }
  } catch (error) {
    console.log(error)
    return { error }
  }
}
