# Fluxo da aplicação

## Remoção de livro

Este fluxo representa a rota `DELETE /books/:id`.

```mermaid
sequenceDiagram
    participant Cliente
    participant API
    participant Memoria as Memória (books)

    Cliente->>API: DELETE /books/:id
    API->>Memoria: Busca livro pelo ID

    alt Livro não encontrado
        API-->>Cliente: 404 Livro não encontrado
    else Livro em leitura
        API-->>Cliente: 409 Livro em leitura não pode ser removido diretamente
    else Livro removível
        API->>Memoria: Remove livro da lista
        API-->>Cliente: 204 No Content
    end
```
