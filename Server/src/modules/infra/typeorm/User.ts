import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PrioryEvent } from './Event';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Index({ unique: true })
  @Column()
  prd_number: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  prd_name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  prd_adress_street: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  prd_adress_number: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  prd_adress_city: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  prd_adress_state: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  prd_adress_zip_code: string;

  @Column({ type: 'boolean', default: false })
  is_admin: boolean;

  @OneToMany(() => PrioryEvent, event => event.user)
  events: Event[];
}
