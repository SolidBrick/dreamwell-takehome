import json
import os
import requests

def main(req, res):
    try:
        # Parse the incoming body (from createExecution)
        body = {}
        if req.body_raw:
            body = json.loads(req.body_raw)

        brand_name = body.get("brandName", "")

        # Call OpenAI API
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {os.environ['VITE_OPENAI_API_KEY']}",  # store API key in env vars
        }

        payload = {
            "model": "gpt-4o-mini",
            "messages": [
                {
                    "role": "system",
                    "content": """You are a helpful assistant. 
                    Always respond in strict JSON with this format and no other text:
                    {
                      "description": "string",
                      "products": ["product1", "product2", ...]
                    }.
                    The info provided may be a company brand or a link to a company's website. 
                    If you are unable to find a near matching brand, return an empty list of products and an empty string for description.
                    If the info provided is a link to a company's website, use the info provided on the website"""
                },
                {
                    "role": "user",
                    "content": f'Provide details about "{brand_name}".'
                },
            ],
            "max_tokens": 300,
            "temperature": 0
        }

        r = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
        r.raise_for_status()
        result = r.json()

        # Try to parse the returned content into JSON
        content = result["choices"][0]["message"]["content"].strip()
        try:
            parsed = json.loads(content)
        except json.JSONDecodeError:
            parsed = {"description": "", "products": []}

        return res.json(parsed)

    except Exception as e:
        return res.json({"error": str(e)}, 500)
