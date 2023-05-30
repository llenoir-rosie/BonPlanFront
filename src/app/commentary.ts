export class Commentary {
    bpName: String
    userName: String
    note: String
    commentaires: String
    city_name : String
    activity_name : String
    constructor(bpName: String, userName: String, note: String, commentaires: String, city_name : String, activity_name : String) {
        this.bpName = bpName;
        this.userName = userName;
        this.note = note;
        this.commentaires = commentaires;
        this.city_name = city_name;
        this.activity_name = activity_name;
    }
}