from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from app.config import settings
import httpx

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_auth0_public_key():
    jwks_url = f"https://{settings.AUTH0_DOMAIN}/.well-known/jwks.json"
    response = httpx.get(jwks_url)
    jwks = response.json()
    return jwks["keys"][0]

def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        public_key = get_auth0_public_key()
        decoded_token = jwt.decode(
            token,
            public_key,
            algorithms=["RS256"],
            audience=settings.AUTH0_API_AUDIENCE,
            issuer=f"https://{settings.AUTH0_DOMAIN}/",
        )
        return decoded_token
    except JWTError as e:
        raise HTTPException(
            status_code=401,
            detail=f"Token verification failed: {str(e)}",
        )