from .db import db

Imageslikes = db.Table (
    "images_likes",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("image_id", db.Integer, db.ForeignKey("images.id"), primary_key=True)

)

