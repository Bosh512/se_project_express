# WTWR (What to Wear?): Back End

The back end componenent the WTWR Project. This project contains the necessary framework to send and receive requests from a server to fulfill the purposes of the site, which include creating new Clothing Item Cards, creating new Users, storing the associated Items and Likes of Users, etc. The following commands can be used to test the code.

## About the project

The idea of the application is pretty simple - we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

Users are able to sign in, and must do so to create new cards that display their clothing items. The clothing items are then displayed based on the weather, and can be liked or deleted so long as the user is signed in. New ones can also be added by signed in users.

There is a demonstration video that goes into full lengths of the sites functions below.

`npm run start` — to launch the server from the bash terminal on the local macine

`npm run dev` — to launch the server with the hot reload feature on the local machine

`npm start` - in the virtual machine terminal to launch the project

## Technologies Used

The front end of this project was created using React, HTML, and CSS. The HTML components, linked to CSS stylesheets, were broken down into seperate React components to ensure clean code and an overall more organized project, which will aid developement to add future fucntionality to the project.

This project was constructed using Express.js, a flexible Node.js application specifically designed to handle back end applications and requests. The Postman and MondoDB Compass applications were also used to test the various functions of the software. Several other minor softwares such as EsLint and Prettier were also used to ensure that the code was consice and consistent. MongoDB and Postman were also used to test these endpoints. We used a local server on my local machine to create the project initially, and then proceeded with a virtual machine.

I also utilized Google Cloud services to run a virtual machine, onto which I transferred the project so that it could be connected to a domain. I used freedns.afraid.org to set up the domain names and connect them to the project. We used tome basic softwares like pm2 and nginx in conjuction with our virtual machine.

We use "npm run dev" on both the front and back ends to launch the server with the hot reload feature for ease of use purposes. We also use "npm start" to launch the project on the vm.

The project itself follows a basic and streamlined approach typical of Express.js applications. The various controllers, routes, and models were created seperately and integrated through an index file to maintain consise and readable code.

## Videos

Here are a couple videos of me pitching my project, and demonstrating its functionality.

- [Project Pitch Video](https://drive.google.com/file/d/1t9mmWnIuasQmGugOHnpAUkV2Pe1z1cwE/view?usp=sharing)
- [Project Demo Video](https://drive.google.com/file/d/1XO9fmdQrscRcFxMwV7UBOmQp8CbkVV6V/view?usp=sharing)

## Links

- [Project](https://wtwrbosh512.jumpingcrab.com)
- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)
- [Github Pages](https://Bosh512.github.io/se_project_react/)
- [Backend](https://github.com/Bosh512/se_project_express)
- [Demo Video](https://drive.google.com/file/d/1XO9fmdQrscRcFxMwV7UBOmQp8CbkVV6V/view?usp=sharing)
- [Pitch Video](https://drive.google.com/file/d/1t9mmWnIuasQmGugOHnpAUkV2Pe1z1cwE/view?usp=sharing)
