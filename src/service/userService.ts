import { CreateUserDto } from '../dtos/createUser.dto'
import { Login } from '../dtos/login.dto'
import { UpdateUserDto } from '../dtos/updateUser.dto'
import { User } from '../models/User'
import { UserScopes } from '../enums/UserScopes'
import { generateJWTToken, verifyPassword } from '../libs/helpers'

export default class UserService {
  constructor (
  ) {}

  public async delete(id: string) {
    return await User.destroy({ where: { id } })
  }

  public async login(body: Login) {
    const userInfo = await User.scope([UserScopes.withEverything]).findOne({ where: { email: body.email } })

    if (userInfo?.password) {
      return await verifyPassword(body.password, userInfo?.password) ? generateJWTToken({
        name: userInfo.name,
        phone: userInfo.phone,
        email: userInfo.email,
        id: userInfo.id
      }) : false
    }
  }

  public async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } })
  }

  public async update(id: string, body: UpdateUserDto) {
    return User.update(body, { where: { id } })
  }
  
  public async createUser(body: CreateUserDto) {
    return User.create(body)
  }

  public async getUserById(id: number) {
    return User.findOne({ where: { id } })
  }

  public async getAllUsers() {
    return User.scope([UserScopes.withoutPassword]).findAll()
  }
}