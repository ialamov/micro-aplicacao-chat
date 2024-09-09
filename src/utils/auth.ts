import 'dotenv/config'
import { sign, decode, verify, Secret, Algorithm, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { CreateUserDto } from '../dtos/createUser.dto';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}


export class Auth {
  private jwtSecret: Secret

  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    this.jwtSecret = secret;
  }
  
  public generator (userData: CreateUserDto) {
    const finalToken = sign(userData, this.jwtSecret, {algorithm: 'HS256', expiresIn: '1d'})

    return finalToken
  }

  public tokenVerification (req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({
        message: 'Token not found',
      });
    }

    try {
      const decoded = verify(token.split(' ')[1], this.jwtSecret);
      req['user'] = (decoded as JwtPayload);

    } catch (error) {
      return res.status(401).json({
        message: 'Expired or invalid token',
      });
    }
    next();
  };
}