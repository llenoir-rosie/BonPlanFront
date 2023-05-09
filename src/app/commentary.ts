export class Commentary {
    bpName: String
    userName: String
    commentaries: String
    constructor(bpName: String, userName: String, commentaries: String) {
        this.bpName = bpName;
        this.userName = userName;
        this.commentaries = commentaries;
    }
    getCommentaries() {
        return this.commentaries;
    }
    
}