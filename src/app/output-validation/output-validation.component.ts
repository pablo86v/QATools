import { Component, OnInit } from '@angular/core';
import {FilesService} from './../services/files.service';
import {JenkinsService} from './../services/jenkins.service';
import {GlobalFunctionsService} from './../services/global-functions.service';

@Component({
  selector: 'app-output-validation',
  templateUrl: './output-validation.component.html',
  styleUrls: ['./output-validation.component.css']
})
export class OutputValidationComponent implements OnInit {

  private aItemsCbo= [];
  private aErrors= [];
  private aFilesToValidate = [];

  private txtDropDown = "Select project";
  private Outputs_config;
  private clientName;
  private flagBtnValidate = false;
  private flagAlertErrors ;



  constructor(public file : FilesService , public jks:JenkinsService, public gFx : GlobalFunctionsService) { 

      // Obtengo el archivo de config local
      this.file.getJsonFile("assets/Outputs_config.json").subscribe(data => 
        {

          this.Outputs_config = <any[]>data;
  
          this.Outputs_config.forEach(element => {
            //El common no se carga en el array del combo
            if (element.name.toString().trim() != "Common")
              this.aItemsCbo.push(element.name.toString().trim());
          });
        
        },
        err => console.error(err)
      );
  
  } 

  ngOnInit() {
    // document.getElementById('files').addEventListener('change', this.readFiles, false);

  }

  selectedJob(parName){

    //cambio el texto del botón dropdown
    this.txtDropDown = parName;

    // se activa el botón para procesar la info
    this.flagBtnValidate = true;

    // guardo el nombre del cliente elegido
    this.clientName = parName;
   
  }

  readFiles($event) {
    //leo los archivos seleccionados y los guardo en aFilesToValidate
    let aux = $event.target.files;
    let myObj;

    for (let i=0;i<aux.length;i++){ 

      if (!aux[i]) { return; }

      let reader = new FileReader();
      console.info(reader);
      reader.onload = (content : any) => {

        myObj =
        {
          'fileName':aux[i].name,
          'content' : content.target.result,
          'errCount': 0
        }

        this.aFilesToValidate.push(myObj);
      };
      reader.readAsText(aux[i]);      
    }
    // console.info(this.aFilesToValidate);
  }

  validateTCOutputs(){

    let aOutput,aCommonOutput,aClientOutput ,auxFileName,myError;
   
    //obtengo los outputs common + los propios del cliente.
    aCommonOutput =  this.Outputs_config.find((item) => item.name == "Common");
    aClientOutput = this.Outputs_config.find((item) => item.name == this.clientName);

    // concateno los arrays obtenidos
    aOutput = aCommonOutput.outputs.concat(aClientOutput.outputs);

    for (let i=0;i<this.aFilesToValidate.length;i++){ 
      aOutput.forEach(element => {
        // si encuentro el .mark en el testcase, luego busco el recordBuffer
        if(this.aFilesToValidate[i].content.toString().indexOf(element.mark)>0){
          if(this.aFilesToValidate[i].content.toString().indexOf(element.RecordBuffer)<0){ 
            // ERROR: Se encontró el .mark pero NO el recordBuffer.
            myError = this.aFilesToValidate[i].fileName + ":  " + element.mark + " -> RecordBuffer not found.";
            // console.log(myError);
            this.aErrors.push(myError);
            this.aFilesToValidate[i].errCount = this.aFilesToValidate[i].errCount + 1 ;
          }
        }
      });
    }
    
    if(this.aErrors.length == 0){
        // sino hubo errores muestro alert sucess
        this.flagAlertErrors = 0;
      } else if(this.aErrors.length <= 6){
        //hasta 6 errores muestro los alerts
        this.flagAlertErrors = 1;
      }else{
        //mas de 6 pido bajar CSV
        this.flagAlertErrors = 2;
    }
    

  }

  clear(){
        // limpio los arrays para iniciar validaciones nuevas
        this.aErrors = [];
        this.flagAlertErrors = -1;
        this.aFilesToValidate = [];
        this.txtDropDown = "Select project";
        this.clientName = "";
        this.flagBtnValidate = false;
  }

  exportToCSV(){
    this.gFx.ArrayToCSV(this.clientName + "_TCs_errors.csv",this.aErrors);
  }




}//class
