## Prefacio: O Coracao do Sistema

Este projeto e uma **API de cadastro de animais para uma clinica veterinaria**. Seu problema central e organizar informacoes essenciais sobre animais e seus tutores, oferecendo uma interface HTTP para cadastrar, listar, buscar, atualizar e remover registros.

A filosofia do codigo e didatica e evolutiva. A aplicacao saiu de um desenho concentrado no ponto de entrada e agora caminha para uma arquitetura modular, onde cada camada tem uma responsabilidade mais clara. O resultado e um backend pequeno o suficiente para ser lido por inteiro, mas estruturado o bastante para ensinar separacao de responsabilidades.

> **Nota de design:** a persistencia ainda e feita em memoria. O arquivo `src/config/database.js` exporta um array chamado `animais`, que funciona como um banco temporario. Ao reiniciar o servidor, os registros sao perdidos.

Nas proximas paginas, vamos acompanhar o sistema como uma historia tecnica: primeiro a paisagem arquitetural, depois a jornada dos dados, em seguida os personagens principais e, por fim, o guia pratico de execucao.

## Capitulo 1: A Paisagem Arquitetural

O ecossistema e composto por **Node.js**, **ES Modules** e **Express**. O `package.json` declara `"type": "module"`, entao o projeto usa `import` e `export` como mecanismo nativo de modulos.

A aplicacao esta organizada em uma arquitetura em camadas:

| Camada | Arquivo | Responsabilidade |
|---|---|---|
| Entrada da aplicacao | `src/index.js` | Cria o servidor Express, habilita JSON, monta o router e inicia a porta `3000`. |
| Rotas | `src/modules/animal/routes/animal.route.js` | Define os endpoints HTTP do modulo de animais. |
| Controller | `src/modules/animal/controllers/animal.controller.js` | Recebe `req` e `res`, valida dados basicos e chama o model. |
| Model | `src/modules/animal/models/animal.model.js` | Representa o animal e concentra as operacoes sobre os registros. |
| Banco em memoria | `src/config/database.js` | Guarda a lista `animais` enquanto o processo Node esta rodando. |

Uma boa analogia e pensar no sistema como uma clinica: o `index.js` abre a porta do predio; o router direciona o paciente para o balcao correto; o controller faz a triagem; o model consulta ou altera a ficha; e o array em memoria e o arquivo temporario de fichas.

## Capitulo 2: A Anatomia e a Jornada dos Dados

A jornada comeca em `src/index.js`. O arquivo importa o Express e o router do modulo animal, cria a aplicacao com `express()` e registra `app.use(express.json())`, permitindo que o servidor leia corpos de requisicao em JSON.

Depois disso, `app.use(router)` conecta as rotas de animais ao servidor. Esse detalhe e importante: hoje o ponto de entrada nao contem mais a logica CRUD diretamente. Ele apenas monta a infraestrutura e entrega o fluxo ao modulo `animal`.

### O caminho feliz: cadastro de um animal

O cadastro passa por `POST /cadastrar`, definido em `animal.route.js`. Essa rota chama `AnimalController.cadastrarAnimal`.

No controller, o corpo da requisicao e desmontado em campos do dominio:

- `codigo`
- `nome`
- `especie`
- `raca`
- `idade`
- `peso`
- `nomeTutor`
- `telefoneTutor`

Se algum campo obrigatorio estiver ausente, o controller responde `400 Bad Request` com a mensagem `Todos os campos devem ser preenchidos.`.

Quando os dados chegam completos, o controller chama `AnimalModel.cadastrarAnimal(...)`. O model cria uma nova instancia de `AnimalModel`, preenche suas propriedades e adiciona esse objeto ao array `animais` importado de `src/config/database.js`.

O fluxo se encerra com uma resposta `201 Created`, contendo uma mensagem de sucesso e o animal recem-cadastrado.

### Listagem

A listagem passa por `GET /listar`. O router encaminha a chamada para `AnimalController.listarAnimais`, que por sua vez chama `AnimalModel.listarAnimais()`.

O model devolve o array inteiro. Como o armazenamento e em memoria, essa resposta representa exatamente o estado atual da aplicacao naquele processo Node.

### Busca, atualizacao e remocao

As rotas de consulta por identificador estao declaradas assim:

| Metodo | Rota declarada |
|---|---|
| `GET` | `/buscar/:matricula` |
| `PUT` | `/atualizar/:matricula` |
| `DELETE` | `/deletar/:matricula` |

A intencao arquitetural e clara: receber um identificador pela URL, entregar esse identificador ao controller e deixar o model procurar o animal correspondente.

> **Nota de implementacao atual:** existe um desalinhamento entre rota e controller. As rotas usam `:matricula`, mas o controller le `codigo` em `req.params`. Com o codigo atual, `req.params.codigo` fica `undefined` nessas rotas. Para o fluxo funcionar, o nome do parametro deve ser padronizado, por exemplo usando `:codigo` nas rotas ou lendo `matricula` no controller.

Quando esse alinhamento estiver corrigido, a busca chamara `AnimalModel.buscarAnimalPorCodigo(codigo)`, a atualizacao chamara `AnimalModel.atualizarAnimal(codigo, dados)` e a remocao chamara `AnimalModel.deletarAnimal(codigo)`.

## Capitulo 3: Os Atores Principais

### `src/index.js`: o porteiro da aplicacao

O `index.js` e pequeno e intencional. Ele importa o router, registra middlewares globais e sobe o servidor. Essa simplicidade e saudavel: quanto menos regra de negocio vive no ponto de entrada, mais facil fica evoluir a aplicacao por modulos.

### `animal.route.js`: o mapa das portas HTTP

O router define a superficie publica do modulo:

| Metodo | Endpoint | Acao esperada |
|---|---|---|
| `GET` | `/listar` | Listar animais. |
| `GET` | `/buscar/:matricula` | Buscar um animal por identificador. |
| `POST` | `/cadastrar` | Cadastrar um animal. |
| `PUT` | `/atualizar/:matricula` | Atualizar um animal. |
| `DELETE` | `/deletar/:matricula` | Remover um animal. |

Ele atua como uma placa de direcao: nao resolve o problema sozinho, apenas encaminha cada URL ao metodo correto do controller.

### `AnimalController`: o tradutor HTTP

O controller mora em `src/modules/animal/controllers/animal.controller.js`. Ele traduz o mundo HTTP para o mundo do dominio.

Sua responsabilidade e ler dados de `req.body` e `req.params`, fazer validacoes basicas, chamar o model e devolver respostas JSON com codigos HTTP adequados. Quando algo da errado, ele responde com mensagens como `Animal nao encontrado.` ou `Erro ao cadastrar animal.`.

### `AnimalModel`: o guardiao dos registros

O model em `src/modules/animal/models/animal.model.js` representa tanto a estrutura de um animal quanto as operacoes sobre a colecao.

Ele possui metodos estaticos para:

- cadastrar um animal;
- listar todos os animais;
- buscar por codigo;
- atualizar campos de um animal existente;
- deletar um animal.

Na atualizacao, o model usa o operador `||` para manter valores antigos quando um novo valor nao e informado. Isso permite uma atualizacao mais tolerante, mas tambem significa que valores falsy, como `0` ou string vazia, nao substituem o valor anterior.

### `database.js`: o banco em memoria

O arquivo `src/config/database.js` exporta apenas:

```js
const animais = [];

export default animais;
```

Esse array compartilhado e importado pelo model. Ele funciona bem para estudo, prototipagem e demonstracao de fluxo, mas nao substitui um banco persistente em producao.

## Capitulo 4: Colocando a Mao na Massa

Instale as dependencias:

```bash
npm install
```

Inicie o servidor:

```bash
npm start
```

O servidor sobe em:

```text
http://localhost:3000
```

### Rotas disponiveis

| Metodo | Rota | Descricao |
|---|---|---|
| `GET` | `/` | Retorna uma mensagem simples da API. |
| `GET` | `/listar` | Lista todos os animais cadastrados. |
| `GET` | `/buscar/:matricula` | Busca um animal por identificador, com a ressalva do desalinhamento atual de parametro. |
| `POST` | `/cadastrar` | Cadastra um novo animal. |
| `PUT` | `/atualizar/:matricula` | Atualiza um animal, com a ressalva do desalinhamento atual de parametro. |
| `DELETE` | `/deletar/:matricula` | Remove um animal, com a ressalva do desalinhamento atual de parametro. |

### Exemplo de cadastro

```json
{
  "codigo": "A001",
  "nome": "Thor",
  "especie": "Cachorro",
  "raca": "Labrador",
  "idade": 4,
  "peso": 28.5,
  "nomeTutor": "Marina",
  "telefoneTutor": "11999999999"
}
```

### Exemplo com `curl`

```bash
curl -X POST http://localhost:3000/cadastrar \
  -H "Content-Type: application/json" \
  -d '{
    "codigo": "A001",
    "nome": "Thor",
    "especie": "Cachorro",
    "raca": "Labrador",
    "idade": 4,
    "peso": 28.5,
    "nomeTutor": "Marina",
    "telefoneTutor": "11999999999"
  }'
```

Depois do cadastro, a listagem pode ser testada com:

```bash
curl http://localhost:3000/listar
```

## Apendice Tecnico: Dicionario Rapido

| Item | Papel |
|---|---|
| `package.json` | Define o projeto Node, ES Modules e script `npm start`. |
| `src/index.js` | Ponto de entrada, configuracao do Express e montagem do router. |
| `express.json()` | Middleware que permite ler JSON no corpo das requisicoes. |
| `src/modules/animal/routes/animal.route.js` | Define os endpoints do modulo animal. |
| `AnimalController.listarAnimais` | Retorna a lista de animais. |
| `AnimalController.buscarAnimalPorCodigo` | Busca um animal usando parametro da URL. |
| `AnimalController.cadastrarAnimal` | Valida campos obrigatorios e cria um registro. |
| `AnimalController.atualizarAnimal` | Atualiza dados de um animal existente. |
| `AnimalController.deletarAnimal` | Remove um animal existente. |
| `AnimalModel` | Representa o animal e concentra operacoes da colecao. |
| `src/config/database.js` | Exporta o array `animais`, usado como banco em memoria. |
| `docs/gitflow.md` | Guia de branches, PRs, commits e versionamento. |
| `docs/convetions.md` | Convencoes de nomes e estilo para manter consistencia. |

## Encerramento

Este CRUD agora esta mais proximo de uma arquitetura modular: o servidor monta rotas, as rotas acionam controllers, os controllers chamam o model, e o model manipula o banco em memoria. O proximo ajuste tecnico mais importante e alinhar o parametro das rotas com o parametro lido pelo controller, garantindo que busca, atualizacao e remocao encontrem corretamente o animal pelo codigo.
