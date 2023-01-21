export const executeSafe = async (fn: Promise<any>) => {
  try {
    return { result: await fn }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return { error }
  }
}
