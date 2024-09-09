import MessageService from "../service/messageService";
import express, { NextFunction, Request, Response } from 'express'

export default class MessageController {
  constructor(
    private messageService: MessageService
  ) {}
  
  public async delete(req: express.Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const deleted = await this.messageService.delete(id)

      return res.status(200).json({ message: 'The user was deleted'})

    } catch (err) {
      console.log(err)
      return res.status(400).json({
        message: 'Somenthing went wrong. We are working on it',
    });
    }
  }
  
  public async saveMessages(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const room = id
    const { sender } = req.query
    const { inputMessage } = req.body

    try {
      const userInfo = await this.messageService.saveMessages(room, sender as string, inputMessage);

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

  public async getMessages(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const messages = await this.messageService.getMessages(id);

        return res.status(200).json({
            status: 'success',
            data: {
                messages,
            },
        });
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        message: 'Somenthing went wrong. We are working on it',
    });
    }
  }

  public async findRoomByIds(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const sender = id
    const { receiver } = req.query

    try {
      const userInfo = await this.messageService.findRoomByIds(sender, receiver as string);
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
}