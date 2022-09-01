import { gql } from "apollo-server-express";

export default gql`

 type Post {
     id: Int!
     title: String!
     description: String!
     author: User!
     createdAt: String

 }

extend type Query {
    getAllPosts: [Post!]
    getSinglePost(postId: Int!): Post
}
 extend type Mutation {
     createPost(title: String!, description: String!): CreatePostResponse
     updatePost(id: Int!,title: String! , description: String!) : String
     deletePost(id: Int!): String
 }

 type CreatePostResponse {
    id: Int!
    title: String!
    description: String!
    createdAt: String!
 }

`;
