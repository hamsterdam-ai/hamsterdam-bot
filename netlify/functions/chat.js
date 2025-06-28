export async function handler(event) {
  try {
    const { prompt } = JSON.parse(event.body);
    const apiKey = process.env.OPENROUTERKEY;

const messages = [
  {
    role: "system",
    content: `You are an unapologetically erotic storyteller. You write explicit, detailed adult fiction that is steamy, graphic, and immersive. You avoid real people and illegal topics, but otherwise go as far as the prompt desires. Push boundaries. Use vivid descriptions of physical sensation, lust, and desire. No holding back.`
  },
  {
    role: "user",
    content: `Write a highly detailed erotic story based on this scenario:\n${prompt}`
  }
];

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: "gryphe/mythomist-7b:free"
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

