# Git Flow

Este documento define o fluxo de trabalho utilizando Git no projeto. O objetivo é manter um histórico organizado, facilitar revisões de código e reduzir conflitos entre os membros da equipe.

---

# Fluxo de Branches

O projeto utiliza uma estratégia baseada em **Git Flow simplificado**.

## Branches Principais

| Branch | Finalidade |
|---------|------------|
| `main` | Contém apenas código estável e pronto para produção. |
| `develop` | Branch principal de desenvolvimento. Todas as novas funcionalidades devem partir dela. |

---

# Branches Temporárias

## Feature

Utilizada para desenvolvimento de novas funcionalidades.

**Padrão**

```
feature/nome-da-feature
```

### Exemplos

```
feature/login
feature/user-authentication
feature/product-dashboard
feature/create-order
```

---

## Bugfix

Utilizada para corrigir erros encontrados durante o desenvolvimento.

**Padrão**

```
bugfix/nome-do-bug
```

### Exemplos

```
bugfix/login-validation
bugfix/payment-error
bugfix/user-profile
```

---

## Hotfix

Utilizada para corrigir problemas críticos encontrados em produção.

Sempre deve ser criada a partir da branch `main`.

**Padrão**

```
hotfix/nome-do-hotfix
```

### Exemplos

```
hotfix/login-crash
hotfix/security-patch
hotfix/payment-timeout
```

Após a correção:

- Merge em `main`
- Merge também em `develop`

---

## Release

Utilizada para preparar uma nova versão da aplicação.

**Padrão**

```
release/x.y.z
```

### Exemplos

```
release/1.0.0
release/1.2.0
release/2.0.0
```

Após a homologação:

- Merge em `main`
- Criar uma tag
- Merge em `develop`

---

# Fluxo de Desenvolvimento

```text
develop
    │
    ├── feature/login
    ├── feature/dashboard
    ├── feature/orders
    │
    └── Merge → develop

develop
    │
    └── release/1.0.0
            │
            └── Merge → main
                    │
                    └── Tag v1.0.0
```

---

# Processo para Nova Funcionalidade

1. Atualize a branch `develop`.

```bash
git checkout develop
git pull origin develop
```

2. Crie uma nova branch.

```bash
git checkout -b feature/nome-da-feature
```

3. Desenvolva a funcionalidade.

4. Faça commits pequenos e descritivos.

5. Envie a branch para o repositório.

```bash
git push origin feature/nome-da-feature
```

6. Abra um Pull Request para `develop`.

7. Após aprovação, realize o merge.

8. Exclua a branch após o merge.

---

# Processo para Correção de Bug

```bash
git checkout develop
git pull origin develop
git checkout -b bugfix/nome-do-bug
```

Após finalizar:

- Push
- Pull Request
- Code Review
- Merge em `develop`

---

# Processo para Hotfix

```bash
git checkout main
git pull origin main
git checkout -b hotfix/nome-do-hotfix
```

Após concluir:

- Merge em `main`
- Merge em `develop`
- Criar uma tag de versão (quando aplicável)

---

# Convenção de Commits

Os commits devem seguir o padrão **Conventional Commits**.

## Estrutura

```text
tipo(escopo): descrição
```

---

## Tipos Permitidos

| Tipo | Descrição |
|------|-----------|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Documentação |
| `style` | Alterações de formatação (sem impacto funcional) |
| `refactor` | Refatoração de código |
| `perf` | Melhorias de performance |
| `test` | Testes |
| `build` | Build e dependências |
| `ci` | Integração contínua |
| `chore` | Tarefas gerais de manutenção |
| `revert` | Reversão de commit |

---

## Exemplos

```text
feat(auth): adiciona autenticação JWT

fix(login): corrige validação de senha

docs(readme): atualiza documentação

refactor(user): simplifica serviço de usuários

test(auth): adiciona testes de autenticação

chore(deps): atualiza dependências
```

---

# Pull Requests

Todo Pull Request deve:

- Ter uma descrição clara do objetivo.
- Referenciar a Issue correspondente (quando existir).
- Passar em todos os testes automatizados.
- Estar atualizado com a branch de destino.
- Ser aprovado por pelo menos um revisor antes do merge.

---

# Regras de Merge

- ❌ Não realizar commits diretamente na `main`.
- ❌ Não realizar commits diretamente na `develop`, exceto em casos excepcionais e previamente alinhados.
- ✅ Todo código deve passar por Pull Request.
- ✅ Todo Pull Request deve passar por Code Review.
- ✅ Resolver conflitos antes da aprovação.
- ✅ Garantir que a pipeline de CI esteja verde antes do merge.

---

# Versionamento

O projeto utiliza **Semantic Versioning (SemVer)**.

Formato:

```text
MAJOR.MINOR.PATCH
```

Exemplos:

| Versão | Significado |
|---------|-------------|
| `1.0.0` | Primeira versão estável |
| `1.1.0` | Nova funcionalidade compatível |
| `1.1.1` | Correção de bug |
| `2.0.0` | Alteração incompatível (breaking change) |

---

# Resumo

| Tipo | Origem | Destino |
|-------|--------|---------|
| `feature/*` | `develop` | `develop` |
| `bugfix/*` | `develop` | `develop` |
| `release/*` | `develop` | `main` e `develop` |
| `hotfix/*` | `main` | `main` e `develop` |

---

> **Objetivo:** manter um fluxo de desenvolvimento organizado, previsível e colaborativo, garantindo qualidade de código, rastreabilidade das mudanças e facilidade nas entregas para produção.