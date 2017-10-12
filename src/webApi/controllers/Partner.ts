'use strict';

import { controller, httpGet, httpPost, httpPut, httpDelete, TYPE } from 'inversify-express-utils';
import { provideNamed, inject } from '../ioc/ioc';
import { PartnerService } from '../../services/Partner';
import { PartnerVM } from '../../viewModels/PartnerVM';
import { Request } from 'express';
import TYPES from '../contants/types';
import TAGS from '../contants/tags';

@provideNamed(TYPE.Controller, TAGS.PartnerController)
@controller('/api/partners')
export class PartnerController {
    constructor(@inject(TYPES.PartnerService) private _partnerService: PartnerService) {}

    @httpGet('/')
    public getPartners(): Promise<PartnerVM[]> {
        return this._partnerService.getPartners();
    }

    @httpGet('/:id')
    public getPartner(request: Request): Promise<PartnerVM | {}> {
        const id: number = Number.parseInt(request.params.id);

        return this._partnerService.getPartner(id);
    }

    @httpPost('/')
    public newPartner(request: Request): Promise<PartnerVM> {
        return this._partnerService.newPartner(request.body);
    }

    @httpPut('/:id')
    public updatePartner(request: Request): Promise<PartnerVM | string> {
        const id: number = Number.parseInt(request.params.id);

        return this._partnerService.updatePartner(id, request.body);
    }

    @httpDelete('/:id')
    public deletePartner(request: Request): Promise<string> {
        const id: number = Number.parseInt(request.params.id);

        return this._partnerService.deletePartner(id);
    }
}
