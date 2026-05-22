# BookShelf API

Aplicação full-stack demonstrativa para gerenciamento de livros em uma estante digital.

## Stack

- Backend: Node.js + Express
- Frontend: React + Vite
- Testes: Jest, Supertest, Vitest e Testing Library
- Pipeline: GitHub Actions
- Documentação: README, OpenAPI e Mermaid

## Objetivo da prática

Este projeto será usado para criar documentação técnica e validar um pipeline CI/CD com GitHub Actions.

## Endpoints

### DELETE /books/:id

Remove um livro por ID.

- `204 No Content` — livro removido com sucesso
- `404 Not Found` — livro não encontrado
- `409 Conflict` — livro está com status `reading` e não pode ser removido diretamente

