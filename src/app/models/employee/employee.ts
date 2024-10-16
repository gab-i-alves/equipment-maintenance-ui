export class Employee {

    constructor(
        public id : number,
        public email : string,
        private _password : string,
        public name : string,
        public birthDate : string,
    ){}

    get password() : string{
        return this._password;
    }

    set password(password){
        this._password = password;
    }
}