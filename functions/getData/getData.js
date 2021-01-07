// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
    
    try {
        const url = event.queryStringParameters.url || `https://www.amazon.com.au/s?k=mobile`                
        const axios = require("axios").default;
        
        //const url = `https://www.amazon.com.au/s?k=mobile`
        const data = await axios.get(url);                 
console.log(data.data)
      return {
        statusCode: 200,
        body: JSON.stringify({ data: `${data.data}` }),
        // // more keys you can return:
        // headers: { "headerName": "headerValue", ... },
        // isBase64Encoded: true,
      }
    } catch (err) {
      return { statusCode: 500, body: err.toString() }
    }
  }

  