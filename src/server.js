import 'dotenv/config'
import express from 'express'
import UserController from './app/controllers/UserController'
import BullBoard from 'bull-board'
import Queue from './app/lib/Queue'

const app = express()

BullBoard.setQueues(Queue.queues.map(queue => queue.bull))

app.use(express.json())

app.post('/users', UserController.store)

app.use('/admin/queues', BullBoard.UI)

const port = 5000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})