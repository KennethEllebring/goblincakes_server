const {app} = require('./app');
const {connect} = require('./db/connect');

connect();

app.listen(5050, () => {
  console.log(`\x1b[33m  Server running on http://localhost:5050 \x1b[0m`);
});
