INSERT INTO Departments (dept_name)
VALUES ("Engineering"), 
    ("Finance"), 
    ("Legal"), 
    ("Sales"); 

INSERT INTO Roles (role_title, role_salary, role_dept_id)
VALUES ("Engineer", 75000, 1), 
    ("Accountant", 65000, 2), 
    ("Lawyer", 85000, 3), 
    ("Salesperson", 55000, 4);

INSERT INTO Employees (first_name, last_name, emp_role_id, manager_id)
VALUES ("Leo", "Fran", 1, 1), 
    ("Juan","Robert", 1, 2), 
    ("Max","Jose", 4, NULL), 
    ("Michael","Pedro", 3, NULL), 
    ("Maria","Salce", 2, NULL), 
    ("Clint","Stevens", 4, NULL); 
