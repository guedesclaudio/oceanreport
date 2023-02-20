<div align="center">
  <h1>OCEAN REPORT v1.0</h1>
  <br> 
  Ocean Report é um software feito para gerenciar reports das condições oceânicas das praias do Rio de Janeiro. Os reports são feitos através de um algoritmo alimentado com base nos dados em tempo real de uma boia meteo-oceanográfica. Além disso, também é possível receber os reports diretamente por email, e compartilhar suas próprias observações sobre as condições oceanográficas na sua região com outros usuários através da nossa timeline. 
  <br>
  <br>
</div>
<br>

# Stack principal Backend
- Node.js
- TypeScript
- Express
- Joi
- Redis
- JWT
- PostgreSQL
- Docker
- Nginx
- Git
- Linux

# Como Iniciar
1. Clone esse repositório
2. Certifique-se que você tenha instalado:
```bash
npm >= v9.2.0
redis >= v7.0.7
node >= v18.12.1
typescript >= v4.5.4
```
3. Rode os seguintes comandos:
```bash
dev:migration:run
test:migration:run

dev:migration:generate
test:migration:generate
```
3. Crie uma chave de acesso no serviço sendgrid e coloque na sua variável de ambiente de acordo com o .env.example
2. Instale as dependências:
```bash
npm i
```
3. Configure o .env de acordo com o .env.example
4. Crie um env.development para ambiente de desenvolvimento
5. Crie um env.test para ambiente de teste
6. Inicie o redis:
```bash
redis-server
```
7. Inicie a aplicação:
```bash
npm run dev
```
<br>
