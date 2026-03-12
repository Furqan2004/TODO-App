from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class User(SQLModel, table=True):
    __tablename__ = "user"
    id: str = Field(primary_key=True)
    name: str
    email: str = Field(unique=True, index=True)
    emailVerified: bool = Field(default=False)
    image: Optional[str] = None
    createdAt: datetime = Field(default_factory=datetime.now)
    updatedAt: datetime = Field(default_factory=datetime.now)

class Session(SQLModel, table=True):
    __tablename__ = "session"
    id: str = Field(primary_key=True)
    expiresAt: datetime
    token: str = Field(unique=True)
    createdAt: datetime
    updatedAt: datetime
    ipAddress: Optional[str] = None
    userAgent: Optional[str] = None
    userId: str = Field(foreign_key="user.id")

class Account(SQLModel, table=True):
    __tablename__ = "account"
    id: str = Field(primary_key=True)
    accountId: str
    providerId: str
    userId: str = Field(foreign_key="user.id")
    accessToken: Optional[str] = None
    refreshToken: Optional[str] = None
    idToken: Optional[str] = None
    accessTokenExpiresAt: Optional[datetime] = None
    refreshTokenExpiresAt: Optional[datetime] = None
    scope: Optional[str] = None
    password: Optional[str] = None
    createdAt: datetime
    updatedAt: datetime

class Verification(SQLModel, table=True):
    __tablename__ = "verification"
    id: str = Field(primary_key=True)
    identifier: str
    value: str
    expiresAt: datetime
    createdAt: Optional[datetime] = Field(default_factory=datetime.now)
    updatedAt: Optional[datetime] = Field(default_factory=datetime.now)
