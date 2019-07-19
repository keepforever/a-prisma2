/* tslint:disable */
import { objectType } from '@prisma/nexus'

export const Post = objectType({
  name: 'Post',
  definition(t: any) {
    t.model.id()
    t.model.title()
    t.model.published()
    t.model.author()
    t.model.isGood()
  },
})
