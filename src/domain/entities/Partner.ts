import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('partners', { orderBy: { id: 'ASC' } })
export class IPartner {
    @PrimaryGeneratedColumn()
    @Index()
    id: number;

    @Column() name: string;

    @Column() role: string;

    @Column({ name: 'favorite_thing' })
    favoriteThing: string;
}
