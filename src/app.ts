import "dotenv/config";
import express from "express";
import routes from "./routes";

const server = express();
server.use(express.json());
server.use(routes);

server.get("/github", (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

server.get("/signin/callback", (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

server.listen(3333, () => {
  console.log("Server started on port 3333");
});
