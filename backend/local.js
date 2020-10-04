const app = require('./app');

const port = process.env.PORT || 3200;
app.handler.server = app.handler.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app.handler;