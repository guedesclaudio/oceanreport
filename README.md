<div align="center">
  <h1>OCEAN REPORT v1.0</h1>
  <br> 
  Ocean Report it's a free software, with porpouse of the manage reports about ocean conditions of the Rio de Janeiro beaches. The reports are made based on algoritm that is increase with realtime data of the meteo-ocean buoy, and they are updated each one hour, 7 days per week. It's possible receive reports on email and to share oceans observations with posts on timeline. The software it's in construction, and some new features are being done.
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

# Stack principal Frontend
- React
- TypeScript
- Syled-components
- Docker
- Nginx

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


# Como iniciar
1. Clone this repository
2. Configure the .env according to the .env.example in the backend and frontend
3. Run the command docker-compose:
```bash
docker-compose up -d
```
4. Access localhost:8080
<br>