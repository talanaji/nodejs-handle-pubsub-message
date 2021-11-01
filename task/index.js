const app = require('./app.js');
const PORT = process.env.PORT || 8080;
/**
 * 
 * Application Listen to @param  {} PORT
 */

app.listen(PORT, () =>
  console.log(`Application listening on port ${PORT}`)
);