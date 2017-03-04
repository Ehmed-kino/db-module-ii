BEGIN TRANSACTION;

CREATE TABLE Service (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(255)
);

CREATE TABLE Role (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(255)
);

CREATE TABLE User (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(255),
    Email TEXT,
    UserRoleId INTEGER,
    FOREIGN KEY(UserRoleId) REFERENCES Role(Id)
);

CREATE TABLE Organisation (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(255),
    Address TEXT,
    City VARCHAR(255),
    PostCode VARCHAR(8),
    Telephone VARCHAR(15)
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
    FOREIGN KEY(ServiceId) REFERENCES Service(Id)
);

COMMIT;
