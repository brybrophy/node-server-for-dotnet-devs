import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { provide } from '../../webApi/ioc/ioc';
import TYPES from '../../webApi/contants/types';

/*
This is the single source of truth for the partner entity.

When the app is bootstraped, if the table doesn't already exist,
a new table will be created in the database.

If the table does exist, it will be updated with any changes made here.

It is also used as a type reference throughout the app.
*/

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
