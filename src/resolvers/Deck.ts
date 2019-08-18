/* tslint:disable */
import { objectType } from '@prisma/nexus';

export const Deck = objectType({
    name: 'Deck',
    definition(t: any) {
        t.model.id();
        t.model.title();
        t.model.list();
        t.model.altList();
        t.model.altCard();
        t.model.author();
        t.model.comments({ pagination: false });
    }
});
