import { Component, OnInit } from '@angular/core';
import {FilesService} from './../services/files.service';
import {JenkinsService} from './../services/jenkins.service';

@Component({
  selector: 'app-output-validation',
  templateUrl: './output-validation.component.html',
  styleUrls: ['./output-validation.component.css']
})
export class OutputValidationComponent implements OnInit {

  private aItems= [];
  private aFiles= [];
  private aErrors= [];
  private afilesToValidate = [];
  
  private txtDropDown = "Seleccionar Job";
  private Outputs_config;
  private txtInputFile = "";
  private clientName;
  private flagBtnValidate = false;
  private flagAlertErrors = false;

  constructor(public file : FilesService , public jks:JenkinsService) { 

      // Obtengo el archivo de config local
      this.file.getJsonFile("assets/Outputs_config.json").subscribe(data => 
        {

          this.Outputs_config = <any[]>data;
  
          this.Outputs_config.forEach(element => {
            //El common no se carga en el array del combo
            if (element.name.toString().trim() != "Common")
              this.aItems.push(element.name.toString().trim());
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

    // limpio los arrays para iniciar validaciones nuevas
    this.aErrors = [];
    this.aFiles = [];
    this.afilesToValidate = [];


    //leo los archivos seleccionados y los guardo en aFilesToValidate
    let aux = $event.target.files;

    for (let i=0;i<aux.length;i++){ 

      this.aFiles.push(aux[i].name);

      if (!aux[i]) { return; }

      let reader = new FileReader();
      reader.onload = (content : any) => {
        this.afilesToValidate.push(aux[i].name + "|DEBUGFILENAME|" + content.target.result);
      };
      reader.readAsText(aux[i]);      
    }

    console.info(this.afilesToValidate);
    

  }

  validateTCOutputs(){
    let aOutput,aCommonOutput,aClientOutput ,auxFileName;
 
    //obtengo los outputs common + los propios del cliente.
    aCommonOutput =  this.Outputs_config.find((item) => item.name == "Common");
    aClientOutput = this.Outputs_config.find((item) => item.name == this.clientName);

    // concateno los arrays obtenidos
    aOutput = aCommonOutput.outputs.concat(aClientOutput.outputs);


    aOutput.forEach(element => {
      for (let i=0;i<this.afilesToValidate.length;i++){ 
        // si encuentro el .mark en el testcase, luego busco el recordBuffer
        if(this.afilesToValidate[i].toString().indexOf(element.mark)>0){
          if(this.afilesToValidate[i].toString().indexOf(element.RecordBuffer)<0){ 
            // ERROR: Se encontró el .mark pero NO el recordBuffer.
            this.flagAlertErrors = true;
            auxFileName = this.afilesToValidate[i].split("|DEBUGFILENAME|");
            // console.log(" "+ auxFileName[0] + ":  " + element.mark + " -> RecordBuffer not found.");
            this.aErrors.push(" "+ auxFileName[0] + ":  " + element.mark + " -> RecordBuffer not found.");
          }
        }
      }
    });


  }






}//class
