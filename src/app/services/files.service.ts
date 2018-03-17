import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class FilesService {

  constructor(private http: HttpClient) { 

  }

 
  getTxtFile(parURL){

    // Consulta la ultima corrida de jenkins para obtener el gspos.log
    return this.http.get(parURL,{responseType: 'text'});

  }


  
   
  getJsonFile(parURL){

    // Consulta la ultima corrida de jenkins para obtener el gspos.log
    return this.http.get(parURL);

  }

}
