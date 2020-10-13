export class SignUpModel {
    public email: string;
    public password: string;
    public phone: string;
    public firstName: string;
    public middleName: string;
    public lastName: string;
    public address: string;

    constructor() {
        this.email = this.password = this.phone = this.firstName = this.middleName = this.lastName = this.address = "";
    }

    isValid() {
        return this.isNotEmpty(this.email, this.password, this.phone, this.firstName, this.firstName, this.middleName, this.lastName, this.address);
    }

    private isNotEmpty(...values: string[]): boolean {
        for (let value of values) {
            if (value === null || value === "" || value === undefined) {
                return false;
            }
        }
        return true;
    }

    isEmail(): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.email).toLowerCase());
    }
}