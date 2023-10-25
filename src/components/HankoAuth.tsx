"use client";
 
import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { register, Hanko } from "@teamhanko/hanko-elements";
import axios from "axios";
import "./auth.css"
import Log from "../../public/log.svg"
import Image from "next/image";
import Link from "next/link";


 
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
 
  return (
    <div className="container">
    <div className="forms-container">
      <div className="signin-signup">
        <div  className="root sign-in-form">
          <hanko-auth className={"hanko"}></hanko-auth>
        </div>
      </div>
    </div>

    <div className="panels-container">
      <div className="panel left-panel">
        <div className="content">
          <h3> Want to Subscribe Pro ?</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
            ex ratione. Aliquid!
          </p>
          <Link href={"/pricing/"} className="btn transparent px-10 py-2.5" id="sign-up-btn">
            Subscribe
          </Link>
        </div>
        {/* <img src={Log} className="image" alt="" /> */}
        <Image alt="login-image" src={Log} className="image h-[300px]"></Image>
      </div>
    </div>
  </div>
  );
}
