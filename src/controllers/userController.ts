import { Request, Response } from "express";
import UserService from "../service/userService.ts";
import { CreateUserDto } from "../dtos/createUser.dto.ts";
import { UpdateUserDto } from "../dtos/updateUser.dto.ts";

export default class UserController {
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const deleted = await this.userService.delete(id)

      return res.status(200).json({ message: 'The user was deleted'})

    } catch (err) {
      console.log(err)
      return res.status(400).json({
        message: 'Somenthing went wrong. We are working on it',
    });
    }
  }
  constructor(
    private userService: UserService
  ) {}

  public async update(req: Request, res: Response): Promise<Response> {
    const body: UpdateUserDto = req.body
    const { id } = req.params

    try {
      const updateUserInfo = await this.userService.update(id, body)

      return res.status(200).json({ message: 'The information was updated'})

    } catch (err) {
      console.log(err)
      return res.status(400).json({
        message: 'Somenthing went wrong. We are working on it',
    });
    }
  }
  

  public async login(req: Request, res: Response): Promise<Response> {
    const body = req.body;

    const token = await this.userService.login(body)
    
    if (token) {
      return res.status(200).json({ message: 'Logged in successfully', token });
      
    } else {
    return res.status(404).json({ message: 'Wrong password or user' });
    }
  };

  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const usersInfo = await this.userService.getAllUsers();

        return res.status(200).json({
            status: 'success',
            data: {
                usersInfo,
            },
        });
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        message: 'Somenthing went wrong. We are working on it',
    });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const userInfo = await this.userService.getUserById(Number(id));

        return res.status(200).json({
            status: 'success',
            data: {
                userInfo,
            },
        });
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        message: 'Somenthing went wrong. We are working on it',
    });
    }
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    const body: CreateUserDto = req.body;

    try {
      const userInfo = await this.userService.createUser(body);
        return res.status(200).json({
            status: 'success',
            data: {
                userInfo,
            },
        });
    } catch (err) {
      return res.status(400).json({
        message: `Somenthing went wrong. We are working on it. ${err}`,
      });
    }
  }
}