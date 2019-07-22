/* tslint:disable */
import { objectType } from '@prisma/nexus'

export const User = objectType({
  name: 'User',
  definition(t: any) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.arenaHandle()
    t.model.password()
    t.model.isAdmin()
    t.model.decks({ pagination: false })
  },
})
