# Fast Double Click! :rocket:

Avaliação de desenvolvimento para a empresa Directy

## Visão Geral

O Fast Double Click é uma aplicação full-stack que desafia os usuários a clicar duas vezes consecutivamente em um botão na página inicial "Home". A aplicação mede o intervalo de tempo entre esses cliques, registrando a data e a hora. Os registros são armazenados no back-end em um arquivo "registros.json".

Na segunda página, "List of Records", os usuários podem visualizar todos os registros. Eles têm a opção de filtrar os registros por data e ordená-los por horário ou tempo. Isso oferece uma análise detalhada dos intervalos de tempo registrados.

Em resumo, o Fast Double Click permite medir e registrar intervalos de tempo entre cliques, oferecendo uma maneira simples de visualizar, filtrar e classificar esses registros.

## Tecnologias Utilizadas

- JavaScript / Typescript
- React
- Node.js
- CSS
- Docker

## Instalação de Dependências

Para executar o projeto, siga as etapas abaixo:

1. Clone o repositório com o seguinte comando:

   ```
   git clone git@github.com:ebrauta/teste-fast-double-click.git
   ```

   Ou faça o download do arquivo ZIP e extraia o conteúdo em seu computador.

2. Verifique se você possui o Node.js e o NPM instalados usando o comando:

   ```
   node -v
   npm -v
   ```

3. Navegue até a backend do projeto "Fast-Double-Click" ` e instale as dependências necessárias executando o comando:

   ```
   npm install
   ```

   As dependências do backend passam a estar instaladas

4. Navegue até a frontend do projeto "Fast-Double-Click" ` e instale as dependências necessárias executando o mesmo comando anterior:

   ```
   npm install
   ```

   As dependências do frontend passam a estar instaladas

## Executando Localmente

1. Inicie o servidor backend isoladamente na pasta `/backend` com o seguinte comando:

   ```
   npm run dev
   ```

2. Inicie o servidor frontend isoladamente na pasta `/frontend`, inicie a aplicação com o comando:
   ```
   npm start
   ```
   Você será automaticamente redirecionado para o site.

## Executando via Docker

1. Verifique se o Docker está instalado com o comando:
   ```
   docker --version
   ```

2. Na raiz do projeto, execute o seguinte comando para iniciar os contêineres Docker:

```

docker-compose up -d

```

3. Agora, a aplicação estará disponível em execução no endereço http://localhost:5000.
```
