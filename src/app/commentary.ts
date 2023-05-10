export class Commentary {
    bpName: String
    userName: String
    commentaries: String
    note: String
    constructor(bpName: String, userName: String, commentaries: String, note: String) {
        this.bpName = bpName;
        this.userName = userName;
        this.commentaries = commentaries;
        this.note = note;
    }
}