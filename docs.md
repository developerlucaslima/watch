# Arquitetura e Decisões Técnicas

Este documento registra as principais decisões tomadas durante a concepção e implementação do projeto.

---

## 1. Monorepo com separação por domínio

**Decisão:** Adotar estrutura monorepo com os seguintes apps:

```
/apps
  ├── api-gateway          # Fastify + JWT + Prisma
  └── video-view-worker    # Lambda SQS consumer

/prisma                         # Schema, seed e migrations
```

**Justificativa:**

* Facilita o versionamento conjunto e CI/CD
* Permite escalar servindo domínios isoladamente
* Favorece evolução para arquitetura orientada a eventos

---

## 2. Persistência e ORM

**Decisão:** Utilizar **PostgreSQL** hospedado no **AWS RDS** e **Prisma ORM**

**Justificativa:**

* Prisma fornece DX moderna, tipagem forte e migrações seguras
* PostgreSQL é robusto, amplamente suportado e gerenciado via RDS
* Banco compartilhado por todos os serviços via `DATABASE_URL`

---

## 3. Fila assíncrona para rastreamento de visualizações

**Decisão:** Usar **AWS SQS** com uma fila `watch-events` e um worker Lambda

**Justificativa:**

* Desacopla escrita da visualização da requisição HTTP
* Permite escalar o consumo de forma independente
* Garante resiliência e retry automático via SQS

---

## 4. Framework e autenticação

**Decisão:** Backend com **Fastify**, autenticação via **JWT** e `@fastify/jwt`

**Justificativa:**

* Fastify é extremamente rápido e tem integração nativa com AWS Lambda
* JWT permite autenticação sem estado, ideal para Serverless

---

## 5. Deploy com Serverless Framework

**Decisão:** Utilizar Serverless Framework com `serverless-esbuild`

**Justificativa:**

* Suporte maduro a AWS Lambda, HTTP API, SQS, etc.
* Integração simples com CI/CD via GitHub Actions
* Esbuild permite bundle rápido, tree-shaking e suporte a ESM

---

## 6. Observabilidade e logging

**Decisão:** Uso de **pino** para logging estruturado

**Justificativa:**

* Pino é rápido, compatível com CloudWatch e suporta JSON
* Utilizado em ambos os serviços para log de erro e debug

---

## 7. Estrutura futura sugerida (em progresso)

```
/packages
  ├── common/        # Tipos, helpers, validações
  ├── auth/          # Lógica de JWT, cookies, etc.
  └── database/      # Prisma Client compartilhado
```

**Objetivo:** Reduzir acoplamento e repetir menos código entre serviços.

---

Este documento será atualizado com novas decisões conforme o projeto evolui.
