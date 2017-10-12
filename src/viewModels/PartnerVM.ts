'use strict';

// This view model is based on information that is expected
// by a hypothetical front end. It will be used in the service
// layer to reconcile the result from the database query with
// the data expected in the view.
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
