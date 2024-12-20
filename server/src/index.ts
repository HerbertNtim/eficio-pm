import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
// ROUTE IMPORTS
import projectRoutes from './routes/projectRoute'
import taskRoutes from './routes/taskRoute'
import searchRoute from './routes/searchRoutes'
import usersRouter from './routes/usersRoute'
import teamRouter from './routes/teamRoute'


// CONFIGURATION
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// ROUTES
app.get('/', (req, res) => {
  res.send('This is Home Route! ')
})

app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/search', searchRoute);
app.use("/users", usersRouter);
app.use("/teams", teamRouter);

// SERVER
const PORT = Number(process.env.PORT) || 5000
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`)
})
