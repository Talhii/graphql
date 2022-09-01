import dotenv from "dotenv"

dotenv.config()
import server from "./api/server";
const port = process.env.PORT || 3301;

server.listen({ port }, () => console.log(
  `🚀 Server ready at http://localhost:${port}/api`,
));
