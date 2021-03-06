# Goomer Lista Rango

Esta API foi criada a partir do desafio [Goomer Dev Backend Interview](https://github.com/goomerdev/job-dev-backend-interview).

## Antes de começar

A implementação desta API está sendo feita em pequenas partes, para que seja possível trabalhar em poucas horas em cada tarefa.

### Board Kanban Notion
A implementação desta API foi estruturada previamente com Tasks e User Story com Sprints no Notion, para acessar e acompanhar o andamento da implementação [clique aqui](https://www.notion.so/19338ed5025044ce9502444c7027bc1b?v=3347c2ab76764b17b35c96aa3ee13292).

### Estrutura GIT
As branches foram criadas seguindo os IDs gerados para cada card do board, mas seguindo a estrutura do Git Flow. Assim é possível acompanhar as branches e os pull requests (PR) realizado em conjunto com o board.

Foi decidido também não criar branches dos épicos por conta do pouco tempo, pois assim oneraria demais o PRs sendo que a implementação foi feita apenas por eu.

### Estrutura Endpoints
A API utiliza uma estrutura de endpoints que utiliza a metodologia Restfull.

## Informações úteis

### Download do projeto
Após baixar o projeto é preciso instalar os pacotes do projeto com o `NPM`. A execução será feita utilizando `NODE`.
Dentro do pacote do projeto, instale os pacote com o comando:
```
npm i
```

### Boilerplate utilizado
Para criar a estrutura básica do `express` foi utilizado um boilerplate básico. Com o objetivo de utilizar Typescript (TS) no projeto, o boilerplate escolhido foi [express-boilerplate-generator](https://www.npmjs.com/package/express-boilerplate-generator). Devido a complexidade do código e de certos padrões seguido pelo boilerplate, muitas das estruturas e configurações foram alteradas, mantendo apenas o básico do `express` para o TS;

### Banco de Dados (BD)
A API precisa de um BD PostgreSQL para se comunicar. A extrutura deste BD pode ser encontrada no arquivo: `./DB_STARTER.sql`.

### Arquivo .env
É necessário um arquivo `./.env` para o projeto executar. Neste arquivo será inserido algumas informações necessárias para a execução da API mas que contém informações mais sensível e/ou que possam mudar de acordo com o ambiente do deploy da API.

Foi incuído no projeto um arquivo `./.env.example` dos atributos necessário no arquivo `./.env`. Você pode utilizá-lo como ponto de partida.

### Postman Collection
Dentro do projeto está exportada a coleção `./postmanCollection/Goomer.postman_collection.json` que foi utilizada para testar e validar os endpoints e exemplificam como utilizar a API.

#### NODE_ENV

Entre os atributos deste arquivo, há um específico chamado `NODE_ENV` que define algumas questões de nível de logs e informações fornecidas no console da API e também na resposta em caso de erro.
Opções:
- production
- development

_Obs. 2: é sábido que há formas mais seguras de armazenar informações sensíveis como senhas, mas para esta API de teste, seria o suficiente_

## Como executar
Há duas formas de executar o projeto:

### start
Executa a API da forma tradicional, mas com menos informações no console.
```
npm run start
```

### start:dev
Utiliza o `nodemon` para manter a API sempre rodando e atualizando em caso de alterações ou eventuais erros. Também gera mais informações no console.
```
npm run start:dev
```

## O que ainda não foi implementado (baseado no desafio)
- Testes unitários;

## Pontos de melhoria
_O que já foi elencado no item anterior, não será elencado aqui também._

- Implementação do Swagger para documentar os endpoints da API;
- Adicionar Timeout nas requisições dos endpoint;
- No cadastro de Restaurantes
    - Melhorar a estrutura dos horários de modo a bloquear também a intersecção de horários;
- No cadastro de Produtos
    - Separar a parte de Categorias em um endpoint a parte, permitindo reutilizar o mesmo;
    - Criar a estrutura de Promoção para manter histórico das promoções criadas;
- Em todos os registros, ter mais informações de data de criação/alteração para melhorar o histórico;
- Automatizar rotinas de LINT em commits do projeto;
- Adicionar camada de segurança e autenticação para as requisições;
