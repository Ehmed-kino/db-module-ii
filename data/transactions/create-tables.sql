BEGIN TRANSACTION;

CREATE TABLE Service (
    Id INTEGER PRIMARY KEY,
    Name VARCHAR(255)
);

CREATE TABLE Role (
    Id INTEGER,
    Name VARCHAR(255)
);

CREATE TABLE User (
    Id INTEGER PRIMARY KEY,
    Name VARCHAR(255),
    Email TEXT,
    UserRoleId INTEGER,
    FOREIGN KEY(UserRoleId) REFERENCES Role(Id)
);

CREATE TABLE Organisation (
    ContactUserOrganisationId INTEGER,
    Name VARCHAR(255),
    Address TEXT,
    Borough VARCHAR(255),
    Telephone VARCHAR(15),
    Id INTEGER PRIMARY KEY,
    OrganisationServicesId INTEGER
);

CREATE TABLE ContactUserOrganisation (
    UserId INTEGER,
    OrganisationId INTEGER,
    PRIMARY KEY(UserId, OrganisationId),
    FOREIGN KEY(UserId) REFERENCES User(Id),
    FOREIGN KEY(OrganisationId) REFERENCES Organisation(Id)
);

CREATE TABLE OrganisationService (
    OrganisationId INTEGER,
    ServiceId INTEGER,
    PRIMARY KEY(OrganisationId, ServiceId),
    FOREIGN KEY(OrganisationId) REFERENCES Organisation(Id),
    FOREIGN KEY(ServiceId) REFERENCES ServiceId(Id)
);

COMMIT;
