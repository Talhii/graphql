import Post from "../../database/models/post";
import User from "../../database/models/user";



export default {
  Mutation: {
    async createPost(_:any, { description, title }:any,  {user = null}:any ) {
      
      return await Post.create({
        userId: user.id,
        description,
        title,
      });
    },


    async updatePost(_:any, { id, description, title }:any) {

      await Post.update({
        description,
        title,
      }, { where: { id: id } });

      return "Post Updated Successfully"
    },
    async deletePost(_:any, { id }:any) {
      await Post.destroy({ where: { id: id } });
      return "Post Deleted Successfully"
    },
  },

  Query: {
    async getAllPosts(root:any, args:any, context:any) {
      return Post.findAll();
    },
    async getSinglePost(_:any, { postId }:any, context:any) {
      return Post.findByPk(postId);
    },
  },

  Post: {
    author(post:any) {
      return User.findByPk(post.userId);
    },
  },
};
