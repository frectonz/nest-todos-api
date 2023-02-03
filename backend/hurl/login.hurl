POST http://localhost:3000/auth/login
{
  "username": "frectonz",
  "password": "password"
}

HTTP 200
[Captures]
access_token: jsonpath "$.access_token"

GET http://localhost:3000/auth/profile
Authorization: Bearer {{access_token}}