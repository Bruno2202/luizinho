export class UserModel {
    private id?: number;
    private name?: string;
    private email: string;
    private pic?: string;
    private password?: string;

    constructor(email: string, password: string, id?: number, name?: string, pic?: string) {
        this.email = email;
        this.password = password;
        this.id = id;
        this.name = name;
        this.pic = pic;
    }

    public get getId(): number | undefined { return this.id; }
    public get getName(): string | undefined { return this.name }
    public get getEmail(): string { return this.email }
    public get getPic(): string | undefined { return this.pic }
    public get getPassword(): string | undefined { return this.password }

    public set setId(value: number | undefined) { this.id = value; }
    public set setName(value: string) { this.name = value }
    public set setEmail(value: string) { this.email = value }
    public set setPic(value: string | undefined) { this.pic = value }
    public set setPassword(value: string | undefined) { this.password = value }
}
