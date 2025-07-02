# Help-250701:  This file is used to store commands needed for certain actions.  this will serve as a log as well

## API tests
- curl command to get movies from heroku
```
curl -s -X GET -H "Content-Type: application/json" https://myflix2-54ee4b2daeee.herokuapp.com/movies | jq '.[] | {id, title}'
```

- curl command to get all movies
```
curl -s -X GET -H "Content-Type: application/json" https://myflix2-54ee4b2daeee.herokuapp.com/movies | jq '.[] | {id, title}'
```

- curl command to get all users
```
curl -s -X GET -H "Content-Type: application/json" https://myflix2-54ee4b2daeee.herokuapp.com/users | jq '.[] | {id, username}'
```



- curl command to add user (sign up)
```
curl -s -X POST -H "Content-Type: application/json" -d '{"username": "indielover2", "password": "moonlightsonata!2", "email": "indielover@indielover.com", "birthday": "1990-01-01"}' https://myflix2-54ee4b2daeee.herokuapp.com/users
```

- curl command to login
```
curl -s -X POST -H "Content-Type: application/json" -d '{"username": "indielover", "password": "moonlightsonata"}' https://myflix2-54ee4b2daeee.herokuapp.com/users/login
```