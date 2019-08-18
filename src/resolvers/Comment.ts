/* tslint:disable */
import { objectType } from '@prisma/nexus';

export const Comment = objectType({
    name: 'Comment',
    definition(t: any) {
        t.model.id();
        t.model.content();
        t.model.author();
        t.model.deck();
    }
});
