import os
import google.generativeai as genai
import json

def process_diary_image(image_bytes: bytes, mime_type: str = "image/jpeg") -> dict:
    genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
    
    models_to_try = ['gemini-2.5-flash', 'gemini-2.5-pro']
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
    
    Return the response ONLY as a raw JSON object (without Markdown code blocks like ```json) that exactly matches this format:
    {
      "language": "English",
      "full_text": "extracted text here",
      "words": [
        {"word": "example", "reading": "", "meaning": "예시", "example_sentence": "This is an example."},
        {"word": "汉字", "reading": "hàn zì", "meaning": "한자", "example_sentence": "汉字很难写。"}
      ]
    }
    """
    
    for model_name in models_to_try:
        try:
            model = genai.GenerativeModel(model_name)
            response = model.generate_content([
                {'mime_type': mime_type, 'data': image_bytes},
                prompt
            ])
            
            # Parse the response as JSON
            text_response = response.text.strip()
            if text_response.startswith("```json"):
                text_response = text_response[7:]
            if text_response.startswith("```"):
                text_response = text_response[3:]
            if text_response.endswith("```"):
                text_response = text_response[:-3]
            text_response = text_response.strip()
            
            data = json.loads(text_response)
            return data
            
        except Exception as e:
            print(f"[{model_name}] Error or Quota exceeded. Falling back... Details: {e}")
            last_exception = e
            continue # Try next model
                
    # If all models fail with quota errors
    raise last_exception or Exception("All Gemini models failed.")
