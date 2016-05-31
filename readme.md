### Setup:

Assumes a postgres db named `mobileListingSearch` exists
Assumes ngrok is installed and running - add host to passport service.
Assumes a SF connected app - add client and secret to passport service.


`npm install webpack webpack-dev-server bower knex -g`

`npm install`

`bower install`

`cd src/server/services/db && knex migrate:latest`

##ERD notes

USER
    Id
    Username
    Email
    PasswordHash

ORGANIZATION
    Id
    Name
    <insert sf fields here>

SF_USER
    Id
    Username
    Token

LISTING
    Id

LOCATION
    Id
    Lat
    Long
    Datum [Default: WGS 84]
    Source [Google, User, Custom, ect]

LOCATION_ADDRESS
    Id
    Location_ID
    Address_ID

ADDRESS
    Id
    <Fill in addres spec here>


PROPERTY
    Id
    Name
    Description

SPACE
    Id

SPACE_ADDRESS
    Id
    Space_Id
    Address_Id


MEDIA
    Id
    URI


Every SF_USER will have an ORGANIZATION.
Every ORGANIZATION will have zero or more SF_USER
Every USER can have zero or more ORGANIZATION
Every USER can have zero or more LISTING
Every LISTING has one or more PROPERTY
Every PROPERTY has one LOCATION
Every LISTING has zero or more MEDIA

