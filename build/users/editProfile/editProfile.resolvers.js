"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = __importDefault(require("../../client"));
exports.default = {
    Mutation: {
        editProfile: async (_, { firstName, lastName, username, email, password: newPassword, token }) => {
            const verifiedToken = await jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            console.log(token);
            let hashedPassword = null;
            if (newPassword) {
                hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
            }
            const updatedUser = await client_1.default.user.update({
                where: { id: 1 },
                data: {
                    firstName,
                    lastName,
                    username,
                    email,
                    ...(hashedPassword && { password: hashedPassword }),
                },
            });
            if (updatedUser.id) {
                return {
                    ok: true,
                };
            }
            else {
                return {
                    ok: false,
                    error: "Could not update Profile",
                };
            }
        },
    },
};
