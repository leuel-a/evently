import Express from 'express'
import { Routes } from './config/routes'

const app = Express()
const API_PREFIX = 'api'

app.get(`${API_PREFIX}/${Routes.TEST_HEALTH}`, (req, res) => {
  // TODO: add check for mongoose connection and redis connection
  res.send('API is running')
})

export default app
