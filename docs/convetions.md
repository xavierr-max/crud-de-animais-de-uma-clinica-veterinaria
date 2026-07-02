# Convenções de Código

Este documento define as convenções de nomenclatura utilizadas no projeto. O objetivo é manter o código consistente, legível e de fácil manutenção.

---

# Princípios Gerais

- Utilize nomes descritivos e sem abreviações desnecessárias.
- Prefira nomes que expressem claramente a responsabilidade da variável, função ou classe.
- Mantenha o mesmo padrão em todo o projeto.
- Utilize inglês para todos os identificadores do código.

---

# Convenções de Nomenclatura

| Elemento | Convenção | Exemplo |
|----------|-----------|----------|
| Variáveis de Ambiente | `UPPER_SNAKE_CASE` | `DATABASE_URL`, `JWT_SECRET`, `API_BASE_URL` |
| Variáveis Globais | `camelCase` | `currentUser`, `applicationConfig`, `httpClient` |
| Variáveis Locais | `camelCase` | `userName`, `totalPrice`, `createdAt` |
| Parâmetros de Função | `camelCase` | `userId`, `productList` |
| Funções | `camelCase` | `getUser()`, `createOrder()`, `calculateTotal()` |
| Métodos | `camelCase` | `saveChanges()`, `findById()` |
| Classes | `PascalCase` | `UserService`, `ProductRepository` |
| Interfaces | `PascalCase` | `UserRepository`, `AuthenticationService` |
| Enums | `PascalCase` | `UserRole`, `OrderStatus` |
| Membros de Enum | `UPPER_SNAKE_CASE` | `ADMIN`, `PENDING_PAYMENT`, `COMPLETED` |
| Constantes | `UPPER_SNAKE_CASE` | `MAX_RETRY_COUNT`, `DEFAULT_TIMEOUT` |
| Arquivos | `kebab-case` | `user-service.ts`, `auth-controller.cs` |
| Pastas | `kebab-case` | `user-management`, `authentication` |
| Chaves JSON | `camelCase` | `firstName`, `createdAt` |
| Rotas REST | `kebab-case` | `/users`, `/user-profile`, `/order-items` |

---

# Variáveis de Ambiente

Todas as variáveis de ambiente devem utilizar **UPPER_SNAKE_CASE**.

## Correto

```env
DATABASE_URL=
JWT_SECRET=
API_KEY=
REDIS_HOST=
SMTP_PASSWORD=
```

## Incorreto

```env
databaseUrl=
jwtSecret=
DatabaseUrl=
```

---

# Variáveis Globais

As variáveis globais devem utilizar **camelCase**.

## Correto

```typescript
const applicationConfig = {};
const currentUser = {};
let httpClient;
```

## Incorreto

```typescript
const ApplicationConfig = {};
const application_config = {};
const APPLICATION_CONFIG = {};
```

---

# Variáveis Locais

Todas as variáveis locais devem utilizar **camelCase**.

## Correto

```typescript
const userName = "John";
let totalPrice = 0;
const createdAt = new Date();
```

---

# Funções

As funções devem utilizar **camelCase** e iniciar preferencialmente com um verbo.

## Correto

```typescript
getUser();
createUser();
calculateTotal();
validateToken();
```

Evite nomes genéricos como:

```typescript
process();
execute();
run();
handle();
```

Sempre que possível, seja específico.

---

# Classes

As classes devem utilizar **PascalCase**.

## Correto

```typescript
UserService
AuthenticationController
OrderRepository
ProductValidator
```

---

# Interfaces

As interfaces devem utilizar **PascalCase**.

Não utilizar prefixo `I`.

## Correto

```typescript
UserRepository
AuthenticationProvider
EmailService
```

## Evite

```typescript
IUserRepository
IEmailService
```

---

# Enums

O nome do enum deve utilizar **PascalCase**.

Os valores internos devem utilizar **UPPER_SNAKE_CASE**.

```typescript
enum OrderStatus {
    PENDING,
    APPROVED,
    CANCELLED
}
```

---

# Constantes

Toda constante deve utilizar **UPPER_SNAKE_CASE**.

```typescript
const MAX_FILE_SIZE = 5000;
const DEFAULT_TIMEOUT = 30000;
const MAX_LOGIN_ATTEMPTS = 5;
```

---

# Arquivos

Os nomes dos arquivos devem utilizar **kebab-case**.

## Correto

```
user-service.ts
order-controller.cs
authentication.service.ts
```

Evite:

```
UserService.ts
user_service.ts
User_Service.ts
```

---

# Pastas

As pastas também devem utilizar **kebab-case**.

## Correto

```
controllers/
services/
repositories/
user-management/
authentication/
```

---

# Chaves JSON

As propriedades de objetos JSON devem utilizar **camelCase**.

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2026-07-02"
}
```

---

# APIs REST

Utilize **kebab-case** nas rotas.

## Correto

```
GET /users
GET /user-profile
POST /order-items
```

---

# Boas Práticas

- Utilize nomes completos e descritivos.
- Evite abreviações sem necessidade.
- Não misture padrões de nomenclatura.
- Não utilize nomes de uma única letra, exceto em loops simples (`i`, `j`).
- Evite números no nome das variáveis.
- Prefira clareza em vez de nomes curtos.
- Mantenha consistência em todo o projeto.

---

# Resumo

| Elemento | Convenção |
|----------|-----------|
| Variáveis de Ambiente | `UPPER_SNAKE_CASE` |
| Variáveis Globais | `camelCase` |
| Variáveis Locais | `camelCase` |
| Funções | `camelCase` |
| Métodos | `camelCase` |
| Classes | `PascalCase` |
| Interfaces | `PascalCase` (sem prefixo `I`) |
| Enums | `PascalCase` |
| Valores de Enum | `UPPER_SNAKE_CASE` |
| Constantes | `UPPER_SNAKE_CASE` |
| Arquivos | `kebab-case` |
| Pastas | `kebab-case` |
| JSON | `camelCase` |
| Rotas REST | `kebab-case` |

---

> **Objetivo:** manter uma base de código padronizada, previsível e de fácil manutenção para toda a equipe.