import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '@/docs/swagger';
import { ErrorMiddleware } from '@/middlewares/error.middleware';
import organizationRoutes from '@/modules/organization/organization.routes';

const app = express();

app.use(express.json(), cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/organizations', organizationRoutes);

app.use(ErrorMiddleware.handle.bind(ErrorMiddleware));

export default app;
