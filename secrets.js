// secrets.js
import "dotenv/config";

const secrets = {
  wolkvox_server: process.env.WOLKVOX_SERVER,
  wolkvox_token: process.env.WOLKVOX_TOKEN,
};

export default secrets;
