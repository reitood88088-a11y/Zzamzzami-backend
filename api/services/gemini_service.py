import os
import google.generativeai as genai
import json

def process_diary_image(image_bytes: bytes, mime_type: str = "image/jpeg") -> dict:
    genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
    model = genai.GenerativeModel('gemini-2.0-flash')
    
    prompt = """
    You are an AI assistant that extracts text from scanned diary/study images and generates educational content.
    1. Detect the primary language of the text based on the language that makes up the largest proportion/majority of the text. It must be strictly one of: "English", "Chinese", or "Japanese".
    2. Extract all readable text from the image.
    3. Identify 5-10 important or difficult words from the text and provide their Korean meanings and an example sentence.
       - For each word, provide the "word" field with ONLY the word itself (no parentheses, no reading).
       - If the language is Chinese, provide the pinyin romanization in the "reading" field (e.g., "hàn zì").
       - If the language is Japanese, provide the hiragana reading in the "reading" field (e.g., "かんじ").
       - If the language is English, the "reading" field should be an empty string "".
    4. Generate exactly 3 multiple-choice questions (4 options each) based on the EXTRACTED WORDS. Mix the following two types of quizzes:
       
       [Type 1: Synonym Quiz]
       - Question: Ask to find a word that has the same meaning as one of the extracted words.
       - Options: 1 correct synonym, 3 clearly incorrect words. The incorrect words MUST have completely different meanings from the answer. Do not use words with similar meanings as distractors.
       - Explanation: MUST explicitly mention the extracted word, provide its synonym (the correct answer), and provide an antonym for additional learning.
       
       [Type 2: Morphological/Visual Similarity Quiz]
       - Question: Provide the Korean meaning of one of the extracted words and ask which word it is.
       - Options: 1 correct word (the extracted word), 3 visually or morphologically similar distractors that have completely different meanings.
         * English: Use prefix/suffix variations or spelling tricks (e.g., affect vs effect/infect/defect).
         * Chinese: Use words with the same phonetic component but different radicals (e.g., 渴 vs 喝/褐).
         * Japanese: Use similar looking kanji or homophones (e.g., 待つ vs 持つ).
       - Explanation: Explain the meaning of the correct answer and the distractors to clarify the confusion.

       Ensure there is a total of exactly 3 quizzes in the "quizzes" array.
    
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
          "question": "What is a synonym for 'affect'?",
          "options": ["influence", "apple", "car", "dog"],
          "correct_option_index": 0,
          "explanation": "'influence' is a synonym for 'affect'. An antonym would be 'remain'."
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
