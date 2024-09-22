import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";

const init = async () => {
  const app = express();
  app.use(bodyParser.json());

  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query{
        user:String
        say(name: String): String
        }
    `,
    resolvers: {
      Query: {
        user: () => `Hey ther, I am a graphql server`,
        say: (_, { name }: { name: string }) => `Hey ${name}, How are you?`,
      },
    },
  });

  await gqlServer.start();
  app.use("/graphql", expressMiddleware(gqlServer));
  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });

  app.listen(8000, () => {
    console.log("Server is Up at 8000!!!");
  });
};

init();
