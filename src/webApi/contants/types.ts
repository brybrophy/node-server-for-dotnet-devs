'use strict';

// Add symbols for each injectable class to be used as type identifiers at runtime.
const TYPES = {
    PartnerService: Symbol('PartnerService'),
    PartnerRepository: Symbol('PartnerRepository'),
    IPartner: Symbol('IPartner')
};

export default TYPES;
