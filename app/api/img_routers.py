# from distutils.log import error
from datetime import datetime
from turtle import pos
from sqlalchemy import delete
from flask import Blueprint, jsonify, session, request, redirect, url_for
from app.models import User, db, Image, Comment
from flask_login import current_user, login_user, logout_user, login_required
from app.forms.image_form import ImageForm, DeleteImageForm, FormValidation
from app.forms.comment_form import CommentForm
from app.models import Imageslikes

from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

img_routes = Blueprint('images', __name__)

# Update image
@img_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_images(id):
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    image_to_be_updated = Image.query.get(id)
    userId = current_user.id
    if not image_to_be_updated:
        result = {
            "message": "Image couldn't be found",
            "statusCode": 404
        }
        return jsonify(result)
    
    if userId != image_to_be_updated.user_id :
        result = {
            "message": "Could not update other's image",
            "statusCode": 403
        }
        return jsonify(result)


    if image_to_be_updated and form.validate_on_submit():
        # if len(form.data['url']) >0 and len(form.data['url']) <250 :
        #     image_to_be_updated.url = form.data['url']
        if form.data['description']:
            image_to_be_updated.description = form.data['description']
        if form.data['alt_description']:
            image_to_be_updated.alt_description = form.data['alt_description']
        if form.data['show_stats']:
            image_to_be_updated.show_stats = form.data['show_stats']
        if form.data['location']:
            image_to_be_updated.location = form.data['location']


        db.session.commit()

        image_to_be_updated = image_to_be_updated.to_dict()
        image_to_be_updated['post_user'] = User.query.get(image_to_be_updated['user_id']).to_dict()
        return jsonify(image_to_be_updated)

    else:
        return jsonify(form.errors)


# delete image
@img_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_images(id):
    form = DeleteImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    image_to_be_deleted = Image.query.get(id)
    userId = current_user.id


    if not image_to_be_deleted:
        result = {
            "message": "Image couldn't be found",
            "statusCode": 404
        }
        return jsonify(result)

    elif userId != image_to_be_deleted.user_id :
        result = {
            "message": "Could not delete other's image",
            "statusCode": 403
        }
        return jsonify(result)
    
    elif form.validate_on_submit():
            db.session.delete(image_to_be_deleted)
            db.session.commit()
            result = {
                "message": "Successfully deleted image"
            }
            return jsonify(result)
    else:
        result = {
            "message": "cannot delete post",
            "statusCode": 403
        }
        return jsonify(result)

# Create new image
@img_routes.route('/new', methods=['POST'])
@login_required
def create_images():
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
        
    if form.validate_on_submit():
        if "image" not in request.files:
            return {"errors": "image required"}, 400
   
        image = request.files["image"]
        print(image)
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        
        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)
        print(upload)
        # print(upload)
        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        url = upload["url"]
        print(url)
        post = Image(
            url = url,
            description = form.data['description'],
            alt_description = form.data['alt_description'],
            show_stats = bool(form.data['show_stats']),
            location = form.data['location'],
            user_id = current_user.id
        )
        db.session.add(post)
        db.session.commit()
        print(post)
        print(post.to_dict())
        newPost = post.to_dict()
        newPost['post_user'] = User.query.get(newPost['user_id']).to_dict()
        return newPost

    else:
        return jsonify(form.errors)


# Get images by user_id
@img_routes.route('/users/<int:id>', methods=['GET'])
@login_required
def get_images_by_user_id(id):
    all_images = Image.query.filter(Image.user_id == id).order_by(
        Image.createdAt.desc()).all()
    return_JSON = ([i.to_dict() for i in all_images])
    for i in return_JSON:
        i['post_user'] = User.query.get(i['user_id']).to_dict()
        for j in i["liked_user_ids"]:
            if j["id"] == current_user.id:
                i['curent_user_liked'] = True
                break
            else:
                i['curent_user_liked'] = False
    return jsonify(return_JSON)


# Get all images on the profile page of the current user
@img_routes.route('/current_user_images', methods=['GET'])
@login_required
def get_images():
    id = current_user.id
    all_images = Image.query.filter(Image.user_id == id).order_by(
        Image.createdAt.desc()).all()
    return_JSON = ([i.to_dict() for i in all_images])
    for i in return_JSON:
        i['post_user'] = User.query.get(i['user_id']).to_dict()
        for j in i["liked_user_ids"]:
            if j["id"] == current_user.id:
                i['curent_user_liked'] = True
                break
            else:
                i['curent_user_liked'] = False
    return jsonify(return_JSON)


#Get a singular image
@img_routes.route('/<id>', methods=['GET'])
@login_required
def get_an_image(id):
    image = Image.query.get(id)
    return jsonify(image.to_dict())





# Get all images home page for the current user
@img_routes.route('')
@login_required
def get_images_homepage():
    id = current_user.id
    following_id = User.query.get(id).for_following["following"]
    following_id.append(current_user.id)

    all_images = Image.query.filter(Image.user_id.in_(
        following_id)).order_by(Image.createdAt.desc()).all()
    return_JSON = ([i.to_dict() for i in all_images])
    for i in return_JSON:
        i['post_user'] = User.query.get(i['user_id']).to_dict()
        for j in i["liked_user_ids"]:
            if j["id"] == current_user.id:
                i['curent_user_liked'] = True
                break
            else:
                i['curent_user_liked'] = False
    return jsonify(return_JSON)

# get all comments by image id 
@img_routes.route('/<image_id>/comment', methods=['GET'])
@login_required
def get_all_comments(image_id):
    comments = Comment.query.filter(Comment.image_id == image_id)
    all_comments = ([comment.to_dict() for comment in comments])
    return jsonify(all_comments)


#Create a new comment on a post
@img_routes.route('/<image_id>/comment', methods=['POST'])
@login_required
def create_new_comment(image_id):
    userid = current_user.id
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    check_image = Image.query.get(image_id)

    if form.validate_on_submit() and check_image:
        new_comment = Comment(
            image_id = image_id,
            user_id = userid,
            comment = data['comment'],
        )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify(new_comment.to_dict())
    elif form.errors:
        return jsonify(form.errors)
    else:
        result = {
            "message": "Could not make comment",
            "statusCode": 404
        }
        return jsonify(result)


# like and unlike to a image
@img_routes.route('/<int:id>/likes', methods=['POST'])
@login_required
def add_like_to_image(id):
    form = FormValidation()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image = Image.query.get(id).to_dict()
        image['post_user'] = User.query.get(image['user_id']).to_dict()
        current_user_id = current_user.id
        for user in image['liked_user_ids']:
            if current_user_id == user['id']:
                deleted_like = delete(Imageslikes).where(
                    Imageslikes.c.user_id == current_user_id,
                    Imageslikes.c.image_id == id
                )
                db.engine.execute(deleted_like)
                new_image = Image.query.get(id).to_dict()
                new_image['post_user'] = User.query.get(image['user_id']).to_dict()
                return jsonify(new_image)

        new_like = Imageslikes.insert().values((current_user_id, id))
        db.engine.execute(new_like)
        new_image = Image.query.get(id).to_dict()
        new_image['post_user'] = User.query.get(image['user_id']).to_dict()
        return jsonify(new_image)
    else:
        return jsonify(form.errors)

