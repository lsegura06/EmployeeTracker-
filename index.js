
const inquirer = require("inquirer");
const mysql = require("mysql2");
const util = require("util");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "helloworld",
    database: "leocorp_db"
});

connection.query = util.promisify(connection.query);


const questions = [
    {
        name: "initialQuestions",
        type: "list",
        message:
            `What would you like to do?`,
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update Employee Role",
            "Exit",
        ]
    }];


const handleInitChoice = async answer => {
    switch (answer.initialQuestions) {
        case "View All Departments":
            await viewDepartments();
            break;
        case "View All Roles":
            await viewRoles();
            break;
        case "View All Employees":
            await viewEmployees();
            break;
        case "Add a Department":
            await addDepartment();
            break;
        case "Add a Role":
            await addRole();
            break;
        case "Add an Employee":
            await addEmployee();
            break;
        case "Update Employee Role":
            await addEmpRole();
            break;
        default:
            process.exit();
    }
};

const run = async () => {
    const { choice } = await inquirer.prompt(questions);
    await handleInitChoice(choice);
};


const viewDepartments = async () => {
    try {
        const query = 'SELECT * FROM departments';
        const [rows, fields] = await db.query(query);
        console.table(rows);
    } catch (error) {
        console.error(error);
    } finally {
        init();
    }
};

const viewRoles = async () => {
    try {
        const query = 'SELECT * FROM roles';
        const [rows, fields] = await db.query(query);
        console.table(rows);
    } catch (error) {
        console.error(error);
    } finally {
        init();
    }
};

const viewEmployees = async () => {
    try {
        const query = 'SELECT * FROM employees';
        const [rows, fields] = await db.query(query);
        console.table(rows);
    } catch (error) {
        console.error(error);
    } finally {
        init();
    }
};

const addDepartment = async () => {
    try {
        const addDepartmentQuestion = [
            {
                message: 'What department would you like to add?',
                type: 'input',
                name: 'addDepartmentData',
            },
        ];
        const data = await inquirer.prompt(addDepartmentQuestion);
        const query = `INSERT INTO departments (dept_name) VALUES (?)`;
        await db.query(query, data.addDepartmentData);
        console.log(`Successfully added ${data.addDepartmentData} to the database`);
    } catch (error) {
        console.error(error);
    } finally {
        init();
    }
};

var addRole = async () => {
    try {
        let departmentArray = [];
        const [rows] = await db.query("SELECT * FROM departments");
        for (const row of rows) {
            departmentArray.push(`${row.dept_id}-${row.dept_name}`);
        }
    } catch (error) {
        console.error(error);
    }
};


var addRole = [
    {
        message: 'What Role would you like to add?',
        type: 'input',
        name: 'addRoleData'
    },
    {
        message: `What's the Salary of the Role?`,
        type: 'input',
        name: 'addSalaryData'
    },
    {
        message: `Which Department does the role belong to?`,
        type: 'list',
        choices: departmentArray,
        name: 'addDepartmentData'
    }
]

const data = await inquirer.prompt(addRole)

await db.query(`INSERT INTO Roles (role_title, role_salary, role_dept_id) VALUES ('${data.addRoleData}', '${data.addSalaryData}', '${data.addDepartmentData[0].split('-')}');`,)
console.log(`Succesfully Added ${data.addRoleData}`),
    init()


const addEmployee = async () => {
    let roleArray = [];
    const [rows] = await db.query("SELECT * FROM Roles;");
    for (let i = 0; i < rows.length; i++) {
        roleArray.push(rows[i].role_id + "-" + rows[i].role_title);
    }

    const addEmployeeQ = [
        {
            message: "What is the Employee's First Name?",
            type: "input",
            name: "addEmpFirstName"
        },
        {
            message: "What is the Employee's Last Name?",
            type: "input",
            name: "addEmpLastName"
        },
        {
            message: "What is the Employee's Role?",
            type: "list",
            choices: roleArray,
            name: "addEmpRole"
        }
    ];

    const data = await inquirer.prompt(addEmployeeQ);
    const roleId = data.addEmpRole[0].split("-")[0];

    await db.query(
        `INSERT INTO Employees (first_name, last_name, emp_role_id) VALUES ('${data.addEmpFirstName}', '${data.addEmpLastName}', ${roleId});`
    );

    console.log(`Successfully Added ${data.addEmpFirstName} ${data.addEmpLastName}`);
    init();
};




run();
init();

