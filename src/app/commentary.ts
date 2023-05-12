export class Commentary {
    bpName: String
    userName: String
    note: String
    commentaries: String
    city_name: String
    activity_name: String
    constructor(bpName: String, userName: String, commentaries: String, note: String, city_name: String, activity_name: String) {
        this.bpName = bpName;
        this.userName = userName;
        this.commentaries = commentaries;
        this.note = note;
        this.city_name = city_name;
        this.activity_name = activity_name;
    }
}