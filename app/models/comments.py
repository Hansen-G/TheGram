from enum import unique
from .db import db
from .images_likes import Imageslikes
from .comments_likes import CommentsLikes
from datetime import datetime, timezone, timedelta
from sqlalchemy.sql import func

class Comment(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey("images.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    comment = db.Column(db.String(1000), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=True, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=True, onupdate=func.now())


    user = db.relationship("User", back_populates="comments")

    image = db.relationship("Image", back_populates="comments")

    user_comment_likes = db.relationship(
        "User",
        secondary=CommentsLikes,
        back_populates="comments_likes",
        # cascade="all, delete"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "image_id": self.image_id,
            "user_id": self.user_id,
            "comment": self.comment,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
            "user": self.user.to_dict(),
            "total_comment_likes": len(self.user_comment_likes),
            "user_comment_likes": [{'id':i.id, 'username':i.username, 'name':i.name, 'profile_img':i.profile_img} for i in self.user_comment_likes]

        }
