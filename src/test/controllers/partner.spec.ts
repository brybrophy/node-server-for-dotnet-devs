import { assert } from 'chai';
import { Connection, createConnection } from 'typeorm';
import { PartnerController } from '../../webApi/controllers/Partner';
import { PartnerService } from '../../services/Partner';
import { PartnerRepository } from '../../db/repositories/Partner';

describe('PartnerController', () => {
    let controller;
    let connection: Connection;

    before(async () => {
        // Create an orm connection.
        connection = await createConnection();

        // Create a controller and inject the required dependancies.
        controller = await new PartnerController(new PartnerService(new PartnerRepository()));
    });

    after(() => {
        // Close the orm connection.
        connection.close();
    });

    it('should get back all partners', async () => {
        const data = await controller.getPartners();

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
    });

    it('should get back correct partner', async () => {
        const data = await controller.getPartner({ params: { id: '1' } });

        assert.deepEqual(data, {
            id: 1,
            name: 'Joe Auer',
            role: 'Partner 1',
            favoriteThing: 'Arrested Development'
        });
    });

    it('should get back empty object when no partner can be found', async () => {
        const data = await controller.getPartner({ params: { id: '100' } });

        assert.deepEqual(data, {});
    });

    it('should add a new partner', async () => {
        const newPartner = {
            id: 3,
            name: 'Jim Kiely',
            role: 'Partner with thickest accent',
            favoriteThing: 'Snow Days'
        };

        const data = await controller.newPartner({
            body: newPartner
        });

        assert.deepEqual(data, newPartner);
    });

    it('should update an existing partner', async () => {
        const nextPartner = {
            id: 2,
            name: 'Michael "The Bavarian" Meyers',
            role: 'Partner 2',
            favoriteThing: 'Ein Prosit der Gemütlichkeit'
        };

        const data = await controller.updatePartner({
            body: nextPartner,
            params: { id: 2 }
        });

        assert.deepEqual(data, nextPartner);
    });

    it('should get back message when no partner can be updated', async () => {
        const data = await controller.updatePartner({ params: { id: '100' } });

        assert.strictEqual(data, 'Partner does not exist, and therefore could not be updated.');
    });

    it('should delete an existing partner', async () => {
        const data = await controller.deletePartner({
            params: { id: 3 }
        });

        assert.strictEqual(data, 'Partner Successfully Removed');
    });

    it('should get back message when no partner can be deleted', async () => {
        const data = await controller.deletePartner({ params: { id: '100' } });

        assert.strictEqual(data, 'Partner does not exist, and therefore could not be removed.');
    });
});
