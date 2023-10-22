import { db } from "@/db";
import getId from "./getId";




export default async function getUser(){
    const user_id = await getId();
    if (user_id === undefined){
        return null
    }
    const user = await db.user.findFirst({
        where:{
            id:user_id
        }
    })
    // console.log(user)
    return user
}