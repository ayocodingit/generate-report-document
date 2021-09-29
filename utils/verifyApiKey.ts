const verifyApiKey = (apiKey: string): void => {
  if (apiKey !== process.env.API_KEY) throw Error('Api Key is invalid')
}

export default verifyApiKey
