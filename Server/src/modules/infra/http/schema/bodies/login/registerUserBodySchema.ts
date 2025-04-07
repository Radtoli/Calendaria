import { Static, Type } from '@sinclair/typebox';

export const registerUserBodySchema = Type.Object({
  email: Type.String(),
  password: Type.String(),
  prd_number: Type.Number(),
  prd_name: Type.String(),
  prd_adress: Type.Object({
    street: Type.String(),
    number: Type.String(),
    city: Type.String(),
    state: Type.String(),
    zip_code: Type.String(),
  }),
});

export type RegisterUserBodyType = Static<typeof registerUserBodySchema>;
