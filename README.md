# 🏢 Organization API

API REST para gerenciamento de **Organizações** e **Funcionários**..

---

## 🚀 Como Executar

### Com Docker

1. Clone o repositório
2. Entre na raiz do projeto e execute o comando `docker-compose up -d`
3. Acesse a documentação swagger em `http://localhost:8080/docs`

### Sem Docker

1. Clone o repositório
2. Instale as dependências com o comando `npm install`
3. Crie o arquivo `.env` dentro de `/config` com as variáveis de ambiente (veja `.env.example` dentro de `/config`)
4. Execute o comando `npm run dev`
---

## 📝 Tecnologias Utilizadas

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