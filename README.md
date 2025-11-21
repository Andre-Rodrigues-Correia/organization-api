# 🏢 Descrição
API REST para gerenciamento de **Organizações** e **Funcionários**, permitindo operações de criação, atualização, consulta e exclusão de registros.

Essa API foi desenvolvida utilizando **Node.js**, **Express** e **TypeScript**, com **MongoDB** como banco de dados. 
Ela oferece uma interface RESTful completa para gerenciamento de empresas e funcionários, incluindo funcionalidades de desativação e integração entre empresas e colaboradores.

## 🚀 Como Executar

### Com Docker

1. Clone o repositório.
2. Entre na raiz do projeto e execute o seguinte comando:
```bash
  docker-compose up -d
```
3. Acesse a documentação swagger em `http://localhost:8080/docs`

### Sem Docker

1. Clone o repositório
2. Entre na raiz do projeto e instale as dependências:
```bash
  npm install
```
3. Crie o arquivo `.env` dentro de `/config` com as variáveis de ambiente necessárias.(use `.env.example` dentro de `/config` como referência)
4. Execute a aplicação em modo de desenvolvimento:
```bash
  npm run dev
```

- **Observação**: Antes de iniciar a aplicação sem Docker, é necessário ter o MongoDB rodando localmente para que o servidor consiga se conectar ao banco de dados
---

## ⚙️ Tecnologias Utilizadas:

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB** + **Mongoose**
- **Zod** (validação de dados)
- **Swagger** (documentação da API)
- **Docker** e **Docker Compose**
- **ESLint** + **Prettier**
- **Jest** (testes)

---

## 🛠 Funcionalidades

### Empresas
- Criar empresa
- Atualizar empresa
- Consultar empresa(s)
- Desativar empresa
- Excluir empresa (restrições aplicadas, veja observações abaixo)

### Funcionários
- Criar funcionário
- Atualizar funcionário
- Consultar funcionário(s)
- Desativar funcionário
- Excluir funcionário (restrições aplicadas, veja observações abaixo)

### Empresa e funcionário paralelo
- Criar empresa e funcionário em paralelo

---

## 📝 Observações Importantes

- A criação de funcionários depende da existência de uma empresa, pois cada funcionário deve estar associado a uma organização.
- É possível criar uma empresa junto com um funcionário em um único endpoint.
- Empresas e funcionários podem ser desativados sem necessidade de exclusão, preservando o histórico de dados.
- Exclusões permanentes só podem ocorrer em empresas e funcionários que já estejam desativados.
- Não é possível excluir uma empresa com funcionários ativos.
- É possível filtrar funcionários por status.