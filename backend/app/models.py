from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from datetime import datetime
from typing import Optional, List
from app.core.database import Base
from pgvector.sqlalchemy import Vector

class Member(Base):
    __tablename__ = "members"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    clerk_id: Mapped[str] = mapped_column(String, unique=True, index=True) # Link to Clerk User
    first_name: Mapped[Optional[str]] = mapped_column(String)
    last_name: Mapped[Optional[str]] = mapped_column(String)
    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    profile_photo_url: Mapped[Optional[str]] = mapped_column(String)

    # Profile Content
    what_you_do: Mapped[Optional[str]] = mapped_column(Text)
    where_location: Mapped[Optional[str]] = mapped_column(String)
    website: Mapped[Optional[str]] = mapped_column(String)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())

    # Relationships
    social_links: Mapped[List["SocialLink"]] = relationship(back_populates="member")
    conversation_history: Mapped[List["ConversationHistory"]] = relationship(back_populates="member")
    profile_completeness: Mapped["ProfileCompleteness"] = relationship(back_populates="member", uselist=False)

class SocialLink(Base):
    __tablename__ = "social_links"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    member_id: Mapped[int] = mapped_column(ForeignKey("members.id"))
    platform_name: Mapped[str] = mapped_column(String) # linkedin, twitter, etc.
    url: Mapped[str] = mapped_column(String)
    processed: Mapped[bool] = mapped_column(Boolean, default=False)

    member: Mapped["Member"] = relationship(back_populates="social_links")

class ConversationHistory(Base):
    __tablename__ = "conversation_history"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    member_id: Mapped[int] = mapped_column(ForeignKey("members.id"))
    session_id: Mapped[str] = mapped_column(String, index=True)
    role: Mapped[str] = mapped_column(String) # user, assistant
    message_content: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    member: Mapped["Member"] = relationship(back_populates="conversation_history")

class ProfileCompleteness(Base):
    __tablename__ = "profile_completeness"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    member_id: Mapped[int] = mapped_column(ForeignKey("members.id"), unique=True)
    completeness_score: Mapped[float] = mapped_column(Integer) # 0-100
    missing_fields: Mapped[dict] = mapped_column(JSON) # List of missing fields
    last_calculated: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    member: Mapped["Member"] = relationship(back_populates="profile_completeness")
