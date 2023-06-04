USE workforcewidget;

-- Insert departments
INSERT INTO
    department (name)
VALUES
    ('Software Development'),
    ('Testing'),
    ('Human Resources'),
    ('Marketing'),
    ('Finance'),
    ('Infrastructure'),
    ('Executive');

-- Insert roles
INSERT INTO
    role (title, salary, department_id)
VALUES
    ('Software Developer', 80000, 1),
    ('Test Engineer', 70000, 2),
    ('HR Manager', 75000, 3),
    ('Marketing Executive', 70000, 4),
    ('Finance Analyst', 75000, 5),
    ('Infrastructure Engineer', 80000, 6),
    ('CEO', 150000, 7);

-- Insert employees --
INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    -- executive management team
    ('Majdy', 'Jamal', 1, 7),
    ('Lachlan', 'Connell', 2, 7),
    ('Appoline', 'Cogan', 3, 7),
    ('Elizabeth', 'Holmes', 4, 7),
    ('Bernie', 'Madoff', 5, 7),
    ('Sudish', 'Ramesh', 6, 7),
    ('Rene', 'Malingre', 7, NULL),
    -- software developers
    ('Grace', 'Hopper', 1, 1),
    ('Mark', 'Zuckerberg', 1, 1),
    ('Larry', 'Page', 1, 1),
    ('Sergey', 'Brin', 1, 1),
    ('Galileo', 'Galilei', 1, 8),
    ('Marie', 'Curie', 1, 8),
    -- test engineers
    ('Ada', 'Lovelace', 2, 2),
    ('Donald', 'Knuth', 2, 2),
    ('Linus', 'Torvalds', 2, 2),
    -- marketing executives
    ('James', 'Gosling', 4, 4),
    ('Dennis', 'Ritchie', 4, 4),
    ('Tim', 'Berners-Lee', 4, 4),
    -- finance analyst
    ('John', 'von Neumann', 5, 5),
    -- infrastructure engineers
    ('Richard', 'Feynman', 6, 6);