import { Request, Response, NextFunction } from 'express';
import { EmployeesService } from './employees.service';
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from './employees.validator';
import { paginationQuerySchema } from '@/common/validator/paginated.validator';

export class EmployeesController {
  private employeesService: EmployeesService;

  constructor() {
    this.employeesService = new EmployeesService();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeData = createEmployeeSchema.parse(req.body);
      const employee = await this.employeesService.create(employeeData);
      res.status(201).json(employee);
    } catch (err) {
      next(err);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = paginationQuerySchema.parse(req.query);

      const result = await this.employeesService.findAll(page, limit);

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const employee = await this.employeesService.findOne(id);
      res.status(200).json(employee);
    } catch (err) {
      next(err);
    }
  }

  async findEmployeeByOrganizationId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      const { page, limit } = paginationQuerySchema.parse(req.query);

      const result = await this.employeesService.findEmployeeByOrganizationId(
        id,
        page,
        limit,
      );

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const employeeData = updateEmployeeSchema.parse(req.body);
      const employee = await this.employeesService.update(id, employeeData);
      res.status(200).json(employee);
    } catch (err) {
      next(err);
    }
  }

  async deactivate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const employee = await this.employeesService.deactivate(id);
      res.status(200).json(employee);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const employee = await this.employeesService.delete(id);
      res.status(200).json(employee);
    } catch (err) {
      next(err);
    }
  }
}
