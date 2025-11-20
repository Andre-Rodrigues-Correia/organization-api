import Organization from './organizations.schema';
import { Organization as IOrganization } from './organizations.model';
import {
  CreateOrganizationDTO,
  UpdateOrganizationDTO,
} from './organizations.validator';
import { AppError } from '@/common/error/AppError';
import { PaginatedResult } from '@/common/types/pagination.type';

export class OrganizationsService {
  async create(organization: CreateOrganizationDTO) {
    const existsOrganization = await Organization.findOne({
      cnpj: organization.cnpj,
    });

    if (existsOrganization) {
      throw new AppError('Organization already exists with this cnpj', 400);
    }

    return Organization.create(organization);
  }

  async findAll(page = 1, limit = 10): Promise<PaginatedResult<IOrganization>> {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Organization.find().skip(skip).limit(limit),
      Organization.countDocuments(),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(organizationId: string): Promise<IOrganization> {
    const organization = await Organization.findById(organizationId);

    if (!organization) {
      throw new AppError('Organization not found', 404);
    }

    return organization;
  }

  async update(
    organizationId: string,
    organization: UpdateOrganizationDTO,
  ): Promise<IOrganization> {
    const updatedOrganization = await Organization.findByIdAndUpdate(
      organizationId,
      { $set: organization },
      { new: true },
    );

    if (!updatedOrganization) {
      throw new AppError('Organization not found', 404);
    }

    return updatedOrganization;
  }

  async deactivate(organizationId: string): Promise<IOrganization> {
    const updatedOrganization = await Organization.findByIdAndUpdate(
      organizationId,
      { $set: { is_active: true, deleted_at: new Date() } },
      { new: true },
    );

    if (!updatedOrganization) {
      throw new AppError('Organization not found', 404);
    }

    return updatedOrganization;
  }

  async delete(organizationId: string): Promise<IOrganization> {
    const deletedOrganization =
      await Organization.findByIdAndDelete(organizationId);

    if (!deletedOrganization) {
      throw new AppError('Organization not found', 404);
    }

    return deletedOrganization;
  }
}
