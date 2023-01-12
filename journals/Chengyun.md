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

  #### Date: 2023-01-11
  - Focus on coding: Applying the lecture of authentication.
  Followed advices, we re-built all container and tried the code introduced in the lecture.
  Jess, Jordan and I have been trying to apply the code and adjust the database setup to the demo.
  However, the account authentication still did not really work.
  We decided to save the code we have built for now and give the SQL a try.
