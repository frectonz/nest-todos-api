# Nest Todos API

A sample API built with NestJS and Prisma.

## Testing the API

### With [HTTPie](https://httpie.io/)

- Register

```bash
http POST http://localhost:3000/auth/register username=frectonz password=password
```

- Login

```bash
http POST http://localhost:3000/auth/login username=frectonz password=password
```

- Create a todo

```bash
http -A bearer -a <token> POST http://localhost:3000/todos title="My first todo"
```

- Get all todos

```bash
http -A bearer -a <token> GET http://localhost:3000/todos
```

- Toggle completed status

```bash
http -A bearer -a <token> PATCH http://localhost:3000/todos/<id>/toggle
```

### With [Hurl](https://hurl.dev/)

- Register

```bash
hurl hurl/register.hurl | jq
```

- Login

```bash
hurl hurl/login.hurl | jq
```

- Todos CRUD

```bash
hurl hurl/todos.hurl | jq
```

## What is this?

This project was meant to help me learn NestJs. It is a simple API for managing todos. It supports the following actions

- Register a new user
- Login a user
- Create a todo
- Get all todos

The Login and Register routes return a JWT token that can be used to access the todos routes.

```json
{
  "access_token": "<token>"
}
```

The Todo Schema is as follows

```json
{
  "id": 1,
  "title": "My first todo",
  "completed": false,
  "userId": 1
}
```

## Notes on [NestJS](https://nestjs.com/)

First of all checkout this [talk](https://youtu.be/f0qzBkAQ3mk).

The app's entry point is `main.ts`. It is responsible for creating the app and starting the server.

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
```

NestJs is server independent. It can be used with Express, Fastify, etc. The default is Express. It does this by relying on the `@nestjs/platform-express` package. If you want to use Fastify, you can install `@nestjs/platform-fastify` and configure it in `main.ts`.

```typescript
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.enableCors();
  await app.listen(3000);
}
```
