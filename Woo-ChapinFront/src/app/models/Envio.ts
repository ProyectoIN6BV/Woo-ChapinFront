export class Envio{
    constructor(
        public nameReceiver: String,
        public lastNameReceiver: String,
        public phone: String,
        public address: String,
        public specificAddress: String,
        public reference: String,
        public municipio: [],
        public factura: []
    ){}
}