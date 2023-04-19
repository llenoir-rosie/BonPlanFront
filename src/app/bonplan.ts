export class Bonplan {
    ville_name: String
    activity_type: String
    name: String
    address: String 
    user_name: String
    note: number
    nb_note: number
    constructor(ville_name: String, activity_type: String, name: String, address: String, user_name: String, note: number, nb_note: number) {
        this.ville_name = ville_name;
        this.activity_type = activity_type;
        this.name = name;
        this.address = address;
        this.user_name = user_name;
        this.note = note;
        this.nb_note = nb_note;
    }
}
