import { gql } from "apollo-server-express";

export default gql`

 type User {
     id: Int!
     firstName: String!
     lastName: String!
     email: String!
     password: String!
     isVerified: Boolean!
     code: Int!
     posts: [Post!]
 }


 extend type Mutation {
     register(input: RegisterInput!): RegisterResponse
     login(input: LoginInput!): LoginResponse
     delete(id: Int!) : String
     verify(email: String!, code: Int! ): String
 }

 type RegisterResponse {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
 }

 input RegisterInput {
     firstName: String!
     lastName: String!
     email: String!
     password: String!
 }

 input LoginInput {
     email: String!
     password: String!
 }

 type LoginResponse {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    token: String!
 }
`;
