import express, { Express, Request, Response } from 'express';

import cors from 'cors';
import router from './src/routes/scraperRoutes';
import { config } from './config';

const app: Express = express();
const PORT: number = config.server.port;

// Middlewares
app.use(express.json());
app.use(cors());

// Server initialization
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Health check
app.get('/', (_req: Request, res: Response) => res.json({ status: 'ok' }));

// Routes
app.use('/api', router);

// Export for testing purposes
export default app;
export { server };
