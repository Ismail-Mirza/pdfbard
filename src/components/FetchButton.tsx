"use client"
import axios from "axios";

const FButton = ()=>{
    let data_new = JSON.stringify({
        "pdf_url": "https://uploadthing-prod.s3.us-west-2.amazonaws.com/5e2c5038-1166-4cf9-932c-f9282818c039-2bg4l9.pdf",
        "index": "quill",
        "namespace": "clo21154k0001mg088c500s5g"
      });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apibard.onrender.com/load_vector',
        headers: { 
          'Content-Type': 'application/json', 

          'apiKey': 'LgCbJiE2Y7rkvhSUCg9JYdSmv8VyWG5x'
        },
        data:data_new
      };

    return (
        <button onClick={()=>{
            axios.request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
              console.log(error);
            });
       }}>
         Get Data
       </button>
    )
}

export default FButton