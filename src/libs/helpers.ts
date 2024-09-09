import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { compare, hash } from 'bcryptjs';

export const generateJWTToken = (data: Object): string => {
    return sign(data, process.env.JWT_SECRET as string, { expiresIn: '12h' });
};

export const decodeJWTToken = (token: string): JwtPayload => {
    return verify(token, process.env.JWT_SECRET as string) as JwtPayload;
};

export const hashPassword = async (password: string): Promise<string> => {
    return hash(password, 12);
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return compare(password, hashedPassword);
};

export const extractToken = (event: any) => {
};