import { Router } from 'express';
import { EmployeesController } from './employees.controller';

const router = Router();
const controller = new EmployeesController();

/**
 * @openapi
 * /employees:
 *   post:
 *     tags:
 *       - Funcionários
 *     summary: Cria um novo funcionário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Employee"
 *     responses:
 *       201:
 *         description: Funcionário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Employee"
 */
router.post('/', controller.create.bind(controller));

/**
 * @openapi
 * /employees:
 *   get:
 *     tags:
 *       - Funcionários
 *     summary: Retorna todos funcionários
 *     responses:
 *       200:
 *         description: Funcionários encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Employee"
 */
router.get('/', controller.findAll.bind(controller));

/**
 * @openapi
 * /employees/{id}:
 *   get:
 *     tags:
 *       - Funcionários
 *     summary: Retorna um funcionário
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da funcionário
 *     responses:
 *       200:
 *         description: Funcionário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Employee"
 */
router.get('/:id', controller.findOne.bind(controller));

/**
 * @openapi
 * /employees/{id}/organization:
 *   get:
 *     tags:
 *       - Funcionários
 *     summary: Retorna os funcionários de uma empresa
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do funcionário
 *     responses:
 *       200:
 *         description: Funcionáris da empresa encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Employee"
 */
router.get(
  '/:id/organization',
  controller.findEmployeeByOrganizationId.bind(controller),
);

/**
 * @openapi
 * /employees/{id}:
 *   patch:
 *     tags:
 *       - Funcionários
 *     summary: Atualiza um funcionário
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do funcionário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Employee"
 *     responses:
 *       200:
 *         description: Funcionário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Employee"
 */
router.patch('/:id', controller.update.bind(controller));

/**
 * @openapi
 * /employees/deactivate/{id}:
 *   post:
 *     tags:
 *       - Funcionários
 *     summary: Desativar um funcionário
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do funcionário
 *     responses:
 *       200:
 *         description: Funcionário desativado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Employee"
 */
router.post('/deactivate/:id', controller.deactivate.bind(controller));

/**
 * @openapi
 * /employees/{id}:
 *   delete:
 *     tags:
 *       - Funcionários
 *     summary: Deleta um funcionário
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da funcionário
 *     responses:
 *       200:
 *         description: Funcionário deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Employee"
 */
router.delete('/:id', controller.delete.bind(controller));

export default router;
