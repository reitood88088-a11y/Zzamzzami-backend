import os
import google.generativeai as genai
import json

def process_diary_image(image_bytes: bytes, mime_type: str = "image/jpeg") -> dict:
    genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    prompt = """
    You are an AI assistant that extracts text from scanned diary/study images and generates educational content.
    1. Detect the primary language of the text based on the language that makes up the largest proportion/majority of the text. It must be strictly one of: "English", "Chinese", or "Japanese".
    2. Extract all readable text from the image.
    3. Identify 5-10 important or difficult words from the text and provide their Korean meanings and an example sentence.
       - For each word, provide the "word" field with ONLY the word itself (no parentheses, no reading).
       - If the language is Chinese, provide the pinyin romanization in the "reading" field (e.g., "hàn zì").
       - If the language is Japanese, provide the hiragana reading in the "reading" field (e.g., "かんじ").
       - If the language is English, the "reading" field should be an empty string "".
    4. Generate 3 multiple-choice questions based on the content of the text to test reading comprehension. Each question must have exactly 4 options.
    
    Return the response ONLY as a raw JSON object (without Markdown code blocks like ```json) that exactly matches this format:
    {
      "language": "English",
      "full_text": "extracted text here",
      "words": [
        {"word": "example", "reading": "", "meaning": "예시", "example_sentence": "This is an example."},
        {"word": "汉字", "reading": "hàn zì", "meaning": "한자", "example_sentence": "汉字很难写。"}
      ],
      "quizzes": [
        {
          "question": "What is the main topic?",
          "options": ["A", "B", "C", "D"],
          "correct_option_index": 0,
          "explanation": "Because A is the answer."
        }
      ]
    }
    """
    
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
    
    try:
        data = json.loads(text_response)
        return data
    except json.JSONDecodeError as e:
        print("Failed to decode JSON from Gemini:", text_response)
        raise e
