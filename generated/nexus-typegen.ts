/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */

import * as ctx from "../src/types"
import * as photon from "@generated/photon"
import { core } from "nexus"

declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  AuthPayload: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Comment: photon.Comment;
  Deck: photon.Deck;
  Mutation: {};
  Query: {};
  RefreshToken: { // root type
    token: string; // String!
    userId: string; // String!
  }
  User: photon.User;
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
}

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Comment: { // field return type
    author: NexusGenRootTypes['User'] | null; // User
    content: string | null; // String
    deck: NexusGenRootTypes['Deck'] | null; // Deck
    id: string; // ID!
  }
  Deck: { // field return type
    altCard: string | null; // String
    altList: string | null; // String
    author: NexusGenRootTypes['User'] | null; // User
    comments: NexusGenRootTypes['Comment'][] | null; // [Comment!]
    id: string; // ID!
    list: string | null; // String
    sideBoardList: string | null; // String
    title: string | null; // String
  }
  Mutation: { // field return type
    createDeck: NexusGenRootTypes['Deck']; // Deck!
    deckAltCard: NexusGenRootTypes['Deck']; // Deck!
    deckAltList: NexusGenRootTypes['Deck']; // Deck!
    login: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    refreshToken: NexusGenRootTypes['RefreshToken']; // RefreshToken!
    signup: NexusGenRootTypes['AuthPayload']; // AuthPayload!
  }
  Query: { // field return type
    deckConnection: NexusGenRootTypes['Deck'][]; // [Deck!]!
    feedDecks: NexusGenRootTypes['Deck'][]; // [Deck!]!
    feedUsers: NexusGenRootTypes['User'][]; // [User!]!
    me: NexusGenRootTypes['User']; // User!
    overComplexMe: NexusGenRootTypes['User']; // User!
    singleDeck: NexusGenRootTypes['Deck'] | null; // Deck
  }
  RefreshToken: { // field return type
    token: string; // String!
    userId: string; // String!
  }
  User: { // field return type
    arenaHandle: string | null; // String
    decks: NexusGenRootTypes['Deck'][] | null; // [Deck!]
    email: string; // String!
    id: string; // ID!
    isAdmin: boolean; // Boolean!
    name: string | null; // String
    password: string; // String!
  }
}

export interface NexusGenArgTypes {
  Deck: {
    comments: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
  Mutation: {
    createDeck: { // args
      list?: string | null; // String
      sideBoardList?: string | null; // String
      title?: string | null; // String
    }
    deckAltCard: { // args
      altCard?: string | null; // String
      id?: string | null; // ID
    }
    deckAltList: { // args
      altList?: string | null; // String
      id?: string | null; // ID
    }
    login: { // args
      email?: string | null; // String
      password?: string | null; // String
    }
    refreshToken: { // args
      list?: string | null; // String
      title?: string | null; // String
      token?: string | null; // String
    }
    signup: { // args
      arenaHandle?: string | null; // String
      email?: string | null; // String
      isAdmin?: boolean | null; // Boolean
      name?: string | null; // String
      password?: string | null; // String
    }
  }
  Query: {
    deckConnection: { // args
      first?: number | null; // Int
      last?: string | null; // String
    }
    singleDeck: { // args
      id?: string | null; // ID
    }
  }
  User: {
    decks: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "AuthPayload" | "Comment" | "Deck" | "Mutation" | "Query" | "RefreshToken" | "User";

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: ctx.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}