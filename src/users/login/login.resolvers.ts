import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      // find user with args.username

      const user = await client.user.findFirst({ where: { username } });

      if (!user) {
        return { ok: false, error: "User not found" };
      }

      // check password with args.password

      const passwordOk = await bcrypt.compare(password, user.password);

      if (!passwordOk) {
        return { ok: false, error: "Wrong Password" };
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });

      return { ok: true, token };
      // issue a token and send it to the user
    },
  },
};

export default resolvers;
