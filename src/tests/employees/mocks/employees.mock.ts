export const createEmployeeMock = {
  name: 'João Silva',
  email: 'joaosilva@gmail.com',
  position: 'Analista',
  password: '12345678',
  organization: '691f17afca372b06ced95d15',
};

export const employeeMock = {
  name: 'João Silva',
  email: 'joaosilva@gmail.com',
  position: 'Analista',
  status: 'active',
  terminatedAt: null,
  organization: '691f17afca372b06ced95d15',
};

export const employeeMockUpdated = {
  name: 'João Silva Atualizado',
  email: 'joaosilva@gmail.com',
  position: 'Analista',
  status: 'active',
  terminatedAt: null,
  organization: '691f17afca372b06ced95d15',
};

export const employeeMockDeactivated = {
  name: 'João Silva',
  email: 'joaosilva@gmail.com',
  position: 'Analista',
  status: 'deactivated',
  terminatedAt: null,
  organization: '691f17afca372b06ced95d15',
};

export const paginatedEmployeeMock = {
  items: [employeeMock],
  total: 1,
  page: 1,
  limit: 10,
  totalPages: 1,
};
