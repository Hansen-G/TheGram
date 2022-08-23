from flask import Blueprint, jsonify, session, request, redirect, url_for
from app.models import User, db, Image
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import ImageForm
from app.forms.comment_form import CommentForm

img_routes = Blueprint('images', __name__)

# Update image
@img_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_images(id):
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    image_to_be_updated = Image.query.get(id)
    # print("!!!!!!!", image_to_be_updated)
    if not image_to_be_updated:
        result = {
            "message": "Image couldn't be found",
            "statusCode": 404
        }
        return jsonify(result)

    if image_to_be_updated and form.validate_on_submit():
        # print("~~~~~~", form.data['url'])
        if len(form.data['url']) >0:
            image_to_be_updated.url = form.data['url']
        if form.data['description']:
            image_to_be_updated.description = form.data['description']
        if form.data['alt_description']:
            image_to_be_updated.alt_description = form.data['alt_description']
        if form.data['show_stats']:
            image_to_be_updated.show_stats = form.data['show_stats']
        if form.data['location']:
            image_to_be_updated.location = form.data['location']

        db.session.commit()
        return redirect('/api/images')

    else:
        return jsonify(form.errors)

# delete image
@img_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_images(id):
    image_to_be_deleted = Image.query.get(id)
    if image_to_be_deleted:
        db.session.delete(image_to_be_deleted)
        db.session.commit()
        result = {
            "message": "Successfully deleted image"
        }
        return jsonify(result)
    else:
        result = {
            "message": "Image couldn't be found",
            "statusCode": 404
        }
        return jsonify(result)


# Create new image
@img_routes.route('/new', methods=['POST'])
@login_required
def create_images():
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image = Image(
            url = form.data['url'],
            description = form.data['description'],
            alt_description = form.data['alt_description'],
            show_stats = form.data['show_stats'],
            location = form.data['location'],
            user_id = current_user.id
        )
        db.session.add(image)
        db.session.commit()
        return redirect('/api/images')

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

# Get all images home page for the current user
@img_routes.route('/')
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

@img_routes.route('/<image_id>/comment')
@login_required
def create_new_comment():
    form = CommentForm()

    data = form.data


# #New route by Yoni
# @img_routes.route('/<id>', methods=['GET'])
# @login_required
# def get_images2(id):
#     all_images = Image.query.filter(Image.user_id == id).order_by(
#         Image.createdAt.desc()).all()
#     return_JSON = ([i.to_dict() for i in all_images])
#     for i in return_JSON:
#         for j in i["liked_user_ids"]:
#             if j["id"] == current_user.id:
#                 i['curent_user_liked'] = True
#                 break
#             else:
#                 i['curent_user_liked'] = False
#     return jsonify(return_JSON)
