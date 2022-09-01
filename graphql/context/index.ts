import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";
import User from "../../database/models/user";

const verifyToken = async (token:any) => {
  try {
    if (!token) return null;
    const { id }:any = await jwt.verify(token, 'mySecret');
    const user = await User.findByPk(id);
    return user;
  } catch (error:any) {
    throw new AuthenticationError(error.message);
  }
};

export default async ({ req }:any) => {
  const token = (req.headers && req.headers.authorization) || '';
  const user = await verifyToken(token)
  return { user };
};
