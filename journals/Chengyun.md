## Journals

#### Date: 2023-01-03
- Focus on API design. Setting up API endpoint
Each of us start making a draft API endpoint.
Specify the MVP and discuss the possible issue.
<br>

#### Date: 2023-01-04
- Focus on building issues and allocating points
Whole team discuss about MVP and split each feature to issues.
Consult with instructor about using MongoDB on our MOD 3 project.

Each of us works on assigned issues and start working on make issues on GitLab board.
I work on assigned features (#6 and #7) and create corresponding user stories
<br>

#### Date: 2023-01-05
- Focus on project setup: Docker and MongoDB
The whole team works together on applying the docker configuration.
We discuss about the organization of our collection and database again to clarify how to build the functionality.
Jess and Jordan contributed a lot and we eventually conclude 2 databases and 3 collections.

> **Account** - users data  <br>
> **Anime** - favorites data, watch lists data  <br>

We generally set up the docker-compose function and we are able to connect to the FastAPI docs page.
Finish the issue for another feature.
Discuss and clarify the requirement of issues around 5 PM. Need to update the issues.
<br>

- To do:
1. Update the issue:
    - [x] Change “Description” to “Acceptance Criteria“.
    - [x] Add “Linked items” to organize linked issues.
<br>

#### Date: 2023-01-06
- Focus on coding: Docker and MongoDB were generally ready. We start working on coding part.
To facilitate the coding express, each of us working on assigned feature, and work together when encounter issues.
We set up each feature separately, and we will work together when we are going to link different data/database.
<br>

#### Date: 2023-01-08
- (Holiday) Individually work on the watchlist feature. Setup the GET, POST requests. Issue updated.
- To do:
1. Authentication
    - [ ] Check with the team about the SIGNING_KEY name and key
    - [ ] Check-about AccountIn, AccountOut, Account models. Location of Authenticator
<br>

#### Date: 2023-01-09

- Focus on coding: Discuss with instructor about setting database. According to the
For the watchlist feature, general function works, but still working on adjusting the authentication part.
Try to set up accounts setting to test if the authentication.
Account are set up in it's own service with model file in the service folder. Try to import those as setting.
Still have issue with login, might not get the correct data from the account info.
<br>

#### Date: 2023-01-10

- Focus on coding: Apply the changes on database.
We have decided to move the favorite and watchlist together in the anime database. Apply changes and check how to work together.
Since we have clarified the relationship as one to many, each account may leads to multiple watchlists/favorites. Need to adjust the router and queries.


- To-do

  [x] Add owner property on queries
  [x] Check how to use info delivered by account/ token
<br>

#### Date: 2023-01-11
  - Focus on coding: Applying the lecture of authentication.
  Followed advices, we re-built all container and tried the code introduced in the lecture.
  Jess, Jordan and I have been trying to apply the code and adjust the database setup to the demo.
  However, the account authentication still did not really work.
  We decided to save the code we have built for now and give the SQL a try.
<br>

#### Date: 2023-01-12
  - Focus on project setup: Setting up the project with postgres and rebuild from beginning.
  Jess set up the postgres with dockers. We all help with checking the update.
  Alvi approve the merge request.
  We now have a new main branch and everyone will work on the new branch.
<br>

#### Date: 2023-01-13
 - Focus on watchlist with new setting:
 Check-in with backend team. Tommy also attend today.
  Adjust code to fit the new setting. Work with Jess, Jordan on the account part. Check with Jordan on the way to do authentication. We eventually set up the environment.
  Account service seems stable now. Get account service locally to test the authentication part.
<br>

#### Date: 2023-01-14
 - Focus on watchlist with new setting:
  Check-in with the back-end team.Jess and Jordan helped the application of the favorite and watchlist services, but tha authentication is still not working. Check with Jordan regarding the insomnia setting.

<br>

#### Date: 2023-01-15
- Focus on watchlist authentication:
  Check-in with the back-end team.Jess and Jordan helped the application of the favorite and watchlist services, but tha authentication is still not working.

<br>

#### Date: 2023-01-16
- Focus on watchlist authentication:
 Most authentication services on watchlist works, but I encounter some issue on get all part.

<br>

#### Date: 2023-01-17
- Focus on watchlist authentication:
Check with team on watchlist functionality. Jess and Jordan try to help and provide some suggestions. I also check with morning SEIRs, but the issue is still not solved (GET all watchlists in database). After discussion with Jess and Jordan, we agreed that it is not a functionality that user may need. Remove it for now, and I can comeback later if needed.
Start drafting the front-end. Check the React Hook.

<br>


#### Date: 2023-01-18
- Focus on watchlist authentication:
Try a different method to do the authentication. However, on my part it is obviously not taken the token. Confirmed that the token is working (fastAPI token on the chrome). There is definitely something missing.Go back and check the frontend setting.

<br>

#### Date: 2023-01-19
- Focus on watchlist authentication on frontend:
Get help from Jess and Jordan. I checked the functionality built in our app and confirmed that backend is mostly working.
We tried to decode of JWT token and get the account info. We tested a different way to deliver the token with hook.
It seems working on the other services. I also try to apply that on my part.
Noticed that the issue on the front end. Check again the authentication on frontend on the Learn. Noticed that I missed part of codes. Eventually, I am able to decode and find the account info on the console.

<br>

#### Date: 2023-01-20
- Focus on watchlist authentication:
Follow up on authentication. Noticed another error in the code. Take some time to identify the logic issue and fix the bug.
I found a 422 validation error. It is basically due to missing value. Found that the backend is expecting the snake case. Fixed the bug. Still need to work on the broken frontend again.


<br>

#### Date: 2023-01-21
- Focus on frontend:
During the application of authentication. I broke the watch list page. Need to fix the issue of rendering. Still get 405 errors Method not allowed. This might be due to wrong url.
Test function built. May need to clarify whether the test_create is enough or should I test more.
<br>

#### Date: 2023-01-23
- Focus on frontend:
Jess and Jordan started working on the deployment.
Check with Jordan regarding the list view. I fixed the 405 error today. We also got suggested to simplify the token part. The wishlist page now with a simpler hooks. Test the connection from frontend. The token and list works now.
<br>

#### Date: 2023-01-24
- Focus on frontend:
The team work together to check merge and the deployment.
We encountered some issue with the watchlist file. I mistakenly use a lowercase in the file and eventually become an issue on the Mac systems. Jess and I work to gether to solve this part together. We eventually fix this part.
Unfortunately, we used up our CI/CD minutes, so we cannot keep testing.
<br>

#### Date: 2023-01-25
- Focus on deployment:
The whole team work together to dissolve the merge conflict and make all codes work again. We fixes few conflicts together. Alvi help the merge commands
Most of fornt-end is merged and deployment works. We tested some functions.
I create a new branch to clean the code for my part and also edit the frontend a bit to make sure the button work correctly.
When I push to the git, I noticed the pipeline failed. I fix the bug quickly.
<br>

#### Date: 2023-01-26
- Focus on debugging and deployment:
I merged the branch again after edit and check if the button worked as expected. Test those functions to see if anything is broken by the ned code. Everything in watchlist service seems working for now. Still seem some info there. Will try to understand those and fix it. Need to post UI and the deployment status in the group channel.
<br>


#### Date: 2023-01-27
- Wrapping up:
The deadline is today. We will go through the available functions and test them again if anything changes.
We make some new merges to implement the logout function and most of them works. Updated journal.
<br>
