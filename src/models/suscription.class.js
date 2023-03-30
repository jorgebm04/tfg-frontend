export class Suscription {
    suscriptionId=''
    name = '';
    price = 0;
    payDate = '';

    constructor(name,price,payDate) {
        this.name = name;
        this.price = price;
        this.payDate = payDate;
    }
}