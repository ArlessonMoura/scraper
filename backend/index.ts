import express, { Express, Request, Response } from 'express';

import cors from 'cors';
import router from './src/routes/scraperRoutes';
import { config } from './config';

const app: Express = express();
const PORT: number = config.server.port;

// Middlewares
app.use(express.json());
app.use(cors()); // habilita frontend local acessar a API

// Routes
app.use('/api', router);

// Health check
app.get('/health', (_req: Request, res: Response) => res.json({ status: 'ok' }));

// Server initialization
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export for testing purposes
export default app;
export { server };
