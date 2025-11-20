import request from 'supertest';
import app from '../../app';

import EmployeeSchema from '@/modules/employees/employees.schema';
import {
  createEmployeeMock,
  employeeMock,
  employeeMockDeactivated,
  employeeMockUpdated,
} from './mocks/employees.mock';
import OrganizationSchema from '@/modules/organizations/organizations.schema';
import { organizationMock } from '@/tests/organizations/mocks/organization.mock';

beforeEach(() => {
  jest.clearAllMocks();

  jest.spyOn(EmployeeSchema, 'create').mockResolvedValue(employeeMock as any);
  jest.spyOn(EmployeeSchema, 'find').mockResolvedValue([employeeMock] as any);
  jest.spyOn(EmployeeSchema, 'findById').mockResolvedValue(employeeMock as any);
  jest
    .spyOn(EmployeeSchema, 'findByIdAndUpdate')
    .mockResolvedValue(employeeMockUpdated as any);
  jest
    .spyOn(EmployeeSchema, 'findByIdAndDelete')
    .mockResolvedValue(employeeMock as any);
  jest
    .spyOn(OrganizationSchema, 'findById')
    .mockResolvedValue(organizationMock as any);
});

describe('success cases', () => {
  it('should create a new employee', async () => {
    const response = await request(app)
      .post('/employees')
      .send(createEmployeeMock);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(employeeMock);
  });

  it('should find all employees', async () => {
    const response = await request(app).get('/employees');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject([employeeMock]);
  });

  it('should find a employee', async () => {
    const response = await request(app).get(
      '/employees/691f17afca372b06ced95d15',
    );

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(employeeMock);
  });

  it('should update a employee', async () => {
    const response = await request(app)
      .patch('/employees/691f17afca372b06ced95d15')
      .send({ name: 'João Silva Atualizado' });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(employeeMockUpdated);
  });

  it('should deactivate a employee', async () => {
    jest
      .spyOn(EmployeeSchema, 'findByIdAndUpdate')
      .mockResolvedValueOnce(employeeMockDeactivated);
    const response = await request(app).post(
      '/employees/deactivate/691f17afca372b06ced95d15',
    );

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(employeeMockDeactivated);
  });
});

describe('error cases', () => {
  it('should not create a new employee without name', async () => {
    const { name: _name, ...customMock } = createEmployeeMock;
    const response = await request(app).post('/employees').send(customMock);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Erro de validação',
      errors: [
        {
          code: 'invalid_type',
          expected: 'string',
          message: 'Invalid input: expected string, received undefined',
          path: ['name'],
        },
      ],
    });
  });

  it('should not create a new employee without email', async () => {
    const { email: _email, ...customMock } = createEmployeeMock;
    const response = await request(app).post('/employees').send(customMock);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Erro de validação',
      errors: [
        {
          code: 'invalid_type',
          expected: 'string',
          message: 'Invalid input: expected string, received undefined',
          path: ['email'],
        },
      ],
    });
  });

  it('should not create a new employee without position', async () => {
    const { position: _position, ...customMock } = createEmployeeMock;
    const response = await request(app).post('/employees').send(customMock);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Erro de validação',
      errors: [
        {
          code: 'invalid_type',
          expected: 'string',
          message: 'Invalid input: expected string, received undefined',
          path: ['position'],
        },
      ],
    });
  });

  it('should not create a new employee without password', async () => {
    const { password: _password, ...customMock } = createEmployeeMock;
    const response = await request(app).post('/employees').send(customMock);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Erro de validação',
      errors: [
        {
          code: 'invalid_type',
          expected: 'string',
          message: 'Invalid input: expected string, received undefined',
          path: ['password'],
        },
      ],
    });
  });

  it('should not create a new employee with invalid email', async () => {
    const customMock = { ...createEmployeeMock, email: 'invalid' };
    const response = await request(app).post('/employees').send(customMock);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Erro de validação',
      errors: [
        {
          code: 'invalid_format',
          message: 'Invalid email address',
          path: ['email'],
        },
      ],
    });
  });

  it('should not create a new employee with invalid position', async () => {
    const customMock = { ...createEmployeeMock, position: undefined };
    const response = await request(app).post('/employees').send(customMock);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Erro de validação',
      errors: [
        {
          code: 'invalid_type',
          message: 'Invalid input: expected string, received undefined',
          path: ['position'],
        },
      ],
    });
  });

  it('should not update a employee with invalid email', async () => {
    const customMock = { ...employeeMockUpdated, email: 'invalid' };
    const response = await request(app)
      .patch('/employees/691f17afca372b06ced95d15')
      .send(customMock);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Erro de validação',
      errors: [
        {
          code: 'invalid_format',
          message: 'Invalid email address',
          path: ['email'],
        },
      ],
    });
  });

  it('should not updated a employee with invalid id', async () => {
    jest.spyOn(EmployeeSchema, 'findByIdAndUpdate').mockResolvedValueOnce(null);

    const response = await request(app)
      .patch('/employees/invalid')
      .send(employeeMock);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      message: 'Employee not found',
    });
  });
});
