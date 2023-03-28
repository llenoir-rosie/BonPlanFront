export class Bonplan {
    ville_name: String
    activity_type: String
    name: String
    address: String 
    constructor(ville_name: String, activity_type: String, name: String, address: String) {
        this.ville_name = ville_name;
        this.activity_type = activity_type;
        this.name = name;
        this.address = address;
    }
}
