import { Bonplan } from "./bonplan"

export class BonPlanNote extends Bonplan{
    already_noted: String;
    constructor(bonplan: Bonplan, already_noted: String) {
        super(bonplan.ville_name, bonplan.activity_type, bonplan.name, bonplan.address, bonplan.user_name, 
            bonplan.note,  bonplan.note_user, bonplan.date);
        this.already_noted = already_noted;
    }
}
