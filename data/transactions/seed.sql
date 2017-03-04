BEGIN TRANSACTION;

INSERT INTO Service(Id, Name)
VALUES
    (1, 'Immigration'),
    (2, 'Discrimination'),
    (3, 'Housing'),
    (4, 'Employment');

INSERT INTO Role(Id, Name)
VALUES
    (1, 'Admin'),
    (2, 'Contact');

INSERT INTO User(Id, Name, Email, UserRoleId)
VALUES
    (1, 'Joe Bloggs', 'joe@bloggs.com', 1),
    (2, 'John Doe', 'johndoe@email.com', 2),
    (3, 'Ola Nordmann', 'ola@email.com', 2),
    (4, 'Greg Fred', 'greg@fred.com', 2);

INSERT INTO Organisation(Id, Name, Address, City, PostCode, Telephone)
VALUES
    (
        1,
        'Amnesty International',
        '17-25 New Inn Yard',
        'London',
        'EC2A 3EA',
        '020 7033 1500'
    ),

    (
        2,
        'Refugee Council',
        'PO Box 68614',
        'London',
        'E15 9DQ',
        '020 7346 6700'
    ),

    (
        3,
        'Refugee Action',
        '11 Belgrave Road',
        'London',
        'SW1V 1RB',
        '0207 952 1511'
    );

COMMIT;


BEGIN TRANSACTION;

INSERT INTO ContactUserOrganisation(UserId, OrganisationId)
VALUES
    (1, 1),
    (2, 1),
    (3, 2),
    (4, 3);

INSERT INTO OrganisationService(OrganisationId, ServiceId)
VALUES
    (1, 1),
    (1, 2),

    (2, 1),
    (2, 2),
    (2, 3),
    (2, 4),

    (3, 1),
    (3, 2),
    (3, 3),
    (3, 4);

COMMIT;