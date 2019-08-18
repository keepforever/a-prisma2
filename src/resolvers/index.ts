import { AuthPayload } from './AuthPayload';
import { Mutation } from './Mutation';
import { Deck } from './Deck';
import { Query } from './Query';
import { User } from './User';
import { Comment } from './Comment';
import { RefreshToken } from './RefreshToken';

export const resolvers = {
    Query,
    Mutation,
    AuthPayload,
    RefreshToken,
    User,
    Deck,
    Comment
};
