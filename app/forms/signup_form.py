from tabnanny import check
from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def check_username_length(form, field):
    #Checking length of username
    username = field.data
    if len(username) < 4:
        raise ValidationError('Username needs to be longer than 4 characters!.')
    if len(username) > 40:
        raise ValidationError('Username needs to be less than 40 characters!')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[
            DataRequired(),
            check_username_length,
            username_exists
            ])

    email = StringField('email', validators=[
        DataRequired(),
        Length(max=255, message="Email cannot exceed 255 characters!"),
        user_exists])

    password = StringField('password', validators=[DataRequired(),
    Length(max=64, message='Password cannot exceed 64 characters!'),
    Length(min=6, message='Password needs to be at least 6 characters!')])

    name = StringField(
        'name', validators=[DataRequired(),
        Length(max=64, message='Name cannot exceed 64 characters!'),
        Length(min=2, message='Name cannot be empty and need to be at least 2 characters!')
        ])
