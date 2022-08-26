from app.models import db, User, Image, Comment, CommentsLikes, Imageslikes, follows
from .users import user1, user2, user3
from .images import image1,image2,image3


comment1 = Comment(
    image_id=1,
    user_id=1,
    comment="this is my first post and first comment",
    user_comment_likes=[user1]
    )

comment2 = Comment(
    image_id=2,
    user_id=1,
    comment="this is my first post and first comment",
    user_comment_likes=[user2, user3]
    )

comment3 = Comment(
    image_id=2,
    user_id=3,
    comment="this is my first post and first comment",
    user_comment_likes=[user1, user2, user3]
    )

def seed_comments():
    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)

    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()