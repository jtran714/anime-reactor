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
