"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = __importDefault(require("../../client"));
exports.default = {
    Mutation: {
        createAccount: async (_, { firstName, lastName, username, email, password }) => {
            // check if username or email are already on DB
            try {
                const existingUser = await client_1.default.user.findFirst({
                    where: {
                        OR: [{ username }, { email }],
                    },
                });
                if (existingUser) {
                    throw new Error("This username/password is already taken.");
                }
                // hash password
                const hashedPassword = await bcrypt_1.default.hash(password, 10);
                // save and return the user
                return client_1.default.user.create({
                    data: {
                        username,
                        email,
                        firstName,
                        lastName,
                        password: hashedPassword,
                    },
                });
            }
            catch (e) {
                return e;
            }
        },
    },
};
