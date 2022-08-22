from email.policy import default
from .db import db
from .images_likes import Imageslikes
from datetime import datetime
from .comments_likes import CommentsLikes

class Image(db.Model):
    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    url = db.Column(db.String(250), nullable=False)
    description = db.Column(db.String(2200), nullable=True)
    alt_description = db.Column(db.String(2200), nullable=True)
    show_stats = db.Column(db.Boolean, nullable=False, default=True)
    location = db.Column(db.String(250), nullable=True)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    comments = db.relationship("Comment", back_populates="image", cascade="all, delete-orphan")
    user = db.relationship("User", back_populates="images")

    user_image_likes = db.relationship(
        "User", 
        secondary=Imageslikes, 
        back_populates="images_likes",
        # cascade="all, delete"
    )


 