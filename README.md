## Themis API

<hr>

### SOBRE O PROJETO :file_folder:
Microsserviço utilizando TypeScript/Node feito com o objetivo de praticar a linguagem e conhecer suas libs.

<hr>

### TECNOLOGIAS QUE ESTÃO SENDO USADAS :space_invader:

:small_blue_diamond: TypeScript 

:small_blue_diamond: Node

:small_blue_diamond: Express.js

:small_blue_diamond: Express Validator

:small_blue_diamond: MongoDB

<hr>

### ROTAS DISPONIVEIS :telescope:

#### GET

```
{host}:{port}/posts - Lista todos os posts criados
{host}:{port}/posts/{id} - Busca um post por seu id
```

#### POST

```
{host}:{port}/posts - Cria um novo post de acordo com o body enviado - {"title": string, "body: string, "userId": string}
```

#### PUT

```
{host}:{port}/posts/{id} - Edita um post existente de acordo com o body enviado - {"title": string, "body: string}
```

<hr>

### PARA EXECUTAR :calling:
- Crie um arquivo ```.env``` na raiz do projeto de acordo com o ```.env-exemple```
- Instale as depedências do projeto com ```NPM/YARN INSTALL```
- Execute o servidor com ```NPM RUN START``` ou ```YARN START```
