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

This project was meant to help me learn NestJS. It is a simple API for managing todos. It supports the following actions

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

NestJS is server independent. It can be used with Express, Fastify, etc. The default is Express. It does this by relying on the `@nestjs/platform-express` package. If you want to use Fastify, you can install `@nestjs/platform-fastify` and configure it in `main.ts`.

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

Checkout the `fastify` branch for an example of using Fastify.

---

The next piece of code you should look at is in the file `app.module.ts`.

```typescript
@Module({
  imports: [AuthModule, UsersModule, TodosModule, PrismaModule],
})
export class AppModule implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.prisma.todo.deleteMany();
    await this.prisma.user.deleteMany();
  }
}
```

Here we see our first NestJS decorator, the `Module` decorator. Before getting into what this decorator does check the documentation on [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html). The important thing to note is that decorators are a used to compose functionality and that they can be applied to classes, methods, properties, and parameters.

Now that we understand the use of decorators. We can get back to the `Module` decorator, It is used to create a NestJS Module. A module in NestJs is the main tool we have to organize our code and structure it be reused at an other place. A module can import functionality from other modules and it can also provide functionality to other modules.

Every NestJS project has at least one module the `AppModule` because the `NestFactory.create` method we saw above needs a module to serve as an entrypoint to our application.

You can also see that that we are implementing the interface `OnModuleInit`. This interface allows us to define the `onModuleInit` function, which is run once when a module is instantiated. We use this method to remove all of the data that has been stored in our DB. This is very helpful when we are testing our api but could potentially be dangerous if used in production.

As you can see from the above code sample interacting with NestJS is mostly implementing interfaces and adding decorators to our code.

Our Codebase has the following modules

- `AuthModule`
- `UsersModule`
- `TodosModule`
- `PrismaModule`
