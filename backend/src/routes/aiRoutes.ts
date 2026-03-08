import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  improveSummaryHandler,
  improveDescriptionHandler,
} from '../services/groqService.js';
import {
  sanitizeImproveBody,
  validateImproveBody,
  sanitizeImproveDescriptionBody,
  validateImproveDescriptionBody,
} from './improveSchema.js';

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { message: 'Demasiadas solicitudes. Espera un momento.' },
});

const router = Router();

router.post('/improve-summary', limiter, async (req, res) => {
  try {
    const raw = sanitizeImproveBody(req.body);
    const validated = validateImproveBody(raw);

    const result = await improveSummaryHandler(validated, {
      timeout: 12000,
      maxTokens: 300,
    });

    res.json({ improvedSummary: result });
  } catch (err: unknown) {
    const code = (err as Error & { status?: number })?.status ?? 500;
    res.status(code).json({
      message: (err as Error).message ?? 'Error interno',
    });
  }
});

router.post('/improve-description', limiter, async (req, res) => {
  try {
    const raw = sanitizeImproveDescriptionBody(req.body);
    const validated = validateImproveDescriptionBody(raw);

    const result = await improveDescriptionHandler(validated, {
      timeout: 12000,
      maxTokens: 400,
    });

    res.json({ improvedDescription: result });
  } catch (err: unknown) {
    const code = (err as Error & { status?: number })?.status ?? 500;
    res.status(code).json({
      message: (err as Error).message ?? 'Error interno',
    });
  }
});

export { router as aiRouter };
