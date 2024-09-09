import { Pool } from 'pg'
import 'dotenv/config'

const appDataBase = new Pool({
  user: 'postgres',
  database: process.env.DATABASE,
  host: process.env.HOST,
  port: Number(process.env.PORT),
  password: process.env.PASSWORD,
})

export default appDataBase