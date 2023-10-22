import { PineconeClient } from '@pinecone-database/pinecone'
const envir:any=process.env.PINECONE_ENVIRONMENT
const key :any =process.env.PINECONE_API_KEY
export const getPineconeClient = async () => {
  const client = new PineconeClient()

  await client.init({
    apiKey: key,
    environment: envir,
  })

  return client
}