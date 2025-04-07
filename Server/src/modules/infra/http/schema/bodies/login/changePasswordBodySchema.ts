import { Static, Type } from '@sinclair/typebox';

export const changePasswordBodySchema = Type.Object({
  new_password: Type.String(),
  prd_number: Type.Number(),
});

export type ChangePasswordBodyType = Static<typeof changePasswordBodySchema>;
