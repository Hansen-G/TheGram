from tokenize import Comment
from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, url, Length
# from app.models import Image

class DeleteCommentForm(FlaskForm):
    pass


class CommentForm(FlaskForm):
    image_id = IntegerField("Image ID")
    user_id = IntegerField("User Id")
    comment = StringField(
        "Comment", 
        validators=[DataRequired(), 
        Length(
        min=1, 
        max=1000, 
        message='Comment must be between 1 and 1000 characters')]
        )
    createdAt = StringField('Created At')
    updatedAt = StringField('Updated At')
