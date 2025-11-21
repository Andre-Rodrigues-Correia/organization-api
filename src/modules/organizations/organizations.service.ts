import Organization from './organizations.schema';
import { Organization as IOrganization } from './organizations.model';
import {
  CreateOrganizationWithEmployeeDTO,
  UpdateOrganizationDTO,
} from './organizations.validator';
import { AppError } from '@/common/error/AppError';
import { PaginatedResult } from '@/common/types/pagination.type';
import Employee from '@/modules/employees/employees.schema';

export class OrganizationsService {
  async create(organization: CreateOrganizationWithEmployeeDTO) {
    console.log(organization);
    const existsOrganization = await Organization.findOne({
      cnpj: organization.cnpj,
    });

    if (existsOrganization) {
      throw new AppError('Organization already exists with this cnpj', 400);
    }

    if (organization.employee) {
      const existsEmployee = await Employee.findOne({
        email: organization.employee.email,
      });

      if (existsEmployee) {
        throw new AppError('Employee already exists with this email', 400);
      }

      const createdOrganization = await Organization.create(organization);
      const createdEmployee = await Employee.create({
        ...organization.employee,
        organization: createdOrganization._id.toString(),
      });

      return { organization: createdOrganization, employee: createdEmployee };
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
    const existsEmployees = await Employee.find({
      organization: organizationId,
      status: 'active',
    });

    if (existsEmployees.length > 0) {
      throw new AppError(
        'Organization has employees actives, It is not possible to deactivate with active employees.',
        400,
      );
    }

    const updatedOrganization = await Organization.findByIdAndUpdate(
      organizationId,
      { $set: { is_active: false, deleted_at: new Date() } },
      { new: true },
    );

    if (!updatedOrganization) {
      throw new AppError('Organization not found', 404);
    }

    return updatedOrganization;
  }

  async delete(organizationId: string): Promise<IOrganization> {
    const existsEmployees = await Employee.find({
      organization: organizationId,
      status: 'active',
    });

    if (existsEmployees.length > 0) {
      throw new AppError(
        'Organization has employees actives, It is not possible to delete with active employees.',
        400,
      );
    }

    const deletedOrganization = await Organization.findOneAndDelete({
      _id: organizationId,
      is_active: false,
    });

    if (!deletedOrganization) {
      const existsOrganization = await Organization.findById(organizationId);
      if (!existsOrganization) {
        throw new AppError('Organization not found', 404);
      }
      throw new AppError(
        'Organization is active. It is not possible to delete active organizations.',
        400,
      );
    }

    return deletedOrganization;
  }
}
