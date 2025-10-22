const dateOfBirth = "08/10/2006";

const getStudentName = () => {
  return "Enter your name: ";
};

const getCampusName = () => {
  return "UEL Campus";
};

exports.getName = getStudentName;
exports.Location = getCampusName;
exports.dob = dateOfBirth;

exports.StudentGrade = (marks) => {
  if (marks > 50 && marks < 70) return "B grade";
  else return "A grade";
};