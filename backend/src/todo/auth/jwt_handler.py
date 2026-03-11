from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer
from jose import jwt, JWTError
import os
from dotenv import load_dotenv

load_dotenv()

security = HTTPBearer()

def verify_token(credentials = Depends(security)):
    token = credentials.credentials
    secret = os.getenv("BETTER_AUTH_SECRET")
    
    if not secret:
        raise ValueError("BETTER_AUTH_SECRET environment variable is not set")
        
    try:
        payload = jwt.decode(
            token,
            secret,
            algorithms=["HS256"]
        )
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid ya expired token")
