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
    return Employee.create(employee);
  }

  findAll(): Promise<IEmployee[]> {
    return Employee.find({}, '-password');
  }

  async findOne(employeeId: string): Promise<IEmployee> {
    const employee = await Employee.findById(employeeId, '-password');

    if (!employee) {
      throw new AppError('Employee not found', 404);
    }

    return employee;
  }

  async update(
    employeeId: string,
    employee: UpdateEmployeeDTO,
  ): Promise<IEmployee> {
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
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId, {
      select: '-password',
    });

    if (!deletedEmployee) {
      throw new AppError('Employee not found', 404);
    }

    return deletedEmployee;
  }
}
