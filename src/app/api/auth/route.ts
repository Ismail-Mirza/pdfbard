import { db } from "@/db";
import { serialize } from "cookie";




export  async function POST(request:Request) {
 
    // Handle the POST request here
    // You can access request data using req.body
    const data = await request.json();
    const {id,email} = data;
    if (!id || !email){
        return Response.json({
            message:"Missing Data in body",
            
        },{
            status:404
        })
    }

    const already_user = await db.user.findFirst({
      where:{
        id:id
      }
    })
    if (already_user)
    { 
      
      const ck = serialize("user_id",id,{
        secure:process.env.NODE_ENV === "production",
        httpOnly:true,
        path:"/",
      })
      const resp = Response.json({
        message:"User already existed and init login",
        
    },{
        status:200
    })
    
    resp.headers.set("Set-Cookie",ck)
    return resp
    }
    try {
        const user = await db.user.create({
          data: {
            id: id,
            email: email,
          },
        });
        const ck = serialize("user_id",user.id,{
          secure:process.env.NODE_ENV === "production",
          httpOnly:true,
          path:"/",
        })
        const resp = Response.json(
          {
              message:"Account is created",
              user: user
          },
          {
              status:201
          }
      )
      resp.headers.set('Set-Cookie',ck);
  
        return resp
      } catch (error) {
        console.log(error)
        return Response.json({ message: 'Failed to save user' },{status:400})
      }
    
  



   
}


