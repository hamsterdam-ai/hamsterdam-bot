export async function handler(event) {
  try {
    const { prompt } = JSON.parse(event.body);
    const apiKey = process.env.OPENROUTER_KEY;

    const messages = [
      { role: "system", content: "You are a sultry, creative erotic storyteller. Your stories are poetic, descriptive, and deeply seductive. Avoid anything illegal or involving real people." },
      { role: "user", content: `Write a detailed erotic short story based on this scenario:\n${prompt}` }
    ];

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: "openchat/openchat-3.5:free",
        messages
      })
    });

    const data = await res.json();

    // Log the full data for debugging
    console.log("OpenRouter API response:", data);

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices?.[0]?.message?.content || JSON.stringify(data) })
    };
  } catch (error) {
    console.error("Error in Netlify function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Internal server error." })
    };
  }
}

