# Cronograma de Desenvolvimento (21 a 23 de Maio)

## Projeto: Plataforma de Streaming com Arquitetura Distribuída e Mensageria Assíncrona

---
## 📅 21/05 — Arquitetura + Backend Inicial + Banco de Dados
### 🎯 Meta: Fundações sólidas e mensageria funcional

- [ ] - **Planejamento**
    - [ ] - Definir estrutura de monorepo:
        /apps/{api-gateway, analytics-worker, frontend}
        /packages/{config, types}
        /infra/ (serverless, IaC, mocks)
        /prisma/
- [ ] - **Backend (API Gateway - Fastify)**
    - [ ] - Criar rota pública `GET /videos` (dados reais do S3)
    - [ ] - Criar rota protegida `POST /watch/:videoId` (JWT + publish no SQS)
    - [ ] - Criar plugin de autenticação JWT + validação Zod
- [ ] - **Banco de Dados + ORM**
    - [ ] - Configurar Prisma + SQLite (local) / PostgreSQL (produção)
    - [ ] - Criar model `VideoView` com campos `id`, `userId`, `videoId`, `viewedAt`
- [ ] - **Mensageria com SQS**
    - [ ] - Criar fila `watch-events`
    - [ ] - Criar script para publicar evento manual (via CLI)
    - [ ] - Validar evento via Postman ou script de teste

---

## 📅 22/05 — Frontend + Worker + Observabilidade
### 🎯 Meta: App funcional ponta a ponta com rastreamento e persistência

- [ ] - **Frontend (Next.js + Shadcn UI)**
    - [ ] - Mock login: gerar JWT e salvar no localStorage
    - [ ] - Tela principal: listar vídeos (`GET /videos`)
    - [ ] - Botão “Assistir” → chama `POST /watch/:videoId`
    - [ ] - Reproduzir vídeo real com `<video src="...">`
- [ ] - **Analytics Worker (Fastify script ou microservice)**
    - [ ] - Polling no SQS
    - [ ] - Validar formato da mensagem
    - [ ] - Salvar no banco (`VideoView`) via Prisma
    - [ ] - Log estruturado de cada evento processado
- [ ] - **Observabilidade (MVP)**
    - [ ] - Logging com pino (estruturado, com contexto)
    - [ ] - Integração básica com OpenTelemetry SDK para Fastify (ex: `traceId`, `spanId`)
    - [ ] - Middleware com rastreamento mínimo nos endpoints
- [ ] - **Documentação técnica**
    - [ ] - Criar `/docs/architecture.md` com:
        - [ ] - Diagrama da arquitetura (YAML + imagem)
        - [ ] - Justificativa de decisões (monorepo, SQS, JWT, etc)

---
## 📅 23/05 — Testes + CI/CD + Documentação Final + Deploy
### 🎯 Meta: Qualidade, entrega automatizada e documentação robusta

- [ ] - **Testes**
    - [ ] - Unitários com Jest:
        - [ ] - `publishEventToSQS`
        - [ ] - `validateJWTMiddleware`
        - [ ] - `processWatchEvent()`
    - [ ] - Integração opcional: mock da API + worker
    - [ ] - Carga com K6: simular acessos em `POST /watch/:videoId`
- [ ] - **CI/CD com GitHub Actions**
    - [ ] - Pipeline com etapas:
        - [ ] - Lint + Type Check
        - [ ] - Build
        - [ ] - Testes
        - [ ] - Deploy Serverless (`serverless deploy`)
- [ ] - **Deploy**
    - [ ] - API + Worker via Serverless Framework
    - [ ] - AWS Lambda com handlers separados (`api`, `worker`)
    - [ ] - Config via `serverless.yml`
    - [ ] - Banco: RDS Postgres ou SQLite no dev
    - [ ] - Frontend: manter no Vercel
- [ ] - **Documentação Final (README.md)**
    - [ ] - Stack utilizada com badges
    - [ ] - Instruções de execução local
    - [ ] - Instruções para deploy na AWS
    - [ ] - Diagrama completo com fluxo do evento
    - [ ] - Como testar a aplicação (manualmente + testes automáticos)
    - [ ] - Considerações finais + próximos passos

---

## ✅ Checklist Final por Área

### 🧱 Backend (Fastify - API Gateway)

- [ ] - Rota pública `GET /videos` (S3)
- [ ] - Rota protegida `POST /watch/:videoId`
- [ ] - JWT Middleware + Zod
- [ ] - Publicação no SQS
- [ ] - Observabilidade mínima com OpenTelemetry
- [ ] - Logs com pino

### 🧩 Worker (Analytics Service)

- [ ] - Polling do SQS
- [ ] - Validação de mensagem
- [ ] - Persistência com Prisma
- [ ] - Logs por evento
- [ ] - Rastreabilidade (`traceId`)

### 🖥️ Frontend (Next.js)

- [ ] - Login mock com JWT
- [ ] - Listagem de vídeos reais
- [ ] - Botão de assistir → aciona backend
- [ ] - Player real com link do S3

### 🔍 Observabilidade

- [ ] - pino em todos os serviços
- [ ] - `traceId` no contexto de requisição
- [ ] - OpenTelemetry básico (instrumentação SDK, middleware trace)

### 🔧 CI/CD

- [ ] - GitHub Actions configurado
- [ ] - Build + Lint + Testes
- [ ] - Deploy automático serverless

### ☁️ Infraestrutura

- [ ] - Serverless Framework configurado
- [ ] - Deploy no AWS Lambda (API + Worker)
- [ ] - Fila SQS provisionada (manualmente ou IaC)
- [ ] - Prisma com conexão ao banco

### 📝 Documentação

- [ ] - README completo
- [ ] - `/docs/architecture.md`
- [ ] - Diagramas
- [ ] - Prints ou GIFs do frontend
- [ ] - Justificativas técnicas