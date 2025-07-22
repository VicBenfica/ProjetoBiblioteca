export class BasicResponseDto{
    message: string;
    object: any;
 
    //DTO: Data Tranfer Object: Tranfere dados entre camadas
    constructor (message: string, object: any){
        this.message = message;
        this.object = object;
    }
}