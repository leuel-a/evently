import app from '@/config/express'
import routes from '@/config/routes'

const API_PREFIX = 'api'

app.get(`${API_PREFIX}/${routes.TEST_HEALTH}`, (req, res) => {
  // TODO: add check for mongoose connection and redis connection
  res.send('API is running')
})

export default app
