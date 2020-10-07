function Account(email, password){
    this.email = email;
    this.password = password;
}

Account.prototype.login = function(){
    console.log("login");
}

Account.prototype.logout = function(){
    console.log("logout");
}