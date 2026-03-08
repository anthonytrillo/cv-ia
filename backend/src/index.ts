import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { aiRouter } from './routes/aiRoutes.js';

const app = express();
const port = process.env.PORT ?? 3001;

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? '*',
  })
);
app.use(express.json({ limit: '10kb' }));

app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'cv-ia-api' });
});

app.use('/api/ai', aiRouter);

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
