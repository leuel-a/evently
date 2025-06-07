import express from '@/config/express';
import routes from '@/config/routes';

const API_PREFIX = 'api';

express.get(`/${API_PREFIX}/${routes.TEST_HEALTH}`, (req, res) => {
  res.json({
    status: 'API is up and running',
    database: true,
    redis: true,
  });
});

export { express as app };
