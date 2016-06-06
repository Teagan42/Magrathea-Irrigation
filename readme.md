### Setup:

Assumes a postgres db named `mobileListingSearch` exists
Assumes ngrok is installed and running - add host to passport service.
Assumes a SF connected app - add client and secret to passport service.


`npm install webpack webpack-dev-server bower knex -g`

`npm install`

`bower install`

`cd src/server/services/db && knex migrate:latest`
