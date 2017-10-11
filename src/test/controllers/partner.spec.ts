import { assert } from 'chai';
import { Connection, createConnection } from 'typeorm';
import { PartnerController } from '../../webApi/controllers/Partner';
import { PartnerService } from '../../services/Partner';
import { PartnerRepository } from '../../db/repositories/Partner';

describe('PartnerController', () => {
    let controller;
    let connection: Connection;

    before(async () => {
        connection = await createConnection();
        controller = await new PartnerController(new PartnerService(new PartnerRepository()));
    });

    after(() => {
        connection.close();
    });

    it('should get back all partners', done => {
        controller.getPartners().then(data => {
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
    });

    it('should get back correct partner', done => {
        controller.getPartner({ params: { id: '1' } }).then(data => {
            assert.deepEqual(data, {
                id: 1,
                name: 'Joe Auer',
                role: 'Partner 1',
                favoriteThing: 'Arrested Development'
            });

            done();
        });
    });

    it('should get back empty object when no partner can be found', done => {
        controller.getPartner({ params: { id: '100' } }).then(data => {
            assert.deepEqual(data, {});

            done();
        });
    });

    it('should add a new partner', done => {
        const newPartner = {
            id: 3,
            name: 'Jim Kiely',
            role: 'Partner with thickest accent',
            favoriteThing: 'Snow Days'
        };

        controller
            .newPartner({
                body: newPartner
            })
            .then(data => {
                assert.deepEqual(data, newPartner);

                done();
            });
    });

    it('should update an existing partner', done => {
        const nextPartner = {
            id: 2,
            name: 'Michael "The Bavarian" Meyers',
            role: 'Partner 2',
            favoriteThing: 'Ein Prosit der Gemütlichkeit'
        };

        controller
            .updatePartner({
                body: nextPartner,
                params: { id: 2 }
            })
            .then(data => {
                assert.deepEqual(data, nextPartner);

                done();
            });
    });

    it('should get back message when no partner can be updated', done => {
        controller.updatePartner({ params: { id: '100' } }).then(data => {
            assert.strictEqual(data, 'Partner does not exist, and therefore could not be updated.');

            done();
        });
    });

    it('should delete an existing partner', done => {
        controller
            .deletePartner({
                params: { id: 3 }
            })
            .then(data => {
                assert.strictEqual(data, 'Partner Successfully Removed');

                done();
            });
    });

    it('should get back message when no partner can be deleted', done => {
        controller.deletePartner({ params: { id: '100' } }).then(data => {
            assert.strictEqual(data, 'Partner does not exist, and therefore could not be removed.');

            done();
        });
    });
});
