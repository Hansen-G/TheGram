
# Introduction
[TheGramme (https://the-gramme.herokuapp.com/)](https://the-gramme.herokuapp.com/) is a web app for sharing, commenting and liking photos. It was inspired by instagram.com. The project is built using React, Redux, Flask, Python and SQLAlchemy. You can discover, share and socialize on TheGramme.

# Feature list document

## Signup and Login

1. You can login in if you already have an account or as the demo user.
![image](https://res.cloudinary.com/hansenguo/image/upload/v1661708010/TheGramme/login_kiivbe.png)

2. If you want to have your own account, please click sign up.
![image](https://res.cloudinary.com/hansenguo/image/upload/v1661708012/TheGramme/signup_e92rql.png)


## Homepage

1. The homepage will display the posts from whom you are currently following in chronological order.
![image](https://res.cloudinary.com/hansenguo/image/upload/v1661708337/TheGramme/home1_glokuc.png)

2. If you didn't follow anyone, TheGramme will recommend new account for you to follow.
![image](https://res.cloudinary.com/hansenguo/image/upload/v1661708338/TheGramme/home2_cgeguh.png)


## Creating a new Image/Post

 1. Log In , Sign Up or Use the Demo User

 2. Click on Become the Plus Icon in the Navbar

 3. Enter the Images Information
 ![image](https://res.cloudinary.com/hansenguo/image/upload/v1661708689/TheGramme/post_agws3w.png)


## Edit Image
If you are the owner of a image, you can edit your image.

1. Click on a User Profile

2. Click on the image you would like to edit, then click the ```...``` icon
![image](https://res.cloudinary.com/hansenguo/image/upload/v1661719385/TheGramme/edit1_jsciiy.png)

3. Edit Image Info
![image](https://res.cloudinary.com/hansenguo/image/upload/v1661719386/TheGramme/edit2_ozpgq2.png)

## Deleting Image

1. If you are the owner of a image follow the previous instructions but click on the delete button

## Creating a Comment

1. Click on an images comment icon or input the comment in the comment field
![image](https://res.cloudinary.com/hansenguo/image/upload/v1661719511/TheGramme/comment_vmk6ep.png)

## Edit a Comment

1. Click on the view all message icon on the image
2. Click on the ```...``` icon on your comment
3. Input the changes
![image](https://res.cloudinary.com/hansenguo/image/upload/v1661719513/TheGramme/comment2_evmkn1.png)
4. Click on Submit

## Deleting a Comment

1. If you are the creator of a comment
2. Click on the view all message icon on the image
3. Click on the ```...``` icon on your comment
4. Click on Delete

## Like or Unlike a comment or Image

Like or Unlike a comment or Image
5. Click on the heart icon on a image
6. Click on the view all message icon on the image
7. Click on the heart icon on a comment
8. Click on Delete

## Follow or Unfollow a user

1. Click on a users profile
2. Click on the follow icon
![image](https://res.cloudinary.com/hansenguo/image/upload/v1661719618/TheGramme/flollow_oq6a2q.png)



# How to Install Application via Command Line



Go to [Repo](https://github.com/Hansen-G/TheGramme)
 1. Copy Code Link
 
<img width="400" height="200" alt="Screenshot 2022-08-27 at 10 57 35 PM" src="https://user-images.githubusercontent.com/61948122/187086891-807e04bf-958a-4e59-b49e-becd86ee68a0.png">

 2. Open up terminal and input  ```git clone 'Link from github'``` in your desired folder.
 
<img width="600" height="300" alt="Screenshot 2022-08-28 at 10 26 04 AM" src="https://user-images.githubusercontent.com/61948122/187086901-56ef5245-0c0b-4bc8-9f5b-f33e21eaebce.png">


 3. Got to application by using ```cd /Folder Location```.
 
<img width="600" height="300" alt="Screenshot 2022-08-28 at 10 28 47 AM" src="https://user-images.githubusercontent.com/61948122/187086935-e1c719b6-30fe-4f6c-b95e-635d7ac94aaa.png">


 4. Open Up Code in your IDE by using code . in the location folder.

<img width="600" height="300" alt="Screenshot 2022-08-28 at 10 31 58 AM" src="https://user-images.githubusercontent.com/61948122/187087107-03c7ac45-2257-4044-aced-4a871f10414e.png">


 5. Open up the integrated terminal.

<img width="600" height="300" alt="Screenshot 2022-08-28 at 10 34 48 AM" src="https://user-images.githubusercontent.com/61948122/187087212-e1835cf3-9d7d-4a78-b8cd-dfe44e144b55.png">


 6. In one terminal instances run NPM Install in the ```/frontend``` directories.

<img width="600" height="300" alt="Screenshot 2022-08-28 at 10 37 16 AM" src="https://user-images.githubusercontent.com/61948122/187087321-da2f80dd-6aa2-4892-b364-60e517622b1b.png">



 7. In the backend terminal run: ```pipenv install```  then  ```pipenv run flask run ``` then ```flask db init && flask db migrate && flask db upgrade```
 
<img width="600" height="300" alt="Screenshot 2022-08-28 at 10 38 21 AM" src="https://user-images.githubusercontent.com/61948122/187087365-5a944dc2-a695-4144-bb03-7308370d1e02.png">


 8. In the react-app folder create a .env file and and input ```SECRET_KEY='your-secret-key-goes-here' DATABASE_URL=sqlite:///dev.db```

<img width="400" height="300" alt="Screenshot 2022-08-28 at 10 39 14 AM" src="https://user-images.githubusercontent.com/61948122/187087391-acb9f5be-bd6f-4bec-b391-66cff64e6199.png">

 9. In the front end terminal run **npm start**
 
<img width="600" height="300" alt="Screenshot 2022-08-28 at 10 40 16 AM" src="https://user-images.githubusercontent.com/61948122/187087439-136799ea-2592-4d95-8416-59448c281400.png">



# Link to WIKI and additional information
[Wiki](https://github.com/Hansen-G/TheGramme/wiki)
[Feature List](https://github.com/Hansen-G/TheGramme/wiki/Feature-List)
[Database Schema](https://github.com/Hansen-G/TheGramme/wiki/Database-Schema-Image-with-Relationships)
[User Stories](https://github.com/Hansen-G/TheGramme/wiki/User-Stories)


# Link to WIKI and additional information

[Wiki](https://github.com/Hansen-G/TheGramme/wiki)

[API documation](https://github.com/Hansen-G/TheGramme/wiki/API-Documentation)

[Feature List](https://github.com/Hansen-G/TheGramme/wiki/Feature-List)

[Database Schema](https://github.com/Hansen-G/TheGramme/wiki/Database-Schema-Image-with-Relationships)

[User Stories](https://github.com/Hansen-G/TheGramme/wiki/User-Stories)

[Design Specification](https://github.com/Hansen-G/TheGramme/wiki/Design-Specification)


# Technologies used
### Backend:

- Python
- Flask
- SQLAlchemy
- PostgreSQL
- WTForms
- Docker
- Heroku

### Frontend:
- JavaScript
- React
- Redux
- CSS
- HTML

# Code snippets
### Roulette on HomePage
![](https://lh4.googleusercontent.com/35VJQJCV7nawGeZ-eyit2qtzI3ksHjrlgDeTdEOdbAccon_PtFYkpIgzxGLPaEo0BC2POgo5knswnK4LnfRsRyuqCL3II-Aa-36lCGIeX7CL6UQZKJdJpz2grzMf3o26cB4qAywCw4t5Bw7gQufRTYY) (edited)




# Challenges faced and the way the team solved them

Each member in our team has a very different working and learning style, and we are able to handling that by working dynamically together through a combination of pair programming and solo programming. When we run into some difficult technically questions, we regroup and tackle that together. Because each one contributes different perspectives for problem solving, we were able to debug much faster and prevent less errors.
Besides that, each one's codling style is very different as well, and we respect that. We try to avoid duplication of work and merge conflict through detail task assignment and planning. We grouped at the beginning of the day to communicate what's would be the focuses of the day and who is on top of them, and also gathered at the end of the day to catch up what's completed during the day. Also we meet as need in case any adjustment is needed.

# To-dos/future features

- Using S3 for image upload with Flask
- Direct messaging
- Hashtags
