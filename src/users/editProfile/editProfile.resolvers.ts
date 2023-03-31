import { Resolvers } from "../../types";
import { protectResolver } from "./../users.utils";
import bcrypt from "bcrypt";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectResolver(
      async (
        _,
        { firstName, lastName, username, email, password: newPassword, bio },
        { loggedInUser, client }
      ) => {
        let hashedPassword = null;

        if (newPassword) {
          hashedPassword = await bcrypt.hash(newPassword, 10);
        }

        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            firstName,
            lastName,
            username,
            email,
            bio,
            ...(hashedPassword && { password: hashedPassword }),
          },
        });

        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update Profile",
          };
        }
      }
    ),
  },
};

export default resolvers;
