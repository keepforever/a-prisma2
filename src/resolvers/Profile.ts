/* tslint:disable */
import { objectType } from '@prisma/nexus'

export const Profile = objectType({
  name: 'Profile',
  definition(t: any) {
    t.model.id()
    t.model.description()
    t.model.isVerified()
    t.model.author()
  },
})
