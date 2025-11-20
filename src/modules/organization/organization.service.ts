import Organization from './organization.schema';
import { Organization as IOrganization } from './organization.model';
import {
  CreateOrganizationDTO,
  UpdateOrganizationDTO,
} from './organization.validator';
import { AppError } from '@/common/error/AppError';

export class OrganizationService {
  create(organization: CreateOrganizationDTO) {
    return Organization.create(organization);
  }

  findAll(): Promise<IOrganization[]> {
    return Organization.find();
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
