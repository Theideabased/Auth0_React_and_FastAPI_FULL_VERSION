from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "MyApp"
    AUTH0_DOMAIN: str
    AUTH0_CLIENT_ID: str
    AUTH0_CLIENT_SECRET: str
    AUTH0_API_AUDIENCE: str
    APP_SECRET_KEY: str

    class Config: 
        env_file = "back.env"

settings = Settings()