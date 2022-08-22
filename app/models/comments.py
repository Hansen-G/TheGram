from enum import unique
from .db import db
from .images_likes import Imageslikes
from .comments_likes import CommentsLikes
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey('images.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    comment = db.Column(db.String(1000), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    
    user = db.relationship("User", back_populates='comments')

    image = db.relationship("Image", back_populates='comments')

    user_comment_likes = db.relationship(
        "User", 
        secondary=CommentsLikes, 
        back_populates="comments_likes",
        cascade="all, delete"
    )
