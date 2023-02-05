import { compare } from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.getUser(username);
    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }

    const correctPassword = await compare(password, user.password);
    if (!correctPassword) {
      throw new BadRequestException('Invalid username or password');
    }

    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string) {
    let user: User;
    try {
      user = await this.usersService.createUser(username, password);
    } catch (e) {
      throw new BadRequestException('Username already exists');
    }

    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
