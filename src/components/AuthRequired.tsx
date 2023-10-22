"use client"
import React, { useEffect } from "react"
import { Hanko } from "@teamhanko/hanko-elements";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

const hankoApi:any = process.env.NEXT_PUBLIC_HANKO_API_URL;

const AuthRequired = ({
    children
}:{
    children:React.ReactNode
})=>{
    const hanko = new Hanko(hankoApi);
    const router = useRouter()
    const {toast} = useToast()
    const getUser = async ()=>{
        try {
            const user:any = await hanko.user.getCurrent()
            user

        } catch (error) {
            console.log(error)
            router.replace("/auth/login");
         
        }
    }
    
   getUser()

   return <>{children}</>


    

}

export default AuthRequired