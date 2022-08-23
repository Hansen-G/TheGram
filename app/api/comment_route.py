from datetime import datetime
from tokenize import Comment
from flask import Blueprint, jsonify, request, redirect, url_for
from app.models import User, db, Comment
from flask_login import current_user, login_user, logout_user, login_required
from app.forms.comment_form import DeleteCommentForm, CommentForm

comment_routes = Blueprint('comment', __name__)

# Delete your own comment on a post
@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    form = DeleteCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    to_be_deleted = Comment.query.get(id)
    userid = current_user.id

    if to_be_deleted and to_be_deleted.user_id == userid and form.validate_on_submit():
        db.session.delete(to_be_deleted)
        db.session.commit()
        result = {
            "message": "Successfully deleted Comment"
        }
        return jsonify(result)
    elif to_be_deleted.user_id != userid:
        result = {
            "message": "Cannot delete someone elses comment",
            "statusCode": 404
        }
        return jsonify(result)
    else:
        result = {
            "message": "Comment couldn't be found",
            "statusCode": 404
        }
        return jsonify(result)

#Update your own comment
@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    to_be_updated = Comment.query.get(id)
    userid = current_user.id

    if to_be_updated and to_be_updated.user_id == userid and form.validate_on_submit():
        data = form.data

        to_be_updated.comment = data["comment"]
        to_be_updated.updatedAt = datetime.now()

        db.session.commit()
        success = {"message": "Comment edited succesfully!"}
        return jsonify(success)
    elif form.errors:
        return jsonify(form.errors)
    else:
        result = {
            "message": "Comment couldn't be found",
            "statusCode": 404
        }
        return jsonify(result)
