'use strict';

export class PartnerVM {
    id: number;
    name: string;
    role: string;
    favoriteThing: string;

    constructor({ id, name, role, favoriteThing }) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.favoriteThing = favoriteThing;
    }
}
