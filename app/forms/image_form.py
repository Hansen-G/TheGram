from email.mime import image
from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired, Email, ValidationError, url, Length
# from app.models import Image

class ImageForm(FlaskForm):
    # url = StringField("Url", validators=[DataRequired(), url(), Length(min=1, max=250)])
    image = StringField('image')
    description = StringField("Description", validators=[Length(max=2200)])
    alt_description = StringField("ALT Description", validators=[Length(max=2200)])
    show_stats = StringField("Show Status", default=True, validators=[DataRequired()])
    location = StringField("Location", validators=[Length(max=250)])

class DeleteImageForm(FlaskForm):
    pass

class FormValidation(FlaskForm):
    pass