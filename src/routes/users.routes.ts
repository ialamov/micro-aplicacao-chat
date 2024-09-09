import express, { NextFunction, Request, Response } from 'express'
import UserController from '../controllers/userController'
import UserService from '../service/userService'
import { UserValidations } from '../middlewares/userValidations'

const usersRoute = express.Router()

const userService = new UserService()
const userController = new UserController(userService)
const userValidations = new UserValidations(userService)

export default usersRoute
  .get('/', 
    (req: Request, res: Response, next: NextFunction) => userValidations.tokenVerification(req, res, next),
    (req: Request, res: Response) => userController.getAllUsers(req, res))
  .get('/:id', 
    (req: Request, res: Response, next: NextFunction) => userValidations.tokenVerification(req, res, next),
    (req: Request, res: Response, next: NextFunction) => userController.getUserById(req, res))
  .post('/',
    (req: Request, res: Response, next: NextFunction) => userValidations.emailAlreadyExists(req, res, next), 
    (req: Request, res: Response, next: NextFunction) => userValidations.emailFormValidation(req, res, next),
    (req: Request, res: Response) => userController.createUser(req, res))
  .post('/login', 
    (req: Request, res: Response) => userController.login(req, res))
  .patch('/:id',
    (req: Request, res: Response, next: NextFunction) => userValidations.tokenVerification(req, res, next),
    (req: Request, res: Response) => userController.update(req, res))
  .delete('/:id', 
    (req: Request, res: Response, next: NextFunction) => userValidations.tokenVerification(req, res, next),
    (req: Request, res: Response) => userController.delete(req, res))