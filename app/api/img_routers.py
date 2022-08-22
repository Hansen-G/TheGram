from flask import Blueprint, jsonify, session, request, redirect, url_for
from app.models import User, db, Image
from flask_login import current_user, login_user, logout_user, login_required

img_routes = Blueprint('images', __name__)

# Get all images home page by the current user
@img_routes.route('/')
@login_required
def get_images():
    
    id = current_user.id
    all_images = Image.query.filter(Image.user_id == id).order_by(Image.createdAt.desc()).all()

    return_JSON = ([i.to_dict() for i in all_images])


    for i in return_JSON:
        for j in i["liked_user_ids"]:
            if j["id"] == current_user.id:
                i['curent_user_liked'] = True
                break
            else:
                i['curent_user_liked'] = False
              

    return jsonify(return_JSON)
    