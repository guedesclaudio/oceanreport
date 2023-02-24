<div align="center">
  <h1>OCEAN REPORT v1.0</h1>
  <br> 
  Ocean Report é um software livre, com o intuito de gerenciar reports das condições oceânicas das praias do Rio de Janeiro. Os reports são feitos através de um algoritmo alimentado com base nos dados em tempo real de uma boia meteo-oceanográfica e são atualizados de 1 em 1 hora, 7 dias por semana. Além disso, também é possível receber os reports diretamente por email, e compartilhar suas próprias observações em formato de posts sobre as condições oceânicas na sua região, contribuindo com outros usuários através da nossa timeline.
  <br>
  <br>
  <img src= 'frontend/src/img/ocean-report-home.png'>
  <br>
  <br>
  <img src= 'frontend/src/img/ocean-report-mobile.png'>
</div>
<br>

# Arquitetura
<div align="center">
  <img src= 'frontend/src/img/arq-oceanreport.png'>
  <br>
</div>
<br>
  
# Funcionalidades
- Fluxo de login e cadastro
- Login OAuth com google e github
- Report gerado de 1 em 1 hora, 7 dias por semana
- Opção de receber reports por email
- Acompanhar posts de outros usuários
- Compartilhar e excluir posts
- Filtro de palavras ofensivas ao publicar um post
- Exclusão automática de posts antigos
- Acesso a previsão de tempo e mar com link externo (Windy)

# Pŕoximas atualizações para v2.0
- Aumentar a região de geração de reports
- Opção de poder avaliar a acertividade do algoritmo que gera o report
- Opção do usuário poder gerenciar sua conta

# Stack principal Frontend
- React
- TypeScript
- Syled-components
- Docker
- Nginx
- Git
- Linux

# Stack principal Backend
- Node.js
- TypeScript
- Express
- Joi
- Redis
- JWT
- PostgreSQL
- Prisma
- Jest
- Supertest
- Docker
- Nginx
- Git
- Linux


# Como iniciar
1. Clone esse repositório
2. Configure o .env de acordo com o .env.example no backend e frontend
3. Rode o comando docker-compose:
```bash
docker-compose up -d
```
4. Acesse localhost:8080
<br>