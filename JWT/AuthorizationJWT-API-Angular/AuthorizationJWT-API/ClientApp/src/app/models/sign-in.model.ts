export class SignInModel {
    public email: string;
    public password: string;

    constructor() {
        this.email = this.password = "";
    }

    isValidEmail(): boolean {
        return this.isValid(this.email);
    }

    isValidPassword(): boolean {
        return this.isValid(this.password);
    }

    isEmail(): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.email).toLowerCase());
    }
    
    private isValid(value: string) {
        return value !== null && value !== "" && value !== undefined;
    }
}