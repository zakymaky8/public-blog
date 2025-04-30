# Public Blog
Front end blog for viewing posts and interacting on.

## Contents

[Description](#description)

[Tech Stack](#tech-stack-used)

[Installation](#installation)

[Contribution](#contribution)

1. [option 1](#option-1)
2. [option 2](#option-2)

[Liscense](#license)

[Deployement](#deployement)

[Live Demo](#live-demo)


## Description

- This is a blog application created for multi-user end who are looking forward blog posts which are normally sourced from [blog manager website](https://zach-logger.verce.app). Refer the code [here](https://github.com/zakymaky8/blog-manager) for more information.

## Preview


#### How it works

- First users create their account and log in using their credentials. the correctness of there credential will be reflected from the success status messages.
- After a typical user logs in he/she can manipulate his/her information on user information and activity page which can be found by clicking the user icon. Users can even change their profile picture, username  and their name with being on that page.
- User can limit the amount of items  they want to see on a single page, by selecting the amount specified on the drop down element.
- users can create suggestions by clicking  suggest topics tab.



## Tech Stack used

1. **Front end frameword** : Here ***Next js*** is used to build interfaces, to aquire benefits from server side rendering and good user experience.
2. **CSS framework**: ***TailwindCSS***, utility first framework which flourished this applications in almost every stylings and micro-interactive functionalities for better user experience.
3. **Type safe development**: **TypeScript**, has been the go to languange these days to make typing perfect, so I used it.
4. **Cloudinary**: on cloudinary hosted profile pictures.



## Features

- reading and reacting on posts with for instance likes, dislikes, comments and replies.
- the number of views implying how many users are clicking through the page and have taken from a tip of the post to all the way.
- creating suggestions which users might think it should be considered while posts are prepared.
- adding and updating profile pictures.
- pagination and limit of items.

## Installation

To install the packages, use the following steps
1. open your terminal in VS code( if you use so):
    `ctrl + backtick `

2. Then do

```bash
npm install
```

3. To Run the app in your dev server

```bash
npm run dev #then develpement server will start listening on port 3003, you can change it from package.json file
```

## Contribution

Contributions are welcome. Your suggestions are invaulable to me. If you plan to do so, follow the following steps in two different ways.
#### Option 1

1. Fork the repository, if you want to work on it on your dedicated repository,
2. Optimize per use suitability in your local machine (it is all yours after that, but I would love to see your suggestions)
3. And code around limitlesslly

#### Option 2
1. Clone the repository (have the exact copy of the codebase on your local machine);
2. Create an issue for your intended changes.
3. Create a branch for that issue.
4. Then change to the root directory while your are at it do,
``` bash
    git fetch --all
    git checkout [your_branch_name]
```
5. Make changes on that branch.
6. After you are comfortable with your new feature or suggestions (whatever), you would be benefited from
    ```
    git pull origin [main_branch]
    ```
7. Finally push your changes
    ```
    git push
    ```
8. Create pull request, I am there to approve.

## License
This project is licensed under the [MIT License](https://github.com/Uwancha/memory-card/blob/main/LICENSE). Feel free to play around manipulating it.

## Deployement

This front end application is deployed on [vercel](https://vercel.com/), and the

1. **API**: is served from [Render](https://render.com), which serves the frontend app
2. **Database**: postgresql database is awesomely served from [Railway](https://railway.com/), which keeps track of **CRUDing** attempts.


## Live Demo

Application is Live at [Zachlog](https://zach-log.vercel.app/).