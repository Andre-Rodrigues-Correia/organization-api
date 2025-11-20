import { Request, Response, NextFunction } from 'express';
import { OrganizationsService } from './organizations.service';
import {
  createOrganizationSchema,
  updateOrganizationSchema,
} from './organizations.validator';
import { paginationQuerySchema } from '@/common/validator/paginated.validator';

export class OrganizationsController {
  private organizationService: OrganizationsService;

  constructor() {
    this.organizationService = new OrganizationsService();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const organizationData = createOrganizationSchema.parse(req.body);
      const organization =
        await this.organizationService.create(organizationData);
      res.status(201).json(organization);
    } catch (err) {
      next(err);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = paginationQuerySchema.parse(req.query);

      const organizations = await this.organizationService.findAll(page, limit);

      res.status(200).json(organizations);
    } catch (err) {
      next(err);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const organization = await this.organizationService.findOne(id);
      res.status(200).json(organization);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const organizationData = updateOrganizationSchema.parse(req.body);
      const organization = await this.organizationService.update(
        id,
        organizationData,
      );
      res.status(200).json(organization);
    } catch (err) {
      next(err);
    }
  }

  async deactivate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const organization = await this.organizationService.deactivate(id);
      res.status(200).json(organization);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const organization = await this.organizationService.delete(id);
      res.status(200).json(organization);
    } catch (err) {
      next(err);
    }
  }
}
