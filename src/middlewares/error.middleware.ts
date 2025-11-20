import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '@/common/error/AppError';
import logger from '../common/logger/logger';

export class ErrorMiddleware {
  static handle(err: any, req: Request, res: Response, _next: NextFunction) {
    if (err instanceof ZodError) {
      logger.warn('Erro de validação Zod', { issues: err.issues });

      return res.status(400).json({
        message: 'Erro de validação',
        errors: err.issues,
      });
    }

    if (err instanceof AppError) {
      logger.warn('AppError', {
        message: err.message,
        statusCode: err.statusCode,
        details: err.details,
      });

      return res.status(err.statusCode).json({
        message: err.message,
        details: err.details,
      });
    }

    if (err instanceof Error) {
      logger.error('Internal Server Error', {
        message: err.message,
        stack: err.stack,
      });
    }

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}
