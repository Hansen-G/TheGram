from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, follows, db
from sqlalchemy.sql import delete
from app.forms.image_form import FormValidation

follower_routes = Blueprint('followers', __name__)

@follower_routes.route('/toggle-follow/<int:id>')
@login_required
def toggle_follow(id):
    to_follow_id = id
    current_user_id = current_user.id
    follow = (current_user_id, to_follow_id)
    form = FormValidation()
    form['csrf_token'].data = request.cookies['csrf_token']
    if to_follow_id == current_user_id:
        return jsonify({
            'error':'Cannot follow yourself'
        })
    elif form.validate_on_submit():  
        user = User.query.get(current_user_id).to_dict()
        for check_if_following in user['following']:
            if check_if_following['following_id'] == to_follow_id:
                unFollow = delete(follows).where(
                    follows.c.follower_id==current_user_id, 
                    follows.c.following_id==to_follow_id
                )
                db.engine.execute(unFollow)
                updatedUser = User.query.get(current_user_id).to_dict()
                return jsonify(updatedUser['following'])
        newFollow = follows.insert().values(follow)
        db.engine.execute(newFollow)
        updatedUser = User.query.get(current_user_id).to_dict()
        return jsonify(updatedUser['following'])
    else:
        return jsonify(form.errors)


