function EmployeeInfo(name, Salary) {
    console.log("Welcome " + name + "\nYour monthly salary is: " + Salary);
}

console.log("This is my first programme");

var EmpName = "Zain";
var EmpSalary = 50000;

EmployeeInfo(EmpName, EmpSalary);

const EmpSkills= (skills)=> {
    console.log("Expert in " + skills)
   }
   EmpSkills("java")


const student= require('./Studentinfo')
const person = require('./Person')

console.log("Student Name: " + student.getName())
console.log(student.Location())
console.log(student.dob)

console.log(student.StudentGrade())
console.log("Your grade is: " + student.StudentGrade(55) )

person1= new person("Zain","UK","myemail@gmail.com")

console.log("using Person Module",person1.getPersonInfo())

console.log("Programe ended")