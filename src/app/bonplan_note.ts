import { Bonplan } from "./bonplan"

export class BonPlanNote extends Bonplan{
    already_noted: String;
    commentaries: String;
    constructor(bonplan: Bonplan, already_noted: String, commentaries: String) {
        super(bonplan.ville_name, bonplan.activity_type, bonplan.name, bonplan.address, bonplan.user_name, 
            bonplan.note,  bonplan.note_user, bonplan.date);
        this.already_noted = already_noted;
        this.commentaries = commentaries;
    }
}
