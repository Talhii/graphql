import express from "express";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import typeDefs from "../graphql/schemas";
import resolvers from "../graphql/resolvers";
import context from "../graphql/context";
import { applyMiddleware } from "graphql-middleware";
import { makeExecutableSchema } from "graphql-tools";
import Post from "../database/models/post";
import { rule, shield, and } from "graphql-shield";
const app = express();

app.use(cors());

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    const result = !!ctx.user;
    return result;
  },
);

const checkUser = rule({ cache: 'contextual' })(
  async (parent, { id }, ctx, info) => {

    const post = await Post.findByPk(id);

    if (post == null) {
      return false;
    }
    else {
      if (post.userId == ctx.user.id) {
        return true;
      }
      else {
        return false;
      }
    }
  },
);

// Permissions
const permissions = shield({
  Query: {
    getAllPosts: isAuthenticated,
    getSinglePost: isAuthenticated
  },
  Mutation: {
    createPost: isAuthenticated,
    deletePost: and(isAuthenticated, checkUser),
    updatePost: and(isAuthenticated, checkUser)
  },
});

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers
  }),
  permissions
);

const apolloServer = new ApolloServer({
  schema,
  context,
  introspection: true,
  playground: {
    settings: {
      'schema.polling.enable': false,
      'editor.fontSize': 18,
    },
  },
});

apolloServer.applyMiddleware({ app, path: '/api' });
const server = createServer(app);
export default server;
