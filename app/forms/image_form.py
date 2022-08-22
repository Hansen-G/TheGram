from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, url
# from app.models import Image

class ImageForm(FlaskForm):
    url = StringField("Url", validators=[DataRequired(), url()])
    description = StringField("Description")
    alt_description = StringField("ALT Description")
    show_stats = StringField("Show Status", default=True, validators=[DataRequired()])
    location = StringField("Location")

