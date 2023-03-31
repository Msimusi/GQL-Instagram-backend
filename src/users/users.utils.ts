import jwt from "jsonwebtoken";
import client from "../client";
import { Resolver } from "../types";

export const getUser = async (token: any) => {
  try {
    if (!token) {
      return null;
    }

    const { id } = (await jwt.verify(token, process.env.SECRET_KEY)) as {
      id: number;
    };

    const user = await client.user.findUnique({ where: { id } });

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const protectResolver =
  (ourResolver: Resolver): Resolver =>
  (root, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please Log in to perform this action.",
      };
    }
    return ourResolver(root, args, context, info);
  };
