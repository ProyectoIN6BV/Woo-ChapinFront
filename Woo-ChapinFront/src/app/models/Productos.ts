export class Productos{
    constructor(
        public _id: String,
        public nameProducto: String,
        public descProducto: String,
        public precio: Number,
        public tags:string[],
        public stock: Number,
        public cantidadVendida: Number,
        public imgProducto: String,
        public categoria: []
    ){}
}