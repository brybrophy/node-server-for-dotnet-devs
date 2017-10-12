# This is a starter for building web API's with typescript and express.

It uses TypeScript, Inversion of Control, and Dependency Injection patterns to mimic the experience of building an API using C# and .NET.

Documentation is in progress, but every file should have comments to help explain everything.


### To get started:

- Clone the repo.
- Run `yarn install`.
- Run `initdb pg`.
- Run `Postgres -D pg` to start the db, then open a new tab in your terminal.
- Run `createdb highseas`.
- Run `createdb highseas_test`.
- Run `echo "DATABASE_URL=postgres://localhost:5432/highseas" > .env`.

### To start the app in development:

- Run `npm run start:dev`.

### To run the automated tests:

- Run `npm run test:all`.

### To manually test the app:

Because of the CSRF protection setup in the server, you must set `Content-Type: application/json` in the request headers. Otherwise, you will get a `406 not acceptable` error. You can do this by using Postman to manually test the endpoints.
