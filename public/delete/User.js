function User(fist, last, email, password, DoB){
    this.name = {
        first,
        last
    };
    this.email = email;
    this.password = password;
    this.DoB = DoB;
}

User.prototype.addActivity = function(){
    console.log("add activity")
}

function Student(fist, last, email, password, DoB, schoolYear, department){
    User.call(this, fist, last, email, password, DoB);

    this.schoolYear = schoolYear;
    this.department = department;
}

function Faculty(fist, last, email, password, DoB, department){
    User.call(this, fist, last, email, password, DoB);

    this.department = department;
}

function Staff(fist, last, email, password, DoB, workDepartment){
    User.call(this, fist, last, email, password, DoB);

    this.workDepartment = workDepartment;
}

function Administrator(fist, last, email, password, DoB, administratorId){
    User.call(this, fist, last, email, password, DoB);

    this.administratorId = administratorId;
}