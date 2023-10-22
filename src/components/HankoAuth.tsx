"use client";
 
import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { register, Hanko } from "@teamhanko/hanko-elements";
import axios from "axios";



 
const hankoApi:any = process.env.NEXT_PUBLIC_HANKO_API_URL;
 
export default function HankoAuth() {
  const router = useRouter();
 
  const [hanko, setHanko] = useState<Hanko>();
 
  useEffect(() => {
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoApi))
    );
  }, []);
 
  const redirectAfterLogin = useCallback( async () => {
    // successfully logged in, redirect to a page in your application
    const user = await hanko?.user.getCurrent();
    if(user)
    {
        const {id,email} = user;
        let data = JSON.stringify({
          "id": id,
          "email":email
        });
        
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://localhost:3000/api/auth/',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });

    }

    router.replace("/profile");
  }, [router,hanko]);
 
  useEffect(
    () =>
      hanko?.onAuthFlowCompleted(() => {
        redirectAfterLogin();
      }),
    [hanko, redirectAfterLogin]
  );
 
  useEffect(() => {
    register(hankoApi).catch((error) => {
      // handle error
    });
  }, []);
 
  return <hanko-auth />;
}
