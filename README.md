































































































































































# How to Install Application via Command Line<img width="600" height="300" alt="Screenshot 2022-08-28 at 10 31 58 AM" src="https://user-images.githubusercontent.com/61948122/187087085-834c0447-3fec-4af2-826c-6964c0922ec3.png">

Go to [Repo](https://github.com/Hansen-G/TheGramme)
 1. Copy Code Link
 
<img width="600" height="300" alt="Screenshot 2022-08-27 at 10 57 35 PM" src="https://user-images.githubusercontent.com/61948122/187086891-807e04bf-958a-4e59-b49e-becd86ee68a0.png">

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
