from app.models import db, User, Image


# Adds a demo user, you can add other users here if you want
user1 = User(
    username='Demo', 
    email='demo@aa.io', 
    password='password', 
    name='Demo1', 
    profile_img='https://res.cloudinary.com/hansenguo/image/upload/v1660950302/TheGramme/user_yiqxol.png', 
    website='https://www.google.com', 
    bio='I am a demo user', 
    phone_number=12345678, 
    gender='Male', 
    public=True
    )
user2 = User(
    username='marnie', 
    email='marnie@aa.io', 
    password='password', 
    name='Demo2', 
    profile_img='https://res.cloudinary.com/hansenguo/image/upload/v1660950302/TheGramme/user_yiqxol.png', 
    website='https://www.google.com', 
    bio='I am a demo user2', 
    phone_number=12345678, 
    gender='Male', 
    public=True,
    followers= [user1]
    )

user3 = User(
    username='bobbie', 
    email='bobbie@aa.io', 
    password='password', 
    name='Demo3', 
    profile_img='https://res.cloudinary.com/hansenguo/image/upload/v1660950302/TheGramme/user_yiqxol.png', 
    website='https://www.google.com', 
    bio='I am a demo user3', 
    phone_number=12345678, 
    gender='Male', 
    public=False,
    followers=[user2, user1]
    )

def seed_users():
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)

    db.session.commit()





# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
                     
