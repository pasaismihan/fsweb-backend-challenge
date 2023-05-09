const server = require("./api/server");
const { PORT } = require("./config/config");

server.listen(PORT, () => {
  console.log(`server is running on ${PORT}...`);
});
