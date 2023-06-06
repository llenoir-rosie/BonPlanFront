import { Bonplan } from "./bonplan"
import { Commentary } from "./Commentary";

export class BonPlanNote extends Bonplan{
    already_noted: String;
    allCommentaries: Commentary[];
    constructor(bonplan: Bonplan, already_noted: String, allCommentaries: Commentary[]) {
        super(bonplan.ville_name, bonplan.activity_type, bonplan.name, bonplan.address, bonplan.user_name, 
            bonplan.note,  bonplan.note_user, bonplan.date,bonplan.imageBonPlan);
        this.already_noted = already_noted;
        this.allCommentaries = allCommentaries;
    }
}
