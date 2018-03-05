import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class JenkinsService {

  private jenkinsURL = "http://153.72.48.180:8080";

  constructor(private http: HttpClient) { 

  }



  getGDPos(parURL){
   
    // Consulta la ultima corrida de jenkins para obtener el gspos.log
    // console.log(parURL+"lastSuccessfulBuild/consoleText");
    return this.http.get(parURL+"lastSuccessfulBuild/consoleText",{responseType: 'text'});
  }


  getJobsList(){
    // Consulto la información general de jenkins (incluye array JOBS)
    return  this.http.get(this.jenkinsURL + "/api/json?pretty=true");
    
  }


}//class
