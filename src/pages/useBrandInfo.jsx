import { useState } from "react";

export function useBrandInfo(apiKey) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchBrandInfo = async (brandName) => {
    if (!brandName) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `You are a helpful assistant. 
              Always respond in **strict JSON** with this format and no other text:
              {
                "description": "string",
                "products": ["product1", "product2", ...]
              }.
              The info provided may be a company brand or a link to a company's website. 
              If you are unable to find a near matching brand, return an empty list of products and an empty string for description.
              If the info provided is a link to a company's website, use the info provided on the website`,
              },
              {
                role: "user",
                content: `Provide details about "${brandName}".`,
              },
            ],
            max_tokens: 300,
            temperature: 0, // reduces creativity, makes JSON more reliable
          }),
        }
      );

      const json = await response.json();
      if (json.error) throw new Error(json.error.message);

      let content = json.choices[0].message.content;

      // Safely parse JSON from model output
      let parsed;
      try {
        parsed = JSON.parse(content);
      } catch (err) {
        throw new Error("Failed to parse JSON response: " + content);
      }

      setData(parsed);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { fetchBrandInfo, data, loading, error };
}
