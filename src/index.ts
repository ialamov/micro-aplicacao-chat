import app from "./app";
import { loadSequelize } from "./libs/Database";
import { Server } from 'socket.io'
import http from 'http';
import MessageService from "./service/messageService";
import { ReceiveMessage } from "./dtos/receiveMessage.dto";

const messageService = new MessageService()
const server = http.createServer(app);
const port = 5555
const io = new Server(server, {
  path: '/socket.io/',
  cors: {
    origin: `http://localhost:5173`,
    methods: ['GET', 'POST']
  }
});

loadSequelize()
  .then(() => console.log('Database connected'))
  .then(() => server.listen(port, () => console.log(`The server is running on port ${port}`)))
  .catch( err => console.log(`Error: ${err}`))

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('user_details', (userDetails: Object) => {
    socket.data.userDetails = userDetails
  })

  socket.on('set_messages', (chat: ReceiveMessage) => {
    console.log(chat)
    messageService.findByMessageAndRoom(chat.inputMessage, chat.roomId)
      .then((data: any)=> {
        return io.emit('receive_message', {
          message: chat.inputMessage,
          id: data.id,
          roomId: chat.roomId,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          user: {
            id: chat.id,
            name: chat.name
          }
        })

      })
  })

  socket.on('disconnect', () => {
    console.log('Client diconnected', socket.id)
  })
});
