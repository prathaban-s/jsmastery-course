import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = await request.json();

  console.log(`Bearer ${process.env.OPEN_API_SECRET}`);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_API_SECRET}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Please provide answer for this question",
          },
          {
            role: "user",
            content: `${question}`,
          },
        ],
      }),
    });

    const responseData = await response.json();

    const reply = responseData?.choices[0].message.content;

    return NextResponse.json({ reply });
    //
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
};
