# Pdfbard - A Modern Fullstack SaaS-Platform based on google palm 2 api

Built with the Next.js 13.5 App Router, tRPC, TypeScript, Prisma & Tailwind

![Project Image](https://github.com/ismail-mirza/pdfbard/blob/master/public/thumbnail.png)

## Features

- 🛠️ Complete SaaS Built From Scratch
- 💻 Beautiful Landing Page & Pricing Page Included
- 💳 Free & Pro Plan Using Stripe
- 📄 A Beautiful And Highly Functional PDF Viewer
- 🔄 Streaming API Responses in Real-Time
- 🔒 Authentication Using Kinde
- 🎨 Clean, Modern UI Using 'shadcn-ui'
- 🚀 Optimistic UI Updates for a Great UX
- ⚡ Infinite Message Loading for Performance
- 📤 Intuitive Drag n’ Drop Uploads
- ✨ Instant Loading States
- 🔧 Modern Data Fetching Using tRPC & Zod
- 🧠 LangChain for Infinite AI Memory
- 🌲 Pinecone as our Vector Storage
- 📊 Prisma as our ORM
- 🔤 100% written in TypeScript
- 🎁 ...much more

## Getting started

To get started with this project, run

```bash
  git clone  https://github.com/Ismail-Mirza/pdfbard.git
```
To Install dependency

```bash
   yarn install or yarn
  
```

and copy the .env.example variables into a separate .env file, fill them out & and that's all you need to get started!
```bash


# Database for storing everything except PDF files - (Provider up to you, I like PlanetScale)
DATABASE_URL=

# Uploadthing for storing PDF files - https://uploadthing.com/dashboard
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=



# Stripe for payment processing - https://stripe.com/
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Pinecone for long-term vector storage - https://www.pinecone.io/
PINECONE_API_KEY=
PINECONE_ENVIRONMENT = 
#hanko 


NEXT_PUBLIC_HANKO_API_URL = 

#google api key for palm 2 
GOOGLE_API_KEY = 
#this api is made by me for loading load vector
NEXT_PUBLIC_LOAD_VECTOR_URL=https://apibud.ishara.tech
NEXT_PUBLIC_LOAD_VECTOR_API_KEY = 

```


## Acknowledgements
- [Josha](https://github.com/joschan21) based on his ui


## License