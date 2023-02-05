# Login
POST http://localhost:3000/auth/login
{
  "username": "frectonz",
  "password": "password"
}

HTTP 200

[Captures]
access_token: jsonpath "$.access_token"

# Get all todos
GET http://localhost:3000/todos
Authorization: Bearer {{access_token}}

HTTP 200

# Create a todo
POST http://localhost:3000/todos
Authorization: Bearer {{access_token}}
{
  "title": "Buy milk"
}

HTTP 201

[Captures]
todo_id: jsonpath "$.id"

# Update a todo
PUT http://localhost:3000/todos/{{todo_id}}
Authorization: Bearer {{access_token}}
{
  "title": "Buy milk and eggs"
}

HTTP 200

# Toggle completing a todo
PATCH http://localhost:3000/todos/{{todo_id}}/toggle
Authorization: Bearer {{access_token}}

HTTP 200
