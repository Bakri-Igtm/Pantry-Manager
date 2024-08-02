// utils/classifyImage.js
import * as dotenv from 'dotenv';
dotenv.config();
import { OpenAI } from 'openai';
import { preprocessImage } from './utils/preprocessImage.js'; 

const OPENAI_API_KEY='sk-BQ074ccUO3rkpSTbsBjaXtAfYYbh0RY2uaFw4XlGZTT3BlbkFJdQf1iRsP3qT1l20zVN6FFBLTxro-MgGfa9XFrZv80A'
// console.log(process.env.OPENAI_API_KEY)
const openai = new OpenAI({apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true})
export const classifyImage = async (imageData) => {
  // Preprocess the image
  const base64Image = preprocessImage(imageData);

  // Send the image to the OpenAI API
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",  
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Identify the ingredient or foodstuff in this image. I just need the name. Nothing else",
          },
          {
            type: "image_url",
            image_url: {
              url: base64Image,
            }
          },
        ],
      },
    ],
    max_tokens: 50,
  });

  return response.choices[0].message.content;
};
// console.log('OPENAI_API_KEY:', OPENAI_API_KEY);
