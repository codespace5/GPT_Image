const axios = require('axios');
const fs = require('fs');

const apiKey = 'sk-'; 
const imagePath = '1.jpg'; 
const model = 'gpt-4o'; 

function encodeImage(imagePath) {
    return fs.readFileSync(imagePath, { encoding: 'base64' });
}


const base64Image = encodeImage(imagePath);


const postData = {
    model: model,
    messages: [
        { role: "system", content: "You are a helpful assistant that responds in Markdown. Help me with my math homework!" },
        { role: "user", content: [
            { type: "text", text: "please extract all invoice information in this image" },
            { type: "image_url", image_url: {
                url: `data:image/png;base64,${base64Image}`
            }}
        ]}
    ],
    temperature: 0.0
};


axios.post('https://api.openai.com/v1/chat/completions', postData, {
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    }
})
.then(response => {
    console.log(response.data.choices[0].message.content);
})
.catch(error => {
    console.error('Error making API request', error);
});