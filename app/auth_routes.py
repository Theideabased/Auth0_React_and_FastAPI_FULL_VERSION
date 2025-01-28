from fastapi import APIRouter, HTTPException, Request, Depends, Query
from fastapi.responses import RedirectResponse
import httpx
from app.config import settings
from app.dependencies import verify_token
auth_router = APIRouter(prefix="/auth", tags=["Authentication"])


@auth_router.post("/callback")
async def callback(request: Request, redirect_uri: str = Query(..., description="The URL to redirect the user to after callback")):
    body = await request.json()
    code = body.get("code")
    if not code:
        raise HTTPException(status_code=400, detail="Authorization code not provided")

    token_url = f"https://{settings.AUTH0_DOMAIN}/oauth/token"
    payload = {
        "grant_type": "authorization_code",
        "client_id": settings.AUTH0_CLIENT_ID,
        "client_secret": settings.AUTH0_CLIENT_SECRET,
        "redirect_uri": redirect_uri,
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

@auth_router.get("/protected")
async def protected_route(token: str = Depends(verify_token)):
    """
    This is a protected route that only works if the token is valid.
    """
    user_info_url = f"https://{settings.AUTH0_DOMAIN}/userinfo"
    headers = {"Authorization": f"Bearer {token}"}

    async with httpx.AsyncClient() as client:
        response = await client.get(user_info_url, headers=headers)
    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=f"Failed to get user info: {response.json().get('error_description', 'Unknown error')}",
        )
    user_profile = response.json()
    print("User Profile:", user_profile)
    return {
        "message": "Access granted! Your token is valid.",
        "user": user_profile,
    }