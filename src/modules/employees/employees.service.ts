import Employee from './employees.schema';
import { Employee as IEmployee } from './employees.model';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from './employees.validator';
import { AppError } from '@/common/error/AppError';
import { OrganizationsService } from '@/modules/organizations/organizations.service';

export class EmployeesService {
  private organizationService: OrganizationsService;

  constructor() {
    this.organizationService = new OrganizationsService();
  }

  async create(employee: CreateEmployeeDTO) {
    await this.organizationService.findOne(employee.organization);
    const existsEmployee = await Employee.findOne({
      email: employee.email,
    });

    if (existsEmployee) {
      throw new AppError('Employee already exists with this email', 400);
    }
    return Employee.create(employee);
  }

  async findAll(
    page = 1,
    limit = 10,
    status: 'active' | 'deactivated' | null = null,
  ) {
    const skip = (page - 1) * limit;
    const filter = status ? { status: status } : {};

    const [items, total] = await Promise.all([
      Employee.find(filter, '-password').skip(skip).limit(limit),

      Employee.countDocuments({ ...filter }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async findOne(employeeId: string): Promise<IEmployee> {
    const employee = await Employee.findById(employeeId, '-password');

    if (!employee) {
      throw new AppError('Employee not found', 404);
    }

    return employee;
  }

  async findEmployeeByOrganizationId(
    organizationId: string,
    page = 1,
    limit = 10,
    status: 'active' | 'deactivated' | null = null,
  ) {
    const skip = (page - 1) * limit;
    const filter = status ? { status: status } : {};

    const [items, total] = await Promise.all([
      Employee.find({ organization: organizationId, ...filter }, '-password')
        .skip(skip)
        .limit(limit),

      Employee.countDocuments({ organization: organizationId, ...filter }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async update(
    employeeId: string,
    employee: UpdateEmployeeDTO,
  ): Promise<IEmployee> {
    if (employee.email) {
      const existsEmployee = await Employee.findOne({
        email: employee.email,
        _id: { $ne: employeeId },
      });
      if (existsEmployee) {
        throw new AppError(
          'Another employee already exists with this email',
          400,
        );
      }
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { $set: employee },
      { new: true, select: '-password' },
    );

    if (!updatedEmployee) {
      throw new AppError('Employee not found', 404);
    }

    return updatedEmployee;
  }

  async deactivate(employeeId: string): Promise<IEmployee> {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { $set: { status: 'deactivated', terminatedAt: new Date() } },
      { new: true, select: '-password' },
    );

    if (!updatedEmployee) {
      throw new AppError('Employee not found', 404);
    }

    return updatedEmployee;
  }

  async delete(employeeId: string): Promise<IEmployee> {
    const deletedEmployee = await Employee.findOneAndDelete(
      { _id: employeeId, status: { $ne: 'active' } },
      { select: '-password' },
    );

    if (!deletedEmployee) {
      const exists = await Employee.findById(employeeId);
      if (!exists) {
        throw new AppError('Employee not found', 404);
      }
      throw new AppError(
        'Employee is active. It is not possible to delete active employees.',
        400,
      );
    }

    return deletedEmployee;
  }
}
