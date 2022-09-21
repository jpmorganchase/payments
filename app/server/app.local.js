const app = require('./app');

app
  .listen(8081, () => {
    console.log(`
################################################
🛡️  Server listening on port: 8081 🛡️
################################################
`);
  })
  .on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
