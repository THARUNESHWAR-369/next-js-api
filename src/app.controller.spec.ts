import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { typeOrmConfig } from './config/typeorm.config';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { loadEnvConfig } from '@next/env';
import { resolve } from 'path'

export default async () => {
  const envFile = resolve(__dirname, '.')
  loadEnvConfig(envFile)
}
describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [
        AppService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  describe('register', () => {
    test('should create a new user', async () => {
      // Call the register method
      const result = await appController.register(
        'testing',
        'testing@testing.com',
        'password',
      );

      // Assert the result
      expect(result).toEqual({
        name: 'testing',
        email: 'testing@testing.com',
        id: 2,
      });
    });
  });

  describe('login', () => {
    test('should log in a user and set JWT cookie', async () => {
      // Call the login method
      const response: Response = (Response = {
        cookie: jest.fn(),
      } as any);
      await appController.login('john@example.com', 'password', response);

      // Assert the response or other expectations
      expect(response.cookie).toHaveBeenCalled();
    });
  });
});
