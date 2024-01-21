import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from './Property';
import { User } from './User';

@Entity()
export class RentalApplication extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column()
  // foreign key to user
  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Property)
  property: Property;

  @Column('text')
  motivationText: string;

  @Column()
  idCardPath: string;

  @Column()
  proofOfAddressPath: string;

  @Column({
    enum: ['pending', 'accepted', 'refused'],
    type: 'enum',
  })
  state: 'pending' | 'accepted' | 'refused';
}

export type RentalApplicationType = Omit<RentalApplication, keyof BaseEntity>;
