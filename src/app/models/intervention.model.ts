export class intervention{
    id!:number;
    dateInter!:Date;
    descriptionInter!:string;
    duree!:number;
    numChaudiere!:number;

    constructor(id:number,
                dateInter:Date,
                descriptionInter:string,
                duree:number,
                numChaudiere:number){
        this.id = id;
        this.dateInter = dateInter;
        this.descriptionInter = descriptionInter;
        this.duree = duree;
        this.numChaudiere = numChaudiere;
    }
}