"use client"

import React, { useEffect, useState } from "react"
import { Hanko } from "@teamhanko/hanko-elements";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
 
const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL;


const LogoutButton =({children}:any)=>{
    const router = useRouter();
  const [hanko, setHanko] = useState<Hanko>();
  const {toast} = useToast()
 
  useEffect(() => {
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoApi ?? ""))
    );
  }, []);
  const logout = async () => {
    try {
      await hanko?.user.logout();
      router.push("/auth/login");
      router.refresh();
      return toast({
        title: 'Logout Successful',
        description: 'Please login in for using the application',
        variant: 'destructive',
      })
    } catch (error) {
      console.error("Error during logout:", error);
      return toast({
        title: 'Logout failed',
        description: 'Please try again later!',
        variant: 'destructive',
      })
    }
  };

    return <button onClick={logout}>
        {children}
    </button>
}

export default LogoutButton