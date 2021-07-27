export class User{
    constructor(
        public name: String,
        public lastName:String,
        public userName: String,
        public password: String,
        public email: String,
        public phone: String,
        public role: String,
        public facturas: []
    ){}
}