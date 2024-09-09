import express, { NextFunction, Request, Response } from 'express'
import MessageController from '../controllers/messageController'
import MessageService from '../service/messageService'
import { UserValidations } from '../middlewares/userValidations'
import UserService from '../service/userService'

const messageRoute = express.Router()
const messageService = new MessageService()
const userService = new UserService()
const userValidations = new UserValidations(userService)
const messageController = new MessageController(messageService)

messageRoute
  .get('/:id', 
    (req: Request, res: Response, next: NextFunction) => userValidations.tokenVerification(req, res, next),
    (req: Request, res: Response) => messageController.findRoomByIds(req, res))
  .get('/rooms/:id', 
    (req: Request, res: Response, next: NextFunction) => userValidations.tokenVerification(req, res, next),
    (req: Request, res: Response) => messageController.getMessages(req, res))
  .post('/:id', 
    (req: Request, res: Response, next: NextFunction) => userValidations.tokenVerification(req, res, next),
    (req: Request, res: Response) => messageController.saveMessages(req, res))
  .delete('/:id', 
    (req: Request, res: Response, next: NextFunction) => userValidations.tokenVerification(req, res, next),
    (req: Request, res: Response) => messageController.delete(req, res))

export default messageRoute