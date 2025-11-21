export const organizationMock = {
  name: 'Empresa Teste',
  sector: 'Financeiro',
  cnpj: '97.864.586/0001-74',
  city: 'São Paulo',
};

export const organizationMockUpdated = {
  name: 'Empresa Teste Atualizada',
  sector: 'Financeiro',
  cnpj: '97.864.586/0001-74',
  city: 'São Paulo',
};

export const organizationMockDeactivated = {
  name: 'Empresa Teste',
  sector: 'Financeiro',
  cnpj: '97.864.586/0001-74',
  city: 'São Paulo',
  is_active: false,
};

export const createdOrganizationMock = {
  _id: '691f17afca372b06ced95d15',
  name: 'Empresa Teste',
  sector: 'Financeiro',
  cnpj: '97.864.586/0001-74',
  city: 'São Paulo',
  is_active: true,
};

export const paginatedOrganizationMock = {
  items: [organizationMock],
  total: 1,
  page: 1,
  limit: 10,
  totalPages: 1,
};
