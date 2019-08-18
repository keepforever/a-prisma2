import { objectType } from 'nexus';

export const RefreshToken = objectType({
    name: 'RefreshToken',
    definition(t) {
        t.string('token');
        t.string('userId');
    }
});
