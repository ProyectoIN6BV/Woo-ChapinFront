export class Carrito{
    constructor(
        public _id: String,
        public detalles:[],
        public total: Number,
        public user: String,
    ){}
}