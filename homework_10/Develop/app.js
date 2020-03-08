const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const outputPath = path.resolve(__dirname, 'output', 'team.html');

const render = require('./lib/htmlRenderer');

let employeeArray = [];

function newEmployee() {
	inquirer
		.prompt([
			{
				type: 'input',
				message: 'Enter employee name:',
				name: 'name'
			},
			{
				type: 'input',
				message: 'Enter employee ID:',
				name: 'id'
			},
			{
				type: 'input',
				message: 'Enter employee email:',
				name: 'email',
				validate: (input) => {
					if (input.includes('@') && input[input.length - 4] === '.') {
						return true;
					} else {
						console.log('\n Email not valid, please try again');
						return false;
					}
				}
			},
			{
				type: 'list',
				message: 'Choose employee role:',
				name: 'role',
				choices: ['Engineer', 'Manager', 'Intern']
			}
		])
		.then((response) => {
			if (response.role === 'Manager') {
				inquirer
					.prompt([
						{
							type: 'input',
							message: 'What is their Office Number?',
							name: 'officeNumber'
						}
					])
					.then((managerData) => {
						let manager = new Manager(
							response.name,
							response.id,
							response.email,
							managerData.officeNumber
						);
						employeeArray.push(manager);
						console.log(`manager: ${manager.name}`);
						addEmployee();
					});
			} else if (response.role === 'Engineer') {
				inquirer
					.prompt([
						{
							type: 'input',
							message: 'Enter their Github Username:',
							name: 'github'
						}
					])
					.then((engineerData) => {
						let engineer = new Engineer(
							response.name,
							response.id,
							response.email,
							engineerData.github
						);
						employeeArray.push(engineer);
						console.log(
							`engineer: ${engineer.name}, Github: ${engineer.github}`
						);
						addEmployee();
						console.log(`Employee Array: ${JSON.stringify(employeeArray)}`);
					});
			} else if (response.role === 'Intern') {
				inquirer
					.prompt([
						{
							type: 'input',
							message: 'What school did they attend?',
							name: 'school'
						}
					])
					.then((internData) => {
						let intern = new Intern(
							response.name,
							response.id,
							response.email,
							internData.school
						);
						employeeArray.push(intern);
						console.log(`intern: ${intern.name}`);
						addEmployee();
					});
			}
		});
}

newEmployee();

function addEmployee() {
	inquirer
		.prompt([
			{
				type: 'confirm',
				message: 'Would you like to add another Employee?',
				name: 'add'
			}
		])
		.then((response) => {
			if (response.add === true) {
				newEmployee();
			} else {
				createHTML();
			}
		});
}

function createHTML() {
	console.log(`Employee Array: ${JSON.stringify(employeeArray)}`);
	fs.writeFile(outputPath, render(employeeArray), function(err) {
		if (err) {
			throw err;
		}
	});
}