from fastapi import APIRouter, HTTPException, Request, Depends 
from fastapi.responses import RedirectResponse
import httpx
from app.config import settings

auth_router = APIRouter(prefix="/auth", tags=["Authentication"])

@auth_router.get("/login")
async def login():
    auth_url = (
        f"https://{settings.AUTH0_DOMAIN}/authorize?"
        f"response_type=code&"
        f"client_id={settings.AUTH0_CLIENT_ID}"
        f"redirect_uri={settings.AUTH0_REDIRECT_URI}&"
        f"scope=openid profile email&"
        f"audience={settings.AUTH0_API_AUDIENCE}"
    )
    return RedirectResponse(auth_url)


@auth_router.post("/callback")
async def callback(request: Request):
    body = await request.json()
    code = body.get("code")
    if not code:
        raise HTTPException(status_code=400, detail="Authorization code not provided")

    token_url = f"https://{settings.AUTH0_DOMAIN}/oauth/token"
    payload = {
        "grant_type": "authorization_code",
        "client_id": settings.AUTH0_CLIENT_ID,
        "client_secret": settings.AUTH0_CLIENT_SECRET,
        "redirect_uri": settings.AUTH0_REDIRECT_URI,
        "code": code,
    }

    headers = {"Content-Type":"application/x-www-form-urlencoded"}

    async with httpx.AsyncClient() as client:
        response = await client.post(token_url, data=payload, headers=headers)

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_ccode,
            detail=f"Token exhange failed: {response.json().get('error_description', 'Unknown error')}",
        )

    tokens = response.json()
    return tokens

@auth_router.get("/logout")
async def logout():
    logout_url = (
        f"https://{settings.AUTH0_DOMAIN}/v2/logout?"
        f"client_id={settings.AUTH0_CLIENT_ID}&"
        f"returnTo={settings.AUTH0_LOGOUT_REDIRECT_URI}"
    )
    return RedirectResponse(logout_url)

from app.dependencies import verify_token

@auth_router.get("/protected")
async def protected_route(token: str = Depends(verify_token)):
    """
    This is a protected route that only works if the token is valid.
    """
    return {
        "message": "Access granted! Your token is valid.",
        "user": token,
    }