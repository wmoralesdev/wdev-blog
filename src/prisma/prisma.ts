import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient;

// @ts-ignore
// eslint-disable-next-line no-extend-native
BigInt.prototype.toJSON = function toJSON(): string {
    return this.toString();
};

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }

    prisma = global.prisma;
}

export default prisma;
