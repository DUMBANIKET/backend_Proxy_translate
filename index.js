const axios = require('axios').default;
    const { v4: uuidv4 } = require('uuid');
    require('dotenv').config()
    const Sentry=require('@sentry/node')
    const express=require("express")
    const cors=require('cors')
    const app=express();

    // const bodyparser=require('body-parser')
    app.use(express.json())
    app.use(cors({
        "origin": "*"
      }
       ))

    let key = process.env.AZURE_KEY;
    let endpoint = "https://api.cognitive.microsofttranslator.com";

    
    let location = "centralindia";

app.get("/",(req,res)=>{
    res.json("dont worry i am working")
})

app.post("/translate",(req,res)=>{
    const from=req.body.from
    const to=req.body.to
    const text=req.body.text
    axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': key,
             // location required if you're using a multi-service or regional (not global) resource.
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            'from': from,
            'to': [to]
        },
        data: [{
            'text': text
        }],
        responseType: 'json'
    }).then(function(response){
            
res.send(JSON.stringify(response.data, null, 4))
        console.log(JSON.stringify(response.data, null, 4));
    })
})

app.use(Sentry.Handlers.errorHandler());



// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});


app.listen(5000,()=>{
    console.log("server is running")
})