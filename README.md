# Project: SplitSmart

![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
[![](https://img.shields.io/badge/license-MIT-blue)](https://github.com/SplitSmart/cs5356-milestone-2/blob/main/LICENSE)

People frequently need to split bills when in a collegiate setting or living with roommates. As it is inconvenient and costly to Venmo/PayPal/transfer money every time a purchase is made, people often choose to settle bills with each other monthly or periodically. However, in these scenarios, it quickly becomes complicated to keep track of who owes money to whom, particularly since different purchases might cancel out (i.e. Alice, Bob and Caroline live together; Alice pays for meal 1, Bob pays for meal 2, Caroline pays for meal 3). We aim to build a web application that will track customizable split payments for an arbitrary number of users.

Our App is deployed on [FireBase](https://ruffhouse-cd734.web.app/).

## Use Cases
As a user, I can:  
* Create an account and sign in  
* Add new friends  
* Split up the bill with friends by percentage or by manually inputting the value  
* View the bill settlement on the dashboard 

## Pages & Features
### Main Landing Page
A place where you can see the following:
* Product Overview
* How to Sign in/ Sign up
* Features sets

### Sign in /Sign up Page
A place where users can either sign in or register a new account

### Dashboard
A place where users can see the following after logging in:
* Personal information 
* The balance between you and your friends
* Friends list

### Search & Add Friends Page
A place where users can search and add their friends

### Bill Spliting Page
A place where users can choose one or more friends to split expenses


## Usage

* Run  `npm install` to install all the project dependencies
* Run `npm run start` to start the server
* Visit http://localhost:8080 in your browser to see the web application
