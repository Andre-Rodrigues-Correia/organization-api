import { Router } from 'express';
import { OrganizationsController } from './organizations.controller';

const router = Router();
const controller = new OrganizationsController();

/**
 * @openapi
 * /organizations:
 *   post:
 *     tags:
 *       - Empresas
 *     summary: Cria uma nova empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Organization"
 *     responses:
 *       201:
 *         description: Empresa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Organization"
 */
router.post('/', controller.create.bind(controller));

/**
 * @openapi
 * /organizations:
 *   get:
 *     tags:
 *       - Empresas
 *     summary: Retorna empresas com paginação
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           $ref: "#/components/schemas/PaginatedParams/properties/page"
 *         description: Número da página
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           $ref: "#/components/schemas/PaginatedParams/properties/limit"
 *         description: Quantidade de registros por página
 *     responses:
 *       200:
 *         description: Empresas encontradas com sucesso
 */
router.get('/', controller.findAll.bind(controller));

/**
 * @openapi
 * /organizations/{id}:
 *   get:
 *     tags:
 *       - Empresas
 *     summary: Retorna uma empresa
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da empresa
 *     responses:
 *       200:
 *         description: Empresa encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Organization"
 */
router.get('/:id', controller.findOne.bind(controller));

/**
 * @openapi
 * /organizations/{id}:
 *   patch:
 *     tags:
 *       - Empresas
 *     summary: Atualiza uma empresa
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Organization"
 *     responses:
 *       200:
 *         description: Empresa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Organization"
 */
router.patch('/:id', controller.update.bind(controller));

/**
 * @openapi
 * /organizations/deactivate/{id}:
 *   post:
 *     tags:
 *       - Empresas
 *     summary: Desativar uma empresa
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da empresa
 *     responses:
 *       200:
 *         description: Empresa ativada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Organization"
 */
router.post('/deactivate/:id', controller.deactivate.bind(controller));

/**
 * @openapi
 * /organizations/{id}:
 *   delete:
 *     tags:
 *       - Empresas
 *     summary: Deleta uma empresa
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da empresa
 *     responses:
 *       200:
 *         description: Empresa deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Organization"
 */
router.delete('/:id', controller.delete.bind(controller));

export default router;
