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
    name='Marnie B', 
    profile_img='https://res.cloudinary.com/hansenguo/image/upload/v1660950302/TheGramme/user_yiqxol.png', 
    website='https://www.google.com', 
    bio='I am a demo user2', 
    phone_number=4256666666, 
    gender='Male', 
    public=True,
    followers= [user1]
    )

user3 = User(
    username='Darrel', 
    email='darrel@aa.io', 
    password='password', 
    name='Darrel S', 
    profile_img='https://res.cloudinary.com/hansenguo/image/upload/v1660950302/TheGramme/user_yiqxol.png', 
    website='https://www.google.com', 
    bio='🐍🐍🐍 Love Python, Especially for backend web development!', 
    phone_number=2065555555, 
    gender='Male', 
    public=False,
    followers=[user2, user1]
    )
user4 = User(
    username='steven95', 
    email='steven@aa.io', 
    password='password', 
    name='Steven G', 
    profile_img='https://res.cloudinary.com/hansenguo/image/upload/v1660950302/TheGramme/user_yiqxol.png', 
    website='https://www.google.com', 
    bio='My name is Steven, follow me for some great content', 
    phone_number=9999999999, 
    gender='Male', 
    public=False,
    followers=[user2, user1]
    )
user5 = User(
    username='sarah88', 
    email='sarah@aa.io', 
    password='password', 
    name='Sarah T', 
    profile_img='https://res.cloudinary.com/hansenguo/image/upload/v1660950302/TheGramme/user_yiqxol.png', 
    website='https://www.google.com', 
    bio='My name is Sarah. I love Javascript and Frontend web development. ⚛️ React > *', 
    phone_number=1111111111, 
    gender='Female', 
    public=False,
    followers=[user2, user1]
    )
user6 = User(
    username='yonilurie', 
    email='yoni@aa.io', 
    password='password', 
    name='Yoni Lurie', 
    profile_img='https://avatars.githubusercontent.com/u/92499732?v=4', 
    website='https://github.com/yonilurie', 
    bio='Yoni', 
    phone_number=1212121212, 
    gender='Male', 
    public=False,
    followers=[user5, user3, user2]
    )
user7 = User(
    username='hansenguo', 
    email='hansen@aa.io', 
    password='password', 
    name='Hansen Guo', 
    profile_img='https://avatars.githubusercontent.com/u/77709211?v=4', 
    website='https://github.com/Hansen-G', 
    bio='Hansen', 
    phone_number=2121212121, 
    gender='Male', 
    public=False,
    followers=[user4, user6]
    )
user8 = User(
    username='abbyfeng', 
    email='abby@aa.io', 
    password='password', 
    name='Abby Feng', 
    profile_img='https://avatars.githubusercontent.com/u/91226395?v=4', 
    website='https://github.com/huifeng248', 
    bio='Abby', 
    phone_number=3232323232, 
    gender='Female', 
    public=False,
    followers=[user1, user7, user6, user5]
    )
user9 = User(
    username='jonatanaguilar', 
    email='jon@aa.io', 
    password='password', 
    name='Jonatan Aguilar', 
    profile_img='https://avatars.githubusercontent.com/u/61948122?v=4', 
    website='https://github.com/nullgar', 
    bio='Jonatan', 
    phone_number=3232323232, 
    gender='Male', 
    public=False,
    followers=[user5,user6,user7]
    )
user10 = User(
    username='cuteanimals', 
    email='cuteanimals@aa.io', 
    password='password', 
    name='Cute Animals', 
    profile_img='https://res.cloudinary.com/hansenguo/image/upload/v1660950302/TheGramme/user_yiqxol.png', 
    website='https://www.google.com', 
    bio='Follow for cute animals!', 
    phone_number=4141414141, 
    gender='Female', 
    public=False,
    followers=[user1,user2,user3,user4,user5,user6,user7,user8,user9]
    )
seed_data = [user1,user2,user3,user4,user5,user6,user7,user8,user9,user10]
def seed_users():
    for user in seed_data:
        db.session.add(user)
        db.session.commit()
    
    # db.session.add(user1)
    # db.session.commit()
    # db.session.add(user2)
    # db.session.commit()
    # db.session.add(user3)
    # db.session.commit()
    # db.session.add(user4)
    # db.session.commit()
    # db.session.add(user5)
    # db.session.commit()
    # db.session.add(user6)
    # db.session.commit()
    # db.session.add(user7)
    # db.session.commit()
    # db.session.add(user8)
    # db.session.add(user9)
    # db.session.add(user10)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
                     
