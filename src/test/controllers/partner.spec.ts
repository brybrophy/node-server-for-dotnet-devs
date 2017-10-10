import { assert } from 'chai';
import { PartnerController } from '../../webApi/controllers/Partner';
import { PartnerService } from '../../services/Partner';

describe('PartnerController', () => {
    let controller;

    beforeEach(() => {
        controller = new PartnerController(new PartnerService());
    });

    it('should get back all partners', done => {
        const data = controller.getPartners();

        assert.deepEqual(data, [
            {
                id: 1,
                name: 'Joe Auer',
                role: 'Partner 1',
                favoriteThing: 'Arrested Development'
            },
            {
                id: 2,
                name: 'Michael Meyers',
                role: 'Partner 2',
                favoriteThing: 'Fine Wine'
            }
        ]);
        done();
    });

    it('should get back correct partner', done => {
        const data = controller.getPartner({ params: { id: '1' } });

        assert.deepEqual(data, {
            id: 1,
            name: 'Joe Auer',
            role: 'Partner 1',
            favoriteThing: 'Arrested Development'
        });
        done();
    });

    it('should add a new partner', done => {
        const newPartner = {
            id: 3,
            name: 'Jim Kiely',
            role: 'Partner with thickest accent',
            favoriteThing: 'Snow Days'
        };

        const data = controller.newPartner({
            body: newPartner
        });

        assert.deepEqual(data, newPartner);
        done();
    });

    it('should update an existing partner', done => {
        const nextPartner = {
            id: '2',
            name: 'Michael "The Bavarian" Meyers',
            role: 'Partner 2',
            favoriteThing: 'Ein Prosit der Gemütlichkeit'
        };

        const data = controller.updatePartner({
            body: nextPartner,
            params: { id: 2 }
        });

        assert.deepEqual(data, nextPartner);
        done();
    });

    it('should delete an existing partner', done => {
        const data = controller.deletePartner({
            params: { id: 2 }
        });

        assert.strictEqual(data, 2);
        done();
    });
});
