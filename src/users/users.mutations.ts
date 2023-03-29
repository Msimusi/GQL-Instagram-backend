import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      // check if username or email are already on DB

      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });
        if (existingUser) {
          throw new Error("This username/password is already taken.");
        }

        // hash password

        const hashedPassword: string = await bcrypt.hash(password, 10);

        // save and return the user
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: hashedPassword,
          },
        });
      } catch (e) {
        return e;
      }
    },
    login: async (_, { username, password }) => {
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
        expiresIn: "1h",
      });

      console.log(token);

      return { ok: true, token };
      // issue a token and send it to the user
    },
  },
};
