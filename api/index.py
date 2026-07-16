from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import scan, diaries, words, quizzes, dashboard

app = FastAPI(
    title="Zzamzzami API",
    version="1.0.0",
    docs_url="/docs",
    openapi_url="/openapi.json"
)

# CORS Middleware for Vercel deployment and local FE testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(scan.router, prefix="/api/v1")
app.include_router(diaries.router, prefix="/api/v1")
app.include_router(words.router, prefix="/api/v1")
app.include_router(quizzes.router, prefix="/api/v1")
app.include_router(dashboard.router, prefix="/api/v1")

from fastapi.responses import RedirectResponse

@app.get("/")
def root():
    return RedirectResponse(url="/docs")

@app.get("/api")
def api_root():
    return RedirectResponse(url="/docs")

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Zzamzzami FastAPI is running smoothly!"}

# Vercel Serverless Function entry point requirement
# Vercel automatically finds `app` inside `api/index.py`
