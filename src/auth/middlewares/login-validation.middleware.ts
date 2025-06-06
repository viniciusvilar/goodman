import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { LoginRequestBody } from '../models/LoginRequestBody';

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const loginRequestBody = new LoginRequestBody();
    loginRequestBody.email = body.email;
    loginRequestBody.password = body.password;

    const validations = await validate(loginRequestBody);

    if (validations.length) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: validations.map((v) => ({
          property: v.property,
          errors: v.constraints ? Object.values(v.constraints) : [],
        })),
      });
    }

    next();
  }
}