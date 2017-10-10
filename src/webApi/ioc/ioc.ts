import 'reflect-metadata';
import { Container, inject } from 'inversify';
import { autoProvide, makeProvideDecorator, makeFluentProvideDecorator } from 'inversify-binding-decorators';

const container = new Container();

const provide = makeProvideDecorator(container);
const fluentProvider = makeFluentProvideDecorator(container);

const provideNamed = function(identifier, name) {
    return fluentProvider(identifier)
        .whenTargetNamed(name)
        .done();
};

export { container, autoProvide, provide, provideNamed, inject };
