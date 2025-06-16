# Fast Double Click! :rocket:

Avaliação de desenvolvimento para a empresa Directy

## Visão Geral

O Fast Double Click é uma aplicação full-stack que desafia os usuários a clicar duas vezes consecutivamente em um botão na página inicial "Home". A aplicação mede o intervalo de tempo entre esses cliques, registrando a data e a hora. Os registros são armazenados no back-end em um arquivo "registros.json".

Na segunda página, "List of Records", os usuários podem visualizar todos os registros. Eles têm a opção de filtrar os registros por data e ordená-los por tempo, data e horário. Isso oferece uma análise detalhada dos intervalos de tempo registrados.

Em resumo, o Fast Double Click permite medir e registrar intervalos de tempo entre cliques, oferecendo uma maneira simples de visualizar, filtrar e classificar esses registros.

## Tecnologias Utilizadas

### BackEnd

- JavaScript / Typescript
- Node.js
- Docker
- Express

### FrontEnd

- JavaScript / Typescript
- React
- Vite
- CSS
- Material UI
- Docker

## Instalação de Dependências

Para executar o projeto, siga as etapas abaixo:

1. Verifique se você possui o Git, o Node.js e o NPM instalados usando os comandos:

   ```
   git -v
   node -v
   npm -v
   ```

   Se não tiver, baixe-os.

2. Clone o repositório com o seguinte comando:

   ```
   git clone git@github.com:ebrauta/teste-fast-double-click.git
   ```

   Ou faça o download do arquivo ZIP e extraia o conteúdo em seu computador.

3. Navegue até a backend do projeto "Fast-Double-Click" ` e instale as dependências necessárias executando o comando:

   ```
   npm install
   ```

   As dependências do backend passam a estar instaladas

4. Navegue até a frontend do projeto "Fast-Double-Click" ` e instale as dependências necessárias executando o mesmo comando anterior:

   ```
   npm install
   ```

   As dependências do frontend passam a estar instaladas.

## Executando Localmente em Modo Desenvolvimento

1. Inicie o servidor backend isoladamente na pasta `/backend` com o seguinte comando:

   ```
   npm run dev
   ```

2. Inicie o servidor frontend isoladamente na pasta `/frontend`, inicie a aplicação com o comando:
   ```
   npm run dev
   ```
   Você será automaticamente redirecionado para o site.

## Executando via Docker

1. Verifique se o Docker e o Docker Compose estão instalados com os comandos:
   ```
   docker -v
   docker-compose -v
   ```

### Executando separadamente

1. Execute o contêiner Docker do backend na pasta `/backend` através dos seguintes comandos:

   ```
   docker build -t fast-double-click-backend .
   docker run -it --rm -p 8080:8080 -v ${PWD}/data:/app/data fast-double-click-backend

   ```

2. Execute o contêiner Docker do frontend na pasta `/frontend` através dos seguintes comandos:

   ```
   docker build -t fast-double-click-frontend .
   docker run -it --rm -p 5173:80 fast-double-click-frontend
   ```

Observação: se os dois forem feitos separados, será necessário criar uma rede Docker para isso. 

### Executando unidos

1. Na raiz do projeto, execute o seguinte comando para iniciar os contêineres Docker:

   ```
   docker-compose up --build
   ```

2. Agora, a aplicação estará disponível em execução no endereço http://localhost.

### Observações

- O backend mantém os registros em `./backend/data/registros.json` que é mapeado para dentro do container.
- O frontend é servido via nginx na porta 5173.
- Para parar os containers: `docker-compose down`