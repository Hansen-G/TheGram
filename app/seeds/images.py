from app.models import db, User, Image, Comment, CommentsLikes, Imageslikes, follows
from .users import user1, user2, user3

image1 = Image(
    url='https://a0.muscache.com/im/pictures/619ab404-7a6c-4425-a79c-9459b1c00b1b.jpg?im_w=1200',
    description='nice place',
    show_stats=True,
    user_id=1,
    user_image_likes=[user1, user2]
    )

image2 = Image(
    url='https://a0.muscache.com/im/pictures/619ab404-7a6c-4425-a79c-9459b1c00b1b.jpg?im_w=1200',
    description='nice home',
    show_stats=True,
    user_id=2,
    user_image_likes=[user1, user2]
    )

image3 = Image(
    url='https://a0.muscache.com/im/pictures/619ab404-7a6c-4425-a79c-9459b1c00b1b.jpg?im_w=1200',
    description='I want to stay',
    show_stats=True,
    user_id=2,
    user_image_likes=[user1, user3]
    )
    

def seed_images():
    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)

    db.session.commit()


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()