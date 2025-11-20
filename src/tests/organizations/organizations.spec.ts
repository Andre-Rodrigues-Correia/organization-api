import request from 'supertest';
import app from '../../app';
import OrganizationSchema from '@/modules/organizations/organizations.schema';
import EmployeeSchema from '@/modules/employees/employees.schema';
import {
  organizationMock,
  organizationMockDeactivated,
  organizationMockUpdated,
} from './mocks/organization.mock';
import { employeeMock } from '@/tests/employees/mocks/employees.mock';

beforeEach(() => {
  jest.clearAllMocks();

  jest
    .spyOn(OrganizationSchema, 'create')
    .mockResolvedValue(organizationMock as any);
  jest
    .spyOn(OrganizationSchema, 'find')
    .mockResolvedValue([organizationMock] as any);
  jest
    .spyOn(OrganizationSchema, 'findById')
    .mockResolvedValue(organizationMock as any);
  jest
    .spyOn(OrganizationSchema, 'findByIdAndUpdate')
    .mockResolvedValue(organizationMockUpdated as any);
  jest
    .spyOn(OrganizationSchema, 'findByIdAndDelete')
    .mockResolvedValue(organizationMock as any);

  jest.spyOn(EmployeeSchema, 'find').mockResolvedValue([employeeMock] as any);
});

describe('success cases', () => {
  it('should create a new organizations', async () => {
    const response = await request(app)
      .post('/organizations')
      .send(organizationMock);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(organizationMock);
  });

  it('should find all organizations', async () => {
    const response = await request(app).get('/organizations');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject([organizationMock]);
  });

  it('should find a organizations', async () => {
    const response = await request(app).get(
      '/organizations/691f17afca372b06ced95d15',
    );

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(organizationMock);
  });

  it('should update a organizations', async () => {
    const response = await request(app)
      .patch('/organizations/691f17afca372b06ced95d15')
      .send({ name: 'Empresa Teste Atualizada' });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(organizationMockUpdated);
  });

  it('should deactivate a organizations', async () => {
    jest
      .spyOn(OrganizationSchema, 'findByIdAndUpdate')
      .mockResolvedValueOnce(organizationMockDeactivated);
    const response = await request(app).post(
      '/organizations/deactivate/691f17afca372b06ced95d15',
    );

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(organizationMockDeactivated);
  });
});

describe('error cases', () => {
  it('should not create a new organizations without name', async () => {
    const { name: _name, ...customMock } = organizationMock;
    const response = await request(app).post('/organizations').send(customMock);

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

  it('should not create a new organizations without sector', async () => {
    const { sector: _sector, ...customMock } = organizationMock;
    const response = await request(app).post('/organizations').send(customMock);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Erro de validação',
      errors: [
        {
          code: 'invalid_type',
          expected: 'string',
          message: 'Invalid input: expected string, received undefined',
          path: ['sector'],
        },
      ],
    });
  });

  it('should not create a new organizations without cnpj', async () => {
    const { cnpj: _cnpj, ...customMock } = organizationMock;
    const response = await request(app).post('/organizations').send(customMock);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Erro de validação',
      errors: [
        {
          code: 'invalid_type',
          expected: 'string',
          message: 'Invalid input: expected string, received undefined',
          path: ['cnpj'],
        },
      ],
    });
  });

  it('should not create a new organizations without city', async () => {
    const { city: _cnpj, ...customMock } = organizationMock;
    const response = await request(app).post('/organizations').send(customMock);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Erro de validação',
      errors: [
        {
          code: 'invalid_type',
          expected: 'string',
          message: 'Invalid input: expected string, received undefined',
          path: ['city'],
        },
      ],
    });
  });

  it('should not create a new organizations with invalid cnpj', async () => {
    const customMock = { ...organizationMock, cnpj: 'invalid' };
    const response = await request(app).post('/organizations').send(customMock);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Erro de validação',
      errors: [
        {
          code: 'custom',
          message: 'CNPJ inválido',
          path: ['cnpj'],
        },
      ],
    });
  });

  it('should not update a organizations with invalid cnpj', async () => {
    const customMock = { ...organizationMockUpdated, cnpj: 'invalid' };
    const response = await request(app)
      .patch('/organizations/691f17afca372b06ced95d15')
      .send(customMock);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Erro de validação',
      errors: [
        {
          code: 'custom',
          message: 'CNPJ inválido',
          path: ['cnpj'],
        },
      ],
    });
  });

  it('should not updated a organizations with invalid id', async () => {
    jest
      .spyOn(OrganizationSchema, 'findByIdAndUpdate')
      .mockResolvedValueOnce(null);

    const response = await request(app)
      .patch('/organizations/1')
      .send(organizationMock);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      message: 'Organization not found',
    });
  });

  it('should not return a organizations with invalid id', async () => {
    jest.spyOn(OrganizationSchema, 'findById').mockResolvedValueOnce(null);

    const response = await request(app).get('/organizations/1');

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      message: 'Organization not found',
    });
  });
});
