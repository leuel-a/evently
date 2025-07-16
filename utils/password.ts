import {genSalt, hash} from 'bcrypt';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
    try {
        const salt = await genSalt(SALT_ROUNDS);
        const hashedPassword = await hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error(`Error hashing password: ${error}`);
        throw new Error('Failed to has password');
    }
}

export async function validatePassword(passwordHash: string, candidate: string) {
    try {
    } catch (error) {}
}
