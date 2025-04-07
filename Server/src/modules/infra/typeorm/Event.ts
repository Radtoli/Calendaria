import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { EventType } from '../../../shared/enums/EventType';

@Entity('priory_events')
export class PrioryEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Index()
  @Column({ type: 'enum', enum: EventType, default: EventType.CONVOCACAO })
  type: EventType;

  @Column()
  horario: Date;

  @Column({ type: 'varchar', length: 255, nullable: false })
  local: string;

  @ManyToOne(() => User, user => user.events, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
