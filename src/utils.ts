import { verify, sign } from 'jsonwebtoken';
import { Context } from './types';

export const APP_SECRET = 'appsecret321';

interface Token {
    userId: string;
}

export function getUserId(context: Context) {
    const Authorization = context.request.get('Authorization');
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const verifiedToken = verify(token, APP_SECRET) as Token;
        return verifiedToken && verifiedToken.userId;
    }
}

export function getUserIdWithoutAuthHeaders(token: string) {
    const verifiedToken = verify(token, APP_SECRET) as Token;
    console.log('token = ', token, '\n', 'verifiedToken =', verifiedToken);
    return verifiedToken && verifiedToken.userId;
}

export function createToken(userId: string) {
    return sign({ userId, expiresIn: '7d' }, APP_SECRET);
}

export function myExploreContextFunction(context: Context) {
    const Authorization = context.request.get('Authorization');
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        console.log('\n', `myExploreContextFunction has run `, '\n');
        console.log('\n', '\n', `token = `, token, '\n', '\n');
        return true;
    }
}
