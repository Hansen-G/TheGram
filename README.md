## Discussion of both challenges faced and the way the team solved them
Each member in our team has a very different working and learning style, and we are able to handling that by working dynamically together through a combination of pair programming and solo programming. When we run into some difficult technically questions, we regroup and tackle that together. Because each one contributes different perspectives for problem solving, we were able to debug much faster and prevent less errors.
Besides that, each one's codling style is very different as well, and we respect that. We try to avoid duplication of work and merge conflict through detail task assignment and planning. We grouped at the beginning of the day to communicate what's would be the focuses of the day and who is on top of them, and also gathered at the end of the day to catch up what's completed during the day. Also we meet as need in case any adjustment is needed.


## Code snippets
### Roulette on HomePage
![](https://lh4.googleusercontent.com/35VJQJCV7nawGeZ-eyit2qtzI3ksHjrlgDeTdEOdbAccon_PtFYkpIgzxGLPaEo0BC2POgo5knswnK4LnfRsRyuqCL3II-Aa-36lCGIeX7CL6UQZKJdJpz2grzMf3o26cB4qAywCw4t5Bw7gQufRTYY) (edited)

# How to Install Application via Command Line
Go to [Repo](https://github.com/Hansen-G/TheGramme)
 1. Copy Code Link


 2. Open up terminal and input  ```git clone 'Link from github'``` in your desired folder.


 3. Got to application by using ```cd /Folder Location```.


 4. Open Up Code in your IDE by using code . in the location folder.


 5. Open up the integrated terminal.


 6. In one terminal instances run NPM Install in the ```/frontend``` directories.



 7. In the backend terminal run: ```pipenv install```  then  ```pipenv run flask run ``` then ```flask db init && flask db migrate && flask db upgrade```


 8. In the react-app folder create a .env file and and input ```SECRET_KEY='your-secret-key-goes-here' DATABASE_URL=sqlite:///dev.db```


 9. In the front end terminal run **npm start**


# Link to WIKI and additional information
[Wiki](https://github.com/Hansen-G/TheGramme/wiki)
[Feature List](https://github.com/Hansen-G/TheGramme/wiki/Feature-List)
[Database Schema](https://github.com/Hansen-G/TheGramme/wiki/Database-Schema-Image-with-Relationships)
[User Stories](https://github.com/Hansen-G/TheGramme/wiki/User-Stories)

# Landing Page:



# Creating a new Image/Post
 1. Log In , Sign Up or Use the Demo User


 2. Click on Become the Plus Icon in the Navbar


 3. Enter the Images Information


# Edit Image
1. Click on a User Profile


2. Click on the image you would like to edit, then click the ```...``` icon


3. Edit Image Info


# Deleting Image
1. If you are the owner of a image follow the previous instructions but click on the delete button


# Creating a Comment

1. Click on an images comment icon or input the comment in the comment field

# Edit a Comment
1. Click on the view all message icon on the image
2. Click on the ```...``` icon on your comment
3. Input the changes
4. Click on Submit

# Deleting a Comment
1. If you are the creator of a comment
2. Click on the view all message icon on the image
3. Click on the ```...``` icon on your comment
4. Click on Delete

# Like or Unlike a comment or Image
Like or Unlike a comment or Image
5. Click on the heart icon on a image
6. Click on the view all message icon on the image
7. Click on the heart icon on a comment
8. Click on Delete

# Follow or Unfollow a user
1. Click on a users profile
2. Click on the follow icon
