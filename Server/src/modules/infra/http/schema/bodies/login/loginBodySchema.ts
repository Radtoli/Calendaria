import { Static, Type } from '@sinclair/typebox';

export const loginBodySchema = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String(),
});

export type LoginBodyType = Static<typeof loginBodySchema>;
