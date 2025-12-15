import app from './app.js';

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(' ');
  console.log(`Servidor rodando na porta ${port}...`);
});
