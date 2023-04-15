export class Suscription {
    suscriptionId=''
    name = '';
    price = 0;
    contractDate = '';

    constructor(name,price,contractDate) {
        this.name = name;
        this.price = price;
        this.contractDate = contractDate;
    }
}