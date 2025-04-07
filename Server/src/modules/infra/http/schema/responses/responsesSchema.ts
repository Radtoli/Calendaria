import { Type } from '@sinclair/typebox';

export const responsesSchema = {
  400: Type.Object({
    message: Type.String(),
  }),
  201: Type.Object({
    message: Type.String(),
  }),
};
