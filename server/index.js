const server = require('./server');

server.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
});
