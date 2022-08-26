from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)



@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/get-users')
@login_required
def get_some_users():
    id = current_user.id
    
    following_list = User.query.get(id).for_following["following"]
    following_list.append(current_user.id)
    users = User.query.all()
    not_followed_users_list = []
    for user in users:
        # print('users--------------------', user.to_dict())
        user = user.to_dict()
        if user['id'] not in following_list:
            not_followed_users_list.append(user)

    # print('----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------',not_followed_users_list)


    return jsonify(not_followed_users_list)

@user_routes.route('/<int:id>')
@login_required
def user(id):
    if not isinstance(id, int):
        return jsonify({'error':'no user found'})
    user = User.query.get(id)
    if not user:
        return jsonify({'error':'no user found'})
    return user.to_dict()
    # user = User.query.get(id)
    # return user.to_dict()
