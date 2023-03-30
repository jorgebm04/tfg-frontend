export class User {
    userId = '';
    name = '';
    subscriptions = [];

    constructor(userId,userName,subscriptions){
        this.userId = userId;
        this.username = userName;
        this.subscription = subscriptions
    }
}