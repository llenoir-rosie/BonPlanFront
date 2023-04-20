export class Bonplan {
    ville_name: String
    activity_type: String
    name: String
    address: String 
    user_name: String
    note: Number[]
    constructor(ville_name: String, activity_type: String, name: String, address: String, user_name: String, note: Number[]) {
        this.ville_name = ville_name;
        this.activity_type = activity_type;
        this.name = name;
        this.address = address;
        this.user_name = user_name;
        this.note = note;
    }
}
