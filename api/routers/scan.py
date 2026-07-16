from fastapi import APIRouter, File, UploadFile, Form, Depends
from sqlmodel import Session
from ..database import get_session

router = APIRouter(prefix="/scan", tags=["Scan"])

@router.post("")
async def scan_document(
    image: UploadFile = File(...),
    subject: str = Form(...),
    session: Session = Depends(get_session)
):
    # Mock OCR processing and saving
    return {
        "success": True,
        "data": {
            "id": "e4",
            "subject": subject,
            "date": "07.13",
            "contentSnippet": f"This is a scanned... ({image.filename})",
            "fullText": "This is a scanned text from the image.",
            "isNew": True
        }
    }
