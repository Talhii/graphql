import { gql } from "apollo-server-express";
import userType from "./user";
import postType from "./post";

const rootType = gql`
 type Query {
     root: String
 }
 type Mutation {
     root: String
 }

`;

export default [rootType, userType, postType];