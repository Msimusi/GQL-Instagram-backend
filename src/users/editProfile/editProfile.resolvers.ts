import { uploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "./../users.utils";
import bcrypt from "bcrypt";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";

const resolvers: Resolvers = {
  Upload: {
    default: graphqlUploadExpress,
  },
  Mutation: {
    editProfile: protectResolver(
      async (
        _,
        {
          firstName,
          lastName,
          username,
          email,
          password: newPassword,
          bio,
          avatar, // avatar의 Data구조가 강의와 다름. Promise가 포함된 더 큰 object임 이유 불명.
        },
        { loggedInUser, client }
      ) => {
        let avatarUrl = null;

        if (avatar) {
          console.log(1);
          avatarUrl = await uploadToS3(
            avatar.promise,
            loggedInUser.id,
            "avatars"
          );
        }

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
            ...(avatarUrl && { avatar: avatarUrl }),
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
