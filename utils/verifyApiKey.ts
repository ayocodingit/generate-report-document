const verifyApiKey = async (apiKey: string) => {
  if (apiKey !== process.env.API_KEY) throw Error('Api Key is invalid')
}

export default verifyApiKey
