'use strict';

import { controller, httpGet, httpPost, httpPut, httpDelete, TYPE } from 'inversify-express-utils';
import { provideNamed, inject } from '../ioc/ioc';
import { PartnerService } from '../../services/Partner';
import { PartnerVM } from '../../viewModels/PartnerVM';
import { Request, Response, NextFunction } from 'express';
import TYPES from '../contants/types';
import TAGS from '../contants/tags';

// These decorators will register the controller as an injectable dependancy
// and make it's routes available to the express app.
@provideNamed(TYPE.Controller, TAGS.PartnerController)
@controller('/api/partners')
export class PartnerController {
    // Inject the partner service into the contoller.
    constructor(@inject(TYPES.PartnerService) private _partnerService: PartnerService) {}

    @httpGet('/')
    public getPartners(): Promise<PartnerVM[]> {
        // If this promise is resolved, it's return value will be sent in the http response.
        // If it is rejected, it will be passed into the error handling middleware in server.ts.
        return this._partnerService.getPartners();
    }

    @httpGet('/:id')
    public async getPartner(req: Request, res: Response, next: NextFunction) {
        // You can also use async/await and a try/catch block. This is useful if you need to set extra headers
        // or use methods like res.sendFile. Note: You will need to pass the error in the catch to next()
        // so that it makes it to the error handling middleware.
        try {
            const id: number = Number.parseInt(req.params.id);
            const response = await this._partnerService.getPartner(id);

            return res.send(response);
        } catch (err) {
            return next(err);
        }
    }

    @httpPost('/')
    public newPartner(req: Request): Promise<PartnerVM> {
        return this._partnerService.newPartner(req.body);
    }

    @httpPut('/:id')
    public updatePartner(req: Request): Promise<PartnerVM | string> {
        const id: number = Number.parseInt(req.params.id);

        return this._partnerService.updatePartner(id, req.body);
    }

    @httpDelete('/:id')
    public deletePartner(req: Request): Promise<string> {
        const id: number = Number.parseInt(req.params.id);

        return this._partnerService.deletePartner(id);
    }
}
