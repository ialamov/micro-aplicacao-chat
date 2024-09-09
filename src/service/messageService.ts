import { Op } from "sequelize"
import { Message } from "../models/Message"
import { Room } from "../models/Room"
import { User } from "../models/User"

export default class MessageService {
  constructor (
  ) {}

  public async findByMessageAndRoom(chat: string, roomId: any) {
    return (await Message.findOne({
      where: {
        roomId: roomId,
        message: chat
      },
      include: [
        {
          model: User,
          required: true
        }
      ]
    }))?.dataValues
  }

  public async delete(id: string) {
    return await Message.destroy({where: { id }})
  }

  public async saveMessages(room: string, sender: string, message: string) {
    console.log(room, sender, message)
    return (await Message.create({roomId: room, userId: sender, message})).dataValues
  }
  public async getMessages(id: string) {
    return await Message.findAll({where: { roomId: id }, include: [
      {
        model: User,
        required: true
      }
    ]})
  }

  public async findRoomByIds(sender: string, receiver: string): Promise<any> {
    if (sender === undefined || receiver === undefined) {
      throw Error('Sender or Receiver is undefined')
    }

    const findRoomOneWay = await Room.findOne(
      {
        where: {
          [Op.and] : [
            { userOneId: sender},
            { userTwoId: receiver}
          ], 
        }
      }
    )

    const findRoomOrOther = await Room.findOne(
      {
        where: {
          [Op.and] : [
            { userOneId: receiver},
            { userTwoId: sender}
          ], 
        }
      }
    )
    
    if (findRoomOneWay) {
      return findRoomOneWay.dataValues
    } else if (findRoomOrOther) {
      return findRoomOrOther?.dataValues
    } else {
      return (await Room.create({userOneId: sender, userTwoId: receiver})).dataValues
    }
  }
}