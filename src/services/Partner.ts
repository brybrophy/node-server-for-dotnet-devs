'use strict';

import { provide } from '../webApi/ioc/ioc';
import TYPES from '../webApi/contants/types';
import { PartnerRepository } from '../db/repositories/Partner';
import { IPartner } from '../domain/entities/Partner';
import { PartnerVM } from '../viewModels/PartnerVM';

@provide(TYPES.PartnerService)
export class PartnerService {
    private partnerRepository = new PartnerRepository();

    public async getPartners(): Promise<PartnerVM[]> {
        const result: IPartner[] = await this.partnerRepository.getPartners();

        const partners: PartnerVM[] = result.map(partner => {
            return new PartnerVM({
                id: partner.id,
                name: partner.name,
                role: partner.role,
                favoriteThing: partner.favoriteThing
            });
        });

        return partners;
    }

    public async getPartner(id: number) {
        const result: IPartner = await this.partnerRepository.getPartner(id);

        if (!result) {
            return result;
        }

        const partner = new PartnerVM({
            id: result.id,
            name: result.name,
            role: result.role,
            favoriteThing: result.favoriteThing
        });

        return partner;
    }

    public async newPartner(newPartner: PartnerVM) {
        const result: IPartner = await this.partnerRepository.createPartner(newPartner);

        const partner = new PartnerVM({
            id: result.id,
            name: result.name,
            role: result.role,
            favoriteThing: result.favoriteThing
        });

        return partner;
    }

    public async updatePartner(id: number, nextPartner: PartnerVM): Promise<IPartner | string> {
        const result: IPartner | string = await this.partnerRepository.updatePartner(id, nextPartner);

        if (typeof result === 'string') {
            return result;
        }

        const partner = new PartnerVM({
            id: result.id,
            name: result.name,
            role: result.role,
            favoriteThing: result.favoriteThing
        });

        return partner;
    }

    public async deletePartner(id: number) {
        const successMessage: string = await this.partnerRepository.deletePartner(id);

        return successMessage;
    }
}
