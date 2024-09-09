import { Request, Response, NextFunction } from "express";
import UserService from "../service/userService.ts";
import { decodeJWTToken } from "../libs/helpers.ts";

export class UserValidations {
  constructor(
    private userService: UserService
  ) {}

  public emailFormValidation (req: Request, res: Response, next: NextFunction) {
    const regexValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const { email } = req.body;
    if (!email.match(regexValidEmail)) {
      return res.status(400).json({
        message: '"email" must be a valid email',
      });
    }
    next();
  };

  public async emailAlreadyExists (req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    
    const emailAlreadyExists = await this.userService.findByEmail(email);
      
    if (emailAlreadyExists) {
      res.status(409).json({ message: 'User already registered' });

      return;
    }
    
    next();
  };

  public async tokenVerification (req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({
        message: 'Token not found',
      });
    }

    try {
      const decoded = decodeJWTToken(token.split(' ')[1]);

    } catch (error) {
      return res.status(401).json({
        message: 'Expired or invalid token',
      });
    }
    next();
  }
}









