import express, {Express} from 'express'
import cors from 'cors'
import usersRoute from './routes/users.routes'
import messageRoute from './routes/message.routes'

const app: Express = express()

app.use(cors())
app.use(express.json())

app.use('/v1/users', usersRoute)
app.use('/v1/messages', messageRoute)

export default app