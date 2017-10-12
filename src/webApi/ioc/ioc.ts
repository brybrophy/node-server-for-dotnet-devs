'use strict';

import 'reflect-metadata';
import { Container, inject } from 'inversify';
import { autoProvide, makeProvideDecorator, makeFluentProvideDecorator } from 'inversify-binding-decorators';

const container = new Container();

const provide = makeProvideDecorator(container);

const fluentProvider = makeFluentProvideDecorator(container);

// Use this decorator for contollers to make them injectable
// and register their routes in the express router.
const provideNamed = function(identifier, name) {
    return fluentProvider(identifier)
        .whenTargetNamed(name)
        .done();
};

export { container, autoProvide, provide, provideNamed, inject };
