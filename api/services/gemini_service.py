import os
import google.generativeai as genai
import json

def process_diary_image(image_bytes: bytes, mime_type: str = "image/jpeg") -> dict:
    genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
    
    # gemini-2.5-flash is much more reliable and robust for structured outputs and OCR
    models_to_try = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-flash-latest']
    last_exception = None
    
    prompt = """
    You are an AI assistant that extracts text from scanned diary/study images and generates educational content.
    1. Detect the primary language of the text based on the language that makes up the largest proportion/majority of the text. It must be strictly one of: "English", "Chinese", or "Japanese".
    2. Extract all readable text from the image.
    3. Identify 5-10 important or difficult words from the text and provide their Korean meanings and an example sentence.
       - For each word, provide the "word" field with ONLY the word itself (no parentheses, no reading).
       - If the language is Chinese, provide the pinyin romanization in the "reading" field (e.g., "hàn zì").
       - If the language is Japanese, provide the hiragana reading in the "reading" field (e.g., "かんじ").
       - If the language is English, the "reading" field should be an empty string "".
    
    CRITICAL: Ensure all string values in your JSON are properly escaped. If the extracted text contains double quotes, you MUST escape them (e.g., \\"Hello\\").
    
    Return the response ONLY as a raw JSON object (without Markdown code blocks like ```json) that exactly matches this format:
    {
      "language": "English",
      "full_text": "extracted text here with escaped \\"quotes\\" if any",
      "words": [
        {"word": "example", "reading": "", "meaning": "예시", "example_sentence": "This is an example."},
        {"word": "汉字", "reading": "hàn zì", "meaning": "한자", "example_sentence": "汉字很难写。"}
      ]
    }
    """
    
    for model_name in models_to_try:
        for attempt in range(2): # Try each model up to 2 times
            try:
                model = genai.GenerativeModel(model_name)
                response = model.generate_content(
                    [{'mime_type': mime_type, 'data': image_bytes}, prompt],
                    generation_config={"response_mime_type": "application/json"}
                )
                
                text_response = response.text.strip()
                
                # Robust JSON extraction
                start = text_response.find('{')
                end = text_response.rfind('}')
                if start != -1 and end != -1:
                    text_response = text_response[start:end+1]
                    
                data = json.loads(text_response)
                
                # Basic validation
                if "language" not in data or "full_text" not in data or "words" not in data:
                    raise ValueError(f"Missing required fields in response from {model_name}")
                    
                return data
                
            except Exception as e:
                print(f"[{model_name}] Attempt {attempt + 1} Error: {e}")
                last_exception = e
                continue # Retry this model
                
        # If both attempts for this model fail, the outer loop continues to the next model
        print(f"[{model_name}] All attempts failed. Falling back to next model...")
                
    # If all models fail
    raise last_exception or Exception("All Gemini models failed.")
