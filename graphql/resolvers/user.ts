import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import middleware from "../../middleware/sendEmail";
import { AuthenticationError, UserInputError } from "apollo-server-express";
import User from "../../database/models/user";
import Post from "../../database/models/post";

export default {
  Mutation: {
    async register(root: any, args: any, context: any) {

      var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

      const { firstName, lastName, email, password } = args.input;
      if (!email) {
        return new UserInputError("Invalid Email")
      }
      else if (email.length > 254) {
        return new UserInputError("Invalid Email")

      }
      else {
        var valid = emailRegex.test(email);
        if (!valid) {
          return new UserInputError("Invalid Email")
        }
        else {

          const isVerified = false
          const code = Math.floor(Math.random() * (999999 - 111111) + 111111)

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          const user = await User.findOne({ where: { email: email } })

          if (user) {
            return new AuthenticationError('User Already Registerd');
          }
          else {
            await middleware.sendEmail(email)
            return await User.create({ firstName, lastName, email, password: hashedPassword, isVerified, code });

          }
        }
      }
    },

    async login(root: any, { input }: any, context: any) {
      const { email, password } = input;
      const user = await User.findOne({ where: { email } });

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, 'mySecret');
        return { ...user.toJSON(), token };
      }
      return new AuthenticationError('Invalid credentials');
    },

    async delete(_: any, { id }: any) {

      await Post.destroy({ where: { userId: id } });
      await User.destroy({ where: { id: id } });
      return "User Deleted Successfully";
    },

    async verify(_: any, { email, code }: any) {

      const user = await User.findOne({ where: { email: email } });

      if (user.code == code) {

        await User.update({isVerified:true},{where: {email:email}})
        return "User Verified Successfully";
      }
      else{
        return "User not verified";
      }
    },
  },
};
