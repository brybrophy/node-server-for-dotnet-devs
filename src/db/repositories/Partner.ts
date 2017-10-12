'use strict';

import { getManager } from 'typeorm';
import { IPartner } from '../../domain/entities/Partner';
import { provide } from '../../webApi/ioc/ioc';
import TYPES from '../../webApi/contants/types';

// This decorator will register the repository as an injectable dependancy.
@provide(TYPES.PartnerRepository)
export class PartnerRepository {
    // Get the repository for the provided entity from the orm. The repository
    // contains all of the orm methods for that entity.
    // Methods can be found at https://github.com/typeorm/typeorm/blob/master/docs/repository-api.md
    private _partnerRepository = getManager().getRepository(IPartner);

    public async getPartners(): Promise<IPartner[]> {
        const partners: IPartner[] = await this._partnerRepository.find();

        return partners;
    }

    public async getPartner(id: number): Promise<IPartner> {
        const partner: IPartner = await this._partnerRepository.findOneById(id);

        return partner;
    }

    public async createPartner(newPartner: IPartner): Promise<IPartner> {
        const partner: IPartner = await this._partnerRepository.save(newPartner);

        return partner;
    }

    public async updatePartner(id: number, nextPartner: IPartner): Promise<IPartner | string> {
        const partnerToUpdate: IPartner = await this._partnerRepository.findOneById(id);

        if (!partnerToUpdate) {
            const message: string = 'Partner does not exist, and therefore could not be updated.';

            return message;
        }

        partnerToUpdate.name = nextPartner.name;
        partnerToUpdate.role = nextPartner.role;
        partnerToUpdate.favoriteThing = nextPartner.favoriteThing;

        const partner: IPartner = await this._partnerRepository.save(partnerToUpdate);

        return partner;
    }

    public async deletePartner(id: number): Promise<string> {
        const partnerToRemove: IPartner = await this._partnerRepository.findOneById(id);
        let message: string;

        if (!partnerToRemove) {
            message = 'Partner does not exist, and therefore could not be removed.';

            return message;
        }

        await this._partnerRepository.remove(partnerToRemove);
        message = 'Partner Successfully Removed';

        return message;
    }
}
