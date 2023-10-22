import { cookies } from "next/headers";
import * as jose from "jose";

export default async function getId() {
  const token = cookies().get("hanko")?.value;
  if(token === undefined)
  {
    return token
  }
  const payload = jose.decodeJwt(token??"");

  const userID = payload.sub;
  return userID;
}