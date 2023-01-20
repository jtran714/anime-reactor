## January 4, 2022

Today, I worked on:

- Allotting points for each issue/stories and generating them in GitLab for MVP #1 and MVP #2.

My team and I discussed how we would implement our databases, and we have agreed to use a foreign key.
After discussing with Andrew, we have decided to proceed with MongoDB. We split up the MVP between all team members,
and I will be working on the login and logout functionality with Tommy.

Today, I learned about the differences between MongoDB and PostgreSQL.
I think that I prefer MongoDB so far! Seems like there's significantly less
syntax to memorize, but we will need to figure out how to make data relational.

## January 5, 2022

Today, I worked on:

- Revised my portion of the GitLab issues/stories based on the instructors' feedback.
- Completed a working draft of the Docker-Compose.yaml file with all containers running.

Today, Chengyun, Jordan, and I worked on creating the docker containers to set up the project.
Unfortunately, we were stuck on the same bug for about four hours with getting the Mongo Express container to run.
The SEIRs Matt and John were able to help us resolve our issues. It seems that the bug was caused by me using the wrong
Mongo image. I had tried 4.2, 4.4, and 6, but it seems that only 5 works on my computer.
The three of us also had an elaborate discussion with Carter regarding how our databases would be set up.
As we currently have three separate collections, we agreed that accounts will be in its own databases,
and watchlist and favorites will be in a separate database.

The biggest celebratory moment my team had for today was when we got all of the docker containers to run.
We can finally start coding! Our current forseeable problem would be to figure out how to use links to join our databases.

## January 6, 2022

Today, I worked on:

- Setting up the Mongo database
- Setting up end points for creating accounts

Today, our team decided to work individually on our own assigned portions of the backend.
Since I had the master copy of the project with the complete yaml file, I first pushed the commit to the main branch, and the rest of my group merged their current branch with the main to get the most up-to-date version. There were some hiccups along the way; Jordan and Chengyun's GHI container would not run even though it was working perfectly fine for me. We found a solution in the Help-Me-Understand channel (by changing CRLF to LF in VS Code), and we were able to get our projects running.
It is quite difficult to navigate between the lecture live code provided by James, the example repository on Learn that was made by Daniel, and the coding video from Curtis. It seems that there are multiple differences in the way the code is implemented and organized. (For example, our team discussed that Curtis's example has a separate folder for queries and routers, and he only kept settings in main.py, whereas James's example live code puts the router codes in the main.py as well without separate folders. As a team, we decided to organize our project using Curtis's method).
Currently, I am stuck on a but for creating a post request to create a user account. It's a ValidationError for the AccountOut response, as shown in the Docker terminal. I have compared my code to the lecture code, and it seems to be set up the same way. I will probably drop this bug in my team's group chat to see if anyone has a similar issue tomorrow.
In the mean time, I will continue to browse on StackOverflow. It was a great feeling when I pulled up docs for my service, and the FastAPI page loaded today!

## January 7, 2022

Today, I worked on:

- Finished set up of Mongo database
- Completed end points for sign up, login, and log out
- Implemented JWT Authentication

Today, I solved many bugs and finally got the accounts endpoints all set up, including the MongoDB database and JWT Authentication. I received some help from Jordan along the way, and we had some lengthy discussion regarding the project. On Monday, we will need to discuss with our team whether we should keep favorites, watchlists, and accounts in one single database, as we are referencing an external database, which could be our second microservice. It seems much easier to link two collections rather than two databases. I was stuck on a Validation Error for AccountOut, but reviewing James's code helped me resolve the issue.

## January 8, 2022

Today, I worked on:

- Mainly trying to help Jordan debug his issue with Auth.

Because we have our project set up using two databases, we are not quite sure how to link the databases. I am able to create a user and login to grab a token. However, when I try to use the token in Jordan's service to create a favorites item, the item is created successfully (as shown in MongoExpress), but the terminal throws an error. We have looked through the documentations but were not successful in solving the bug. We also discussed that James had set up to volumes for his separate services and two MongoExpress in his Yaml file. AS MongoExpress is just an admin interface, we are confused why there needs to be two different ones. We will verify with the teachers tomorrow. But as of right now, very happy that the backend for accounts is basically done!

## January 9, 2022

Today, I worked on:

- Consulting with Andrew on organization of our database
- Walking Tommy through my code
- Reorganizing directories and finalized Docker

I did not do much coding today. Instead, I finalized some concepts with my group. After discussing with Andrew, it seems like the only option we have right now is to have two separate databases, and we need to figure out how to link them. This is currently our biggest blocker.
Since Tommy is working on accounts with me, (I had already set up the backend for sign up, login, and signout, including JWT Auth), I walked him through my code so that he could start working on back ends for the PUT request. Jordan and I also combined favorites and watchlist into a single directory, since they will be two collections within the same database. Then we, rebuilt our containers and made sure they worked.
Later tonight, I walked Chengyun through how he could test his code using the JWT implementation that I wrote. I showed him how to create an account, login with those credentials, and grab the token generated at login. And finally, I completed the redux exploration, but it feels like a scratch on the surface.

## January 10, 2022

Today, I worked on:

- Debugging with Chengyun and Jordan to link databases.

Unfortunately, we are still unable to link our databases together. I am able to successfully create a user and login. When I log in, a token is generated. We tried adding a user_id field to the favorites model and try to add the user id in that field when we create a new favorites item, but that did not work. We noticed that we were able to create a favorites item regardless of whether we used an existing user id, so that means that the databases weren't linked up. No Ah-Ha moments. It's day 5 on the same bug, and the instructors/SEIRs are not of much help on MongoDB, unfortunately. We are considering switching to Postgresql.

## January 11, 2022

Today, I worked on:

- Debugging with Chengyun and Jordan to link databases.

Day 6 on the same bug. It was like a ray of sunshine when the instructor went over how to link Mongo databases in class today and shared his code for reference. The three of us got together after lunch and started to analyze the reference code and eventually changed our code to the same format. However, we kept getting an error when we tried to make a post request to create a user. Five hours into it, and we didn't even think to test the repo that we were using as a reference. We ran that project to test it, and turns out the post request for that project returns a 500 error. At this point, my team is exhausted and devastated, and we have decided to scrap our entire project and start fresh with postgres. We only have roughly two weeks left, and we can't spare another day on this.

## January 12, 2022

Today, I worked on:

- Setting up Docker.yaml for Postgres
- Set up PgAdmin
- Set up postgres database for accounts
- Start on backend for accounts microservice

Today was really productive. I was able to set up the Docker file by myself and PgAdmin, and I showed my team how to log onto PgAdmin. I was also able to set up the migrations file for the account services, and there were no hiccups along the way. (Good thing I did the winter break study guide!) I also set up the account backend for creating users and login. One current blocker from today is that my auto-login after sign up sometimes returns a 200 and an access token and sometimes a 401. I suspect that it has to do the with unique parameters (username and email). The biggest highlight of today was BeeKeeper! Much thanks to Matt for showing my team how to use it. I find it a lot easier to use compared to PgAdmin.

## January 13, 2022

Today, I worked on:

- Reorganized the stories on GitLab (created labels for each team member and arranged them in order on GitLab board)
- Set up goals list for the weekend for my team
- Resolved bug from auto login upon sign up

I realized that my team's progress is lagging behind many teams, so I tried to create a goals list for the long weekend. Everyone responded, and we agreed to work on the project together over the weekend. I also created an organization system to help my team track our progress better. I was also able to debug my error for sign-up. The user will be logged in immediately after they successfully create an account. The silly mistake I made was setting the username to the email in my routers when they're each its own thing.

## January 14, 2022

Today, I worked on:

- Fixed a new bug for login.
- Created endpoints for edit accounts.
- Created endpoints for account detail view and account list view
- Created endpoint for delete accounts

Today, Tommy, Jordan, Chengyun, and I worked on Discord. Tommy and I had a small meeting; since he is having difficulties doing backend for account editing, we have decided to swap tasks. I will now be doing all of the backends for accounts, including authentication, and he will get started on the frontend. Since I am very close to getting all of my tasks complete, I plan to watch the lecture recordings from this week in the next couple of days. While my teammates work on their tasks, I can go ahead and set up deployment and plan merge requests. That way when they finish their part, it will be easier to wrap things up. Since my teammates' microservices are dependent on my accounts service, I prioritized getting the backend endpoints done first so that they can test their features. Hopefully when we get back on Tuesday, my teammates who are in charge of front end will have something to show us.

## January 15, 2022

Today, I worked on:

- Helped my teammates (Jordan and Chengyun debug)
- Watched CI/CD lecture recording

Today, Jordan, Chengyun, and I worked on Discord together. We were mostly trying to debug and figure out how to link the databases. I was able to make the connection now between routers and queries, and I can better understand what variables are being passed in and out. (I was able to debug one of Jordan's issues today by checking the variables!) Matt would be so proud! I have also tested my endpoints again just to make sure that they are still all functional. And I reviewed the CI/CD material on Learn. Turns out half of the reading is not even relevant because it's focused on Django and Render.com.

## January 16, 2022

Today, I worked on:

- Set up CapRover for my team
- Watched recordings on writing tests

Today, I was on Discord for half the day in case anyone on my team needed help. Since everyone is still doing their parts of the code, I set up CapRover in the mean time. Unsure how much progress everyone is making, but I let everyone know that I would be online if anyone got stuck. I also re-watched the recordings on writing tests and will try to write some tests so that we can start merging tomorrow. Since our backend is pretty much done, we are just waiting on frontend now.

## January 17, 2022:

Today, I worked on:

- Frontend Login page

Today, Jordan and I had to meet with Andrew and Sabrina to give them some updates about our group project. Our backends are basically complete. We will need to work on the front-end. It seems that Tommy is having trouble working with accounts front-end, but he is also not sharing his bugs and haven't tested them. Because I don't want Jordan and Chengyun to have to wait for him, I created a login page for them to test their features. Andrew specified that we should not do Tommy's portion, so I will go ahead and leave the rest to him. Tomorrow, I will test my backend endpoints one more time and submit a merge request if everything seems to be working.

## January 18, 2022:

Today, I worked on:

- Frontend Auth
- Debugged for Jordan's frontend

Today, I wrote the frontend auth and tested it with the login form. Since Tommy was having struggles coming up with the auth, and Jordan and Chengyun need the frontend auth set up to test their own features, I decided to take over that story to alleviate his load. I was able to successfully incorporate that with login successfully; I could see the cookie being generated. I then gave my code to Jordan to test his code. I was able to help him debug and solve 4 errors! We then tried to use Andrew's snippet to grab the user_id from the token. With Carter and Matt's help, we were still stuck because we were not supposed to have an async function inside a useeffect. Tomorrow, we will continue to tackle that so that we can test his code. We will also merge my code and look into CapRover.
