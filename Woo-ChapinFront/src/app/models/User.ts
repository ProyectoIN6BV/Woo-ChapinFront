export class User{
    constructor(
        public _id: String,
        public name: String,
        public lastName:String,
        public userName: String,
        public password: String,
        public email: String,
        public phone: String,
        public role: String,
        public facturas: [],
        public direcciones: []
    ){}
}