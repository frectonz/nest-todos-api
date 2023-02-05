# Nest Todos API

A sample API built with NestJS and Prisma.

## Testing the API with HTTPie

### Register a user

```bash
http POST http://localhost:3000/auth/login username=frectonz password=password
```

### Create a todo

```bash
http -A bearer -a <token> POST http://localhost:3000/todos title="My first todo"
```

### Get all todos

```bash
http -A bearer -a <token> GET http://localhost:3000/todos
```

### Toggle completed status

```bash
http -A bearer -a <token> PATCH http://localhost:3000/todos/<id>/toggle
```
