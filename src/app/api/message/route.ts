import { db } from '@/db'
import { getPineconeClient } from '@/lib/pinecone'
import { SendMessageValidator } from '@/lib/validators/SendMessageValidator'
import { GooglePaLMEmbeddings } from 'langchain/embeddings/googlepalm'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { NextRequest } from 'next/server'
import {DiscussServiceClient} from "@google-ai/generativelanguage"
import  { GoogleAuth }  from "google-auth-library";


const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(process.env.GOOGLE_API_KEY||''),
});

import getUser from '@/lib/getUser'

export const POST = async (req: NextRequest) => {
  // endpoint for asking a question to a pdf file

  const body = await req.json()

  const user =await getUser()

  const userId = user?.id;
  if (!userId)
    return new Response('Unauthorized', { status: 401 })

  const { fileId, message } =
    SendMessageValidator.parse(body)

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId,
    },
  })

  if (!file)
    return new Response('Not found', { status: 404 })

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId,
      fileId,
    },
  })

  // 1: vectorize message
  const embeddings = new GooglePaLMEmbeddings(
    {
      apiKey: "AIzaSyAMh3fYEQD5sT-Bjv4TpLYZSAZb_88w35s", // or set it in environment variable as `GOOGLE_PALM_API_KEY`
      modelName: "models/embedding-gecko-001", // OPTIONAL
    }
  )
  const pinecone = await getPineconeClient()
  const pineconeIndex = pinecone.Index('quill')

  const vectorStore = await PineconeStore.fromExistingIndex(
    embeddings,
    {
      pineconeIndex,
      namespace:file.id,
    }
  )

  const results = await vectorStore.similaritySearch(
    message,
    4
  )

  const prevMessages = await db.message.findMany({
    where: {
      fileId,
    },
    orderBy: {
      createdAt: 'asc',
    },
    take: 6,
  })

  const formattedPrevMessages = prevMessages.map((msg) => ({
    role: msg.isUserMessage
      ? ('user' as const)
      : ('assistant' as const),
    content: msg.text,
  }))
//   [
//     {
//       role: 'system',
//       content:
//         'Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.',
//     },
//     {
//       role: 'user',
//       content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
      
// \n----------------\n

// PREVIOUS CONVERSATION:
// ${formattedPrevMessages.map((message) => {
//   if (message.role === 'user')
//     return `User: ${message.content}\n`
//   return `Assistant: ${message.content}\n`
// })}

// \n----------------\n

// CONTEXT:
// ${results.map((r) => r.pageContent).join('\n\n')}

// USER INPUT: `,
//     },
//   ]
  const prompt = {
    model:"models/chat-bison-001",
    temperature: 0,
    stream: true,
    prompt:{
      context:`
      Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
              
        \n----------------\n
        
        PREVIOUS CONVERSATION:
        ${formattedPrevMessages.map((message) => {
          if (message.role === 'user')
            return `user_query: ${message.content}\n`
          return `assistant_response: ${message.content}\n`
        })}
        
        \n----------------\n
        
        CONTEXT:
        ${results.map((r) => r.pageContent).join('\n\n')}
        `,
      messages:[{ content: message }]
    } 
  }
  const result:any = await client.generateMessage(prompt)
  console.log(results)
   const response:any=result[0]?.candidates[0]?.content
   console.log(response)
   await db.message.create({
          data: {
            text:response,
            isUserMessage: false,
            fileId,
            userId,
          },
        })


  return Response.json({ message: response },{status:200})
}
