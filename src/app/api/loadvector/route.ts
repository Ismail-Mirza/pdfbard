
import axios from "axios";

export  async function POST(request:Request) {
 
    // Handle the POST request here
    // You can access request data using req.body
    const data = await request.json();
    let data_new = JSON.stringify({
        "pdf_url": "",
        "index": "quill",
        "namespace": ""
      });
      
      let config = {
        method: 'post',

        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_LOAD_VECTOR_URL}/load_vector`,
        headers: { 
          'Content-Type': 'application/json', 
        //   'apiKey': process.env.NEXT_PUBLIC_LOAD_VECTOR_API_KEY
        },
        data : data_new
      };
      
      axios.request(config)
      .then((response) => {
        // router.push(`/profile/${file.id}`)

        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    



    return Response.json({
        'message':"Vector is loaded",
    },{
        status:201
    })
    
  



   
}

