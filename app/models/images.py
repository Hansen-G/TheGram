from email.policy import default
from .db import db
from sqlalchemy.sql import func
from .images_likes import Imageslikes
from datetime import datetime, timezone, timedelta
from .comments_likes import CommentsLikes

class Image(db.Model):
    __tablename__ = "images"

    timezone_offset = -8.0  # Pacific Standard Time (UTC−08:00)
    tzinfo = timezone(timedelta(hours=timezone_offset))

    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    url = db.Column(db.String(250), nullable=False)
    description = db.Column(db.String(2200), nullable=True)
    alt_description = db.Column(db.String(2200), nullable=True)
    show_stats = db.Column(db.Boolean, nullable=False, default=True)
    location = db.Column(db.String(250), nullable=True)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=True, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=True, onupdate=func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    comments = db.relationship("Comment", back_populates="image", cascade="all, delete-orphan")
    user = db.relationship("User", back_populates="images")

    user_image_likes = db.relationship(
        "User",
        secondary=Imageslikes,
        back_populates="images_likes",
        # cascade="all, delete"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "url": self.url,
            "description": self.description,
            "alt_description": self.alt_description,
            "show_stats": self.show_stats,
            "location": self.location,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
            "user_id": self.user_id,
            "comments": [c.to_dict() for c in self.comments],
            "user_image_likes": len(self.user_image_likes),
            "liked_user_ids": [{'id':i.id, 'username':i.username, 'name':i.name, 'profile_img':i.profile_img} for i in self.user_image_likes]
        }
