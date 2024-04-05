export class chaudiere{
    id!:number;
    numSerie!:string;
    nomCli!:string;
    adressCli!:string;
    MM!:string;
    dateMiseEnService!:Date;
    

    constructor(id:number,
                numSerie:string,
                nomCli:string,
                adressCli:string,
                MM:string,
                dateMiseEnService:Date){
        this.id=id;
        this.numSerie = numSerie;
        this.nomCli = nomCli;
        this.adressCli = adressCli;
        this.MM = MM;
        this.dateMiseEnService = dateMiseEnService;
    }
}