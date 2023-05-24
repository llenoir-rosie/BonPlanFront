export class User {
    firstName: String
    lastName: String
    email: String
    password: String
    username: String
    role: String
    imgProfil : String
    constructor(first_name: String, last_name: String, email: String, password: String, username: String, role: String, imgProfil : String) {
        this.firstName = first_name;
        this.lastName = last_name;
        this.email = email;
        this.password = password;
        this.username = username;
        this.role = role;
        this.imgProfil = imgProfil;
    }
}