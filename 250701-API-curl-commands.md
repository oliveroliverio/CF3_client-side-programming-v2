# Help-250701:  This file is used to store commands needed for certain actions.  this will serve as a log as well

## API tests
- curl command to get movies from heroku
`curl -s -X GET -H "Content-Type: application/json" https://myflix2-54ee4b2daeee.herokuapp.com/movies | jq '.[] | {id, title}'`

- curl command to get all users
`curl -s -X GET -H "Content-Type: application/json" https://myflix2-54ee4b2daeee.herokuapp.com/users | jq '.[] | {id, username}'`


## Issue of books still showing up in main view
