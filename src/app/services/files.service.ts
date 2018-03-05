import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpParams} from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FilesService {

  constructor(private http: HttpClient) { 

  }

 
  getFile(parURL){

    // Consulta la ultima corrida de jenkins para obtener el gspos.log
    return this.http.get(parURL,{responseType: 'text'});

  }



}