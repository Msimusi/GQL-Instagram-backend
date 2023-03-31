"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../client"));
exports.default = {
    Query: {
        users: () => client_1.default.user.findMany(),
        seeProfile: (_, { username }) => client_1.default.user.findUnique({ where: { username } }),
    },
};
