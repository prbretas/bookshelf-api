# Documentação viva — atualização por diff
Analise o Git diff abaixo e atualize apenas a documentação impactada.
## Arquivos permitidos
Você pode alterar somente:
- `README.md`
- `docs/INSTALLATION.md`
- `docs/diagrams/api-flow.md`
Não altere outros arquivos.
Não crie novos documentos.
Não altere `openapi.yaml`.
## Regras gerais
- Use somente mudanças reais presentes no diff.
- Não invente endpoints, comandos, dependências, status codes, mensagens ou fluxos.
- Preserve o estilo atual dos documentos.
- Faça alterações pontuais, sem reescrever arquivos inteiros.
- Se um documento não for impactado, mantenha-o inalterado.
- Ignore contexto anterior e use apenas a seção `Diff detectado`.
## Critérios de atualização
Atualize `README.md` quando houver:
- novo endpoint ou alteração em endpoint existente;
- nova funcionalidade visível;
- nova regra de negócio;
- nova validação;
- alteração em status code, mensagem de erro ou exemplo de uso;
- novo comando ou script relevante.
Atualize `docs/INSTALLATION.md` somente quando houver:
- nova dependência;
- alteração em instalação;
- alteração em comando de execução;
- alteração em variável de ambiente;
- alteração de porta;
- alteração no processo de setup.
Não altere `docs/INSTALLATION.md` apenas por nova rota, validação ou regra de
negócio.
Atualize `docs/diagrams/api-flow.md` quando houver:
- novo endpoint;
- alteração em rota existente;
- alteração em método HTTP;
- alteração em status code;
- alteração em request, response ou mensagem de erro;
- nova validação ou regra de negócio;
- alteração no fluxo entre cliente, API e resposta.
## Diagramas Mermaid
Se a mudança afetar fluxo de API, rota, validação ou regra de negócio, atualize
`docs/diagrams/api-flow.md` com um diagrama Mermaid do tipo `sequenceDiagram`.
O diagrama deve ser dinâmico e derivado do diff.
Para montar o diagrama:
- identifique a rota alterada, como `app.get`, `app.post`, `app.patch`, `app.put` ou
`app.delete`;
- identifique o método e o caminho da rota;
- identifique condições reais do código, como `if`, validações e regras de negócio;
- identifique retornos reais, como `return res.status(...).json(...)` ou `return
res.status(...).send(...)`;
- crie branches `alt` e `else` somente para condições que aparecem no código;
- use somente status codes e mensagens presentes no diff;
- represente alteração de estado apenas se ela existir no código.
Não inclua automaticamente `400`, `404`, `409`, `200`, `201` ou `204`.
Inclua esses status apenas se aparecerem no diff.
Se já existir diagrama para a rota afetada, atualize-o.
Se não existir, crie uma seção para a rota ou fluxo impactado.
## Saída esperada
Atualize diretamente os documentos necessários.
Ao final, informe brevemente:
- mudanças detectadas;
- documentos alterados;
- documentos preservados;
- diagramas criados ou atualizados;
- pontos para revisão humana, se houver.
---
## Arquivos modificados
```txt
{{CHANGED_FILES}}
```
## Diff detectado
```diff
{{GIT_DIFF}}
```