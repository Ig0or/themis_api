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

:small_blue_diamond: Jest

:small_blue_diamond: Stryker


<hr>

### ROTAS DISPONIVEIS :telescope:

#### GET

```
{host}:{port}/posts - Lista todos os posts criados
{host}:{port}/posts/{id} - Busca um post por seu id
{host}:{port}/users - Lista todos os usuarios criados
{host}:{port}/users/{id} - Busca um usuario por seu id
```

#### POST

```
{host}:{port}/posts - Cria um novo post de acordo com o body enviado - {"title": string, "body: string, "userId": string}
{host}:{port}/users - Cria um novo usuario de acordo com o body enviado - {"userName": string}
```

#### PUT

```
{host}:{port}/posts/{id} - Edita um post existente de acordo com o body enviado - {"title": string, "body: string}
{host}:{port}/users/{id} - Edita um usuario existente de acordo com o body enviado - {"userName": string}
```

#### DELETE

```
{host}:{port}/posts/{id} - Deleta um post de acordo com o id enviado na rota
{host}:{port}/users/{id} - Deleta um usuario de acordo com o id enviado na rota
```

<hr>

### PARA EXECUTAR O SERVIDOR :calling:
- Crie um arquivo ```.env``` na raiz do projeto de acordo com o ```.env-exemple```
- Instale as depedências do projeto com ```NPM/YARN INSTALL```
- Execute o servidor com ```NPM RUN START``` ou ```YARN START```

### PARA EXECUTAR OS TESTES :bomb:
- Somente testes unitários: ```NPM RUN TEST``` ou ```YARN TEST```
- Testes de cobertura: ```NPM RUN TEST:COV``` ou ```YARN TEST:COV```
- Testes de mutação: ```NPM RUN TEST:MUT``` ou ```YARN TEST:MUT```
