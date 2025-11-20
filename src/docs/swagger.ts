import swaggerJsdoc from 'swagger-jsdoc';
import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';
import { createOrganizationSchema } from '@/modules/organization/organization.validator';
import path from 'path';
const registry = new OpenAPIRegistry();

registry.register('Organization', createOrganizationSchema);

const generator = new OpenApiGeneratorV3(registry.definitions);
const openApiComponents = generator.generateComponents(); // gera #/components

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Empresas e Funcionários',
      version: '1.0.0',
    },
    components: openApiComponents.components,
  },
  apis: [path.resolve(__dirname, '../modules/**/*.routes.ts')],
});
