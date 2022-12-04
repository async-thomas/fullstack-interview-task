# Moneyhub Tech Test - Investments and Holdings

At Moneyhub we use microservices to partition and separate the concerns of the codebase. In this exercise we have given you an example `admin` service and some accompanying services to work with. In this case the admin service backs a front end admin tool allowing non-technical staff to interact with data.

A request for a new admin feature has been received

## Requirements

- An admin is able to generate a csv formatted report showing the values of all user holdings
    - The report should be sent to the `/export` route of the investments service
    - The investments service expects the csv report to be sent as json
    - The csv should contain a row for each holding matching the following headers
    |User|First Name|Last Name|Date|Holding|Value|
    - The holding should be the name of the holding account given by the financial-companies service
    - The holding value can be calculated by `investmentTotal * investmentPercentage`
- Ensure use of up to date packages and libraries (the service is known to use deprecated packages)
- Make effective use of git

We prefer:
- Functional code 
- Ramda.js (this is not a requirement but feel free to investigate)
- Unit testing

### Notes
All of you work should take place inside the `admin` microservice

For the purposes of this task we would assume there are sufficient security middleware, permissions access and PII safe protocols, you do not need to add additional security measures as part of this exercise.

You are free to use any packages that would help with this task

We're interested in how you break down the work and build your solution in a clean, reusable and testable manner rather than seeing a perfect example, try to only spend around *1-2 hours* working on it

## Deliverables
**Please make sure to update the readme with**:

- Your new routes
- How to run any additional scripts or tests you may have added
- Relating to the task please add answers to the following questions;
    1. How might you make this service more secure?
    2. How would you make this solution scale to millions of records?
    3. What else would you have liked to improve given more time?
  

On completion email a link to your repository to your contact at Moneyhub and ensure it is publicly accessible.

## Getting Started

Please clone this service and push it to your own github (or other) public repository

To develop against all the services each one will need to be started in each service run

```bash
npm start
or
npm run develop
```

The develop command will run nodemon allowing you to make changes without restarting

The services will try to use ports 8081, 8082 and 8083

Use Postman or any API tool of you choice to trigger your endpoints (this is how we will test your new route).

## Testing

To run the test suite, run the following locally in the `/admin` directory

```bash
npm run test
```

### Existing routes
We have provided a series of routes 

Investments - localhost:8081
- `/investments` get all investments
- `/investments/:id` get an investment record by id
- `/investments/export` expects a csv formatted text input as the body

Financial Companies - localhost:8082
- `/companies` get all companies details
- `/companies/:id` get company by id

Admin - localhost:8083
- `/investments/:id` get an investment record by id
- `/report` generate a csv investments report and POST csv data to `/investments/export`

## Questions

### How might you make this service more secure?
- Add controls to limit the IP addresses that requests can come from.
- Use authentication to identify who is accessing each resource before returning a response.
- Set authorization requirements for each endpoint and after a user has been authenticated, ensure the user has sufficient privileges to access the resource.
- Use API keys and ensure all keys are saved securely, e.g. not commiting to github repos, writing in text files on computers etc.
- Take appropriate precautions against CSRF such as implementing CSRF tokens.
- If JWTs are implemented, ensure that they are not stored on any client local storage making them vulnerable to XSS attacks and instead store them inside a httpOnly cookie.
- Use https.

### How would you make this solution scale to millions of records?
- Connect the service directly to a database of the investments and companies if possible.
- If the list of companies or investments becomes large, it will be important to request the data in parts, for example implementing pagination that limits the size of each request.
- Implement a queue based system and break the report generation down into smaller chunks that can be processed concurrently.
- Add more resilience into the system to ensure that any miformatted data is identified before producing unwanted side effects. Type validation such as Joi, could be employed to ensure data types are correct.

### What else would you have liked to improve given more time?
- Add testing for the API endpoints.
- Connect the endpoints to a database.
- Add additional endpoints for other services.
- Learn more about Ramda.

## Please Note
This is a throwaway GitHub. My GitHub can be found at: https://github.com/mint-made