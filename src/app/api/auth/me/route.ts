import { cookies } from "next/headers";
import * as jose from "jose";

async function userId() {
  const token = cookies().get("hanko")?.value;
  const payload = jose.decodeJwt(token ?? "");

  const userID = payload.sub;
  return userID;
}




export async function GET(request:Request) {
    const resp=new Response()
    
    return resp
}


