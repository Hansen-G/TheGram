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
image4 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.foodista.com%2Fsites%2Fdefault%2Ffiles%2FIMG_9630-001.JPG&f=1&nofb=1',
    description='Made some delicious rice today 🍚, Thought I would share',
    show_stats=True,
    user_id=2,
    user_image_likes=[user1, user3]
    )
image5 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyournorthcounty.com%2Fwp-content%2Fuploads%2F2014%2F12%2FSteak.jpg&f=1&nofb=1',
    description='Another day another steak 🥱',
    show_stats=True,
    user_id=2,
    user_image_likes=[user1, user3]
    )
image6 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.cwd7Zgo-nn52OJogYpsXKAHaLG%26pid%3DApi&f=1',
    description='Decided to eat out today, great restaurant and impeccable service',
    show_stats=True,
    user_id=2,
    user_image_likes=[user1, user3]
    )
image7 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flh3.googleusercontent.com%2Fpw%2FACtC-3cpkcK_rSeuHdhrAIp1rvpIESMqAFHVzq4lPfsk2A3aigN1w712IUXbrSkQP1IJ1FIRFaTzUjv6stOFrP8TbBPv8aDZgIilRHELqdTNGDlkkYfs5qQXtNFYjf7aroCmn7osOOzZ2A-VNLUpypPLvJ0eMA%3Dw1756-h1316-no%3Fauthuser%3D0&f=1&nofb=1',
    description='Had fun hiking today, cant wait to do it again! 🏔 🌥',
    show_stats=True,
    user_id=2,
    user_image_likes=[user1, user3]
    )
image8 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmyedmondsnews.com%2Fwp-content%2Fuploads%2F2013%2F11%2F20131116_sunset.jpg&f=1&nofb=1',
    description='😳',
    show_stats=True,
    user_id=2,
    user_image_likes=[user1, user3]
    )
image9 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.stack.imgur.com%2F6nK8i.png&f=1&nofb=1',
    description='So pythonic... 🤤. My favorite language by far',
    show_stats=True,
    user_id=3,
    user_image_likes=[user1, user3]
    )
image10 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgrendz.com%2Fwp-content%2Fuploads%2F2020%2F07%2Fsmartlightingtowers-1593671378g8k4n.jpg&f=1&nofb=1',
    description='My new setup, looks pretty good if I say so myself',
    show_stats=True,
    user_id=3,
    user_image_likes=[user1, user3]
    )
image11 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fc2.staticflickr.com%2F6%2F5142%2F14038975921_46df978841_b.jpg&f=1&nofb=1',
    description='Finally decided to touch some grass today',
    show_stats=True,
    user_id=3,
    user_image_likes=[user1, user3]
    )
image12 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.10nineteen.com%2Fwp-content%2Fuploads%2F2020%2F09%2F2020-09-05-FJKO7265.jpg&f=1&nofb=1',
    description='Got to take the new bike out for a spin, Super smooth and a great workout!',
    show_stats=True,
    user_id=8,
    user_image_likes=[user1, user3]
    )
image13 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F1%2F1f%2FNorco_Range.jpg%2F1200px-Norco_Range.jpg&f=1&nofb=1',
    description='Mountain biking is such a freeing experience, beautiful weather to ride!',
    show_stats=True,
    user_id=8,
    user_image_likes=[user1, user3]
    )
image14 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi0.wp.com%2Fextremesportsx.com%2Fwp-content%2Fuploads%2F2019%2F03%2FBenefits-Mountain-Biking.jpg%3Ffit%3D799%252C533%26ssl%3D1&f=1&nofb=1',
    description='Shot of me at the biking competition 🚴‍♀️',
    show_stats=True,
    user_id=8,
    user_image_likes=[user1, user3]
    )
image15 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flive.staticflickr.com%2F3710%2F9779273246_c1722c6b84_b.jpg&f=1&nofb=1',
    description='Put down the bike and went for a hike',
    show_stats=True,
    user_id=8,
    user_image_likes=[user1, user3]
    )
image16 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmiro.medium.com%2Fmax%2F1400%2F1*rvs5GF0kH1MavpajxX3YRA.png&f=1&nofb=1',
    description='So much better than python...',
    show_stats=True,
    user_id=5,
    user_image_likes=[user1, user3]
    )
image17 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.0KH7dKj-DrrttTj6-8bdVQHaFj%26pid%3DApi&f=1',
    description='My fabulous setup',
    show_stats=True,
    user_id=5,
    user_image_likes=[user1, user3]
    )
image19 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmajor.io%2Fwp-content%2Fuploads%2F2014%2F08%2Fgithub.png&f=1&nofb=1',
    description='My github -> https://github.com/huifeng248',
    show_stats=True,
    user_id=6,
    user_image_likes=[user1, user3]
    )
image20 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmajor.io%2Fwp-content%2Fuploads%2F2014%2F08%2Fgithub.png&f=1&nofb=1',
    description='My github -> https://github.com/Hansen-G',
    show_stats=True,
    user_id=7,
    user_image_likes=[user1, user3]
    )
image21 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmajor.io%2Fwp-content%2Fuploads%2F2014%2F08%2Fgithub.png&f=1&nofb=1',
    description='My github -> https://github.com/yonilurie',
    show_stats=True,
    user_id=4,
    user_image_likes=[user1, user3]
    )
image22 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmajor.io%2Fwp-content%2Fuploads%2F2014%2F08%2Fgithub.png&f=1&nofb=1',
    description='My github -> https://github.com/nullgar',
    show_stats=True,
    user_id=9,
    user_image_likes=[user1, user3]
    )
image23 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.lTltASSMC4DXiOA6DDj3HwHaKG%26pid%3DApi&f=1',
    description='Cute pug',
    show_stats=True,
    user_id=10,
    user_image_likes=[user1, user3]
    )
image24 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F19%2Fdb%2F7f%2F19db7f949f4d32048504ca5ef1dbb03a.jpg&f=1&nofb=1',
    description='Kitty',
    show_stats=True,
    user_id=10,
    user_image_likes=[user1, user3]
    )
image25 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2FvUZUBRZ.jpg&f=1&nofb=1',
    description='Ducky',
    show_stats=True,
    user_id=10,
    user_image_likes=[user1, user3]
    )
image26 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.AFopSl5I12VsC0at-R8FLgHaHa%26pid%3DApi&f=1',
    description='Cute cow',
    show_stats=True,
    user_id=10,
    user_image_likes=[user1, user3]
    )
image27 = Image(
    url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.vzEN_Vmirn7twAjjuTVLAwHaFj%26pid%3DApi&f=1',
    description='Cute tapir',
    show_stats=True,
    user_id=10,
    user_image_likes=[user1, user3]
    )
    
images_list = [image1,image2,image3,image4,image5,image6,image7,image8,image9,image10,image11,image12,image13,image14,image15,image16,image17,image19,image20,image21,image22]
def seed_images():
    for image in images_list:
        db.session.add(image)
        db.session.commit()
    # db.session.add(image1)
    # db.session.add(image2)
    # db.session.add(image3)

    # db.session.commit()


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()