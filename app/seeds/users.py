from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', name='Demo1', profile_img='https://res.cloudinary.com/hansenguo/image/upload/v1660950302/TheGramme/user_yiqxol.png', website='https://www.google.com', bio='I am a demo user', phone_number=12345678, gender='Male', public=True)
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', name='Demo2', profile_img='https://res.cloudinary.com/hansenguo/image/upload/v1660950302/TheGramme/user_yiqxol.png', website='https://www.google.com', bio='I am a demo user2', phone_number=12345678, gender='Male', public=True)
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', name='Demo3', profile_img='https://res.cloudinary.com/hansenguo/image/upload/v1660950302/TheGramme/user_yiqxol.png', website='https://www.google.com', bio='I am a demo user3', phone_number=12345678, gender='Male', public=False)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
