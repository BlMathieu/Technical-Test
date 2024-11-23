abstract class AbstractRequest{
    protected url:string;
    constructor(urlBase:string){
        this.url = `http://localhost:3000/${urlBase}`;
    }
}

export default AbstractRequest;