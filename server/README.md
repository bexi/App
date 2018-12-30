# Server notes (for learning purposes)

# Installation
* Install mongodb

# Setup
* Run mongod
* Run npm run dev

# Authentication
* Client side passes username and password to backend
* Backend looks at username and password and checks if they are valid. If so return ID (ex token) so client can make request without username and password
* Client can they try to request a protected resource since they are authenticated

# Cookies vs token
* Cookies are
  - included on all reqs
  - unique to each domain, can't be sent to different domains
* Tokens are
  - have to manually wire it up
  - can be sent to any domain

# Dependencies
* express
* mongoose
* morgan
* body-parser
* bcrypt-nodejs
* jwt-simple
* passport
* passport-jwt
* passport-local

# Routes
* /signup - POST req:
json with JSON ex:
{
  "email": "rebecka@hotmail.com",
  "password": "123"
}
* /signin - POST req: email and password
* ./ - GET req: Header Authorization: <token>
