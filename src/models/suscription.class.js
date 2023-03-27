export class Suscription {
    suscriptionId=''
    name = '';
    price = 0;
    payDate = '';
    userId = '';
    folderId = ''

    constructor(suscriptionId,name,price,payDate,userId,folderId) {
        this.suscriptionId=suscriptionId;
        this.name = name;
        this.price = price;
        this.payDate = payDate;
        this.userId = userId;
        this.folderId = folderId;
    }
}