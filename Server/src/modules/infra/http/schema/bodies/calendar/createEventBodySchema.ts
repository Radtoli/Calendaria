import { Static, Type } from '@sinclair/typebox';
import { EventType } from '../../../../../../shared/enums/EventType';

export const createEventBodySchema = Type.Object({
  event_details: Type.Array(
    Type.Object({
      type: Type.Enum(EventType),
      horario: Type.String({ format: 'date-time' }),
      local: Type.String(),
    }),
  ),
  prd_number: Type.Number(),
});

export type CreateEventBodyType = Static<typeof createEventBodySchema>;
