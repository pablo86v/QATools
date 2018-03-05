import { Component, OnInit } from '@angular/core';
import {JenkinsService} from './../services/jenkins.service';

@Component({
  selector: 'app-jenkins-reports',
  templateUrl: './jenkins-reports.component.html',
  styleUrls: ['./jenkins-reports.component.css']
})
export class JenkinsReportsComponent implements OnInit {

  public jobs;
  private arrSort = [];
  private jobName;
  private txtDropDown = "Seleccionar Job";
  private aItems: any [];
  private txtGdPos;

  constructor(public jks : JenkinsService) { 

         //Obtengo de jenkins la info general que incluye la lista de jobs en un array ("jobs")
       this.jks.getJobsList().subscribe(data => 
            this.aItems = <any>data['jobs'],
            err => console.error(err)
       );

    
  }

  ngOnInit() {

  }

 
  
  // *************************  FUNCIONES  **********************

      
  selectedJob(parName,parURL){

      //limpio los datos que se guardan
       this.arrSort = [];
     
      //cambio el texto del botón dropdown
      this.txtDropDown = parName;
  
      //guardo el nombre del job para la descarga de csv
      this.jobName = parName;
  
      //Obtengo de jenkins el archivo GdPOS.log
       this.jks.getGDPos(parURL).subscribe(data => 
            {
            this.txtGdPos = data
            //Genero la lista de TCs en base al GDPos.log
            this.makeTCList(this.txtGdPos);
            //Ordeno el array, por duracion DESC
            this.myArraySort();           
            }
            ,err => console.error(err)
        );

      
  }
  

  makeTCList(parFile){
     if(parFile!=null){ 
        let lineas = parFile.split('\n');
        let pos,i;
        for(i=0;i<lineas.length;i++){
            pos = lineas[i].indexOf("Done Test Run");
            if (pos > 0) {
                let tcNumber= lineas[i].substring(pos+15,pos+19);
                let elapSedTime = lineas[i].substring(pos+20,pos+29)
                if(elapSedTime.length>0) {
                    this.arrSort.push("tc" + tcNumber + "-" + elapSedTime);
                }    
            }
        }
     }
  }
  
  myArraySort(){
      let k,x,y,i,j;
       for(i=0;i<this.arrSort.length;i++){
             for(j=i+1;j<this.arrSort.length;j++){
                 if(this.arrSort[i] != null){
                     k = this.arrSort[i];
                     x = this.arrSort[i].split("-");
                     y = this.arrSort[j].split("-");
                     if (this.sortByTime(x[1],y[1])==2) {
                         this.arrSort[i] = this.arrSort[j];
                         this.arrSort[j] = k;
                     }
                 }
             }
         }
  
  }
  
  sortByTime(time1,time2){
  
      let result = 0;
      if(time1.length > 1  && time2.length > 1){
          let t1 = time1.split("s");
          let t2 = time2.split("s");
          let s1 = t1[0];
          let s2 = t2[0];
  
          let ms1 = t1[1].replace("m","");
          let ms2 = t2[1].replace("m","");
  
          if (parseInt(s1)==parseInt(s2)){
              if (parseInt(ms1) == parseInt(ms2)){
                  result = 0;
              }else if (parseInt(ms1)>parseInt(ms2)){
                  result = 1;
              }else{
                 result = 2; 
              }
          }else if(parseInt(s1)>parseInt(s2)){
              result = 1;
              }else {
              result = 2;
          }    
          
      }    
  
      // console.log(time1 + " - " + time2 + " = " + result.toString());
      return result;
  }
     
  exportToCsv() {

      let filename = this.jobName + ".csv";
  
  
      let processRow = function (row) {
          let finalVal = '';
          for (let j = 0; j < row.length; j++) {
              let innerValue = row[j] === null ? '' : row[j].toString();
              if (row[j] instanceof Date) {
                  innerValue = row[j].toLocaleString();
              };
              let result = innerValue.replace(/"/g, '""');
              if (result.search(/("|,|\n)/g) >= 0)
                  result = '"' + result + '"';
             
              finalVal += result;
          }
          return finalVal + '\n';
      };
  
      let csvFile = '';
      for (let i = 0; i < this.arrSort.length; i++) {
          csvFile += processRow(this.arrSort[i]);
      }
  
      let blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
      if (navigator.msSaveBlob) { // IE 10+
          navigator.msSaveBlob(blob, filename);
      } else {
          let link = document.createElement("a");
          if (link.download !== undefined) { // feature detection
              // Browsers that support HTML5 download attribute
              let url = URL.createObjectURL(blob);
              link.setAttribute("href", url);
              link.setAttribute("download", filename);
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          }
      }
  }



}

