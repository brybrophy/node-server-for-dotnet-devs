import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { provide } from '../../webApi/ioc/ioc';
import TYPES from '../../webApi/contants/types';

@Entity('partners', { orderBy: { id: 'ASC' } })
@provide(TYPES.IPartner)
export class IPartner {
    @PrimaryGeneratedColumn()
    @Index()
    id: number;

    @Column() name: string;

    @Column() role: string;

    @Column({ name: 'favorite_thing' })
    favoriteThing: string;
}
