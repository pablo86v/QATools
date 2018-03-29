import { Component, OnInit } from '@angular/core';
import {FilesService} from './../services/files.service';
import {JenkinsService} from './../services/jenkins.service';
import {GlobalFunctionsService} from './../services/global-functions.service';

@Component({
  selector: 'app-hsh-plu',
  templateUrl: './hsh-plu.component.html',
  styleUrls: ['./hsh-plu.component.css']
})
export class HshPluComponent implements OnInit {


  private aItemsCbo= [];
  private txtDropDown = "Select project";
  private Outputs_config;
  private oHSHPLU="";

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
  }

  selectedJob(parName){

    //cambio el texto del botón dropdown
    this.txtDropDown = parName;

    // se activa el botón para procesar la info
    // this.flagBtnValidate = true;

    // guardo el nombre del cliente elegido
    // this.clientName = parName;
   

  }

  readFile($event) {
    //leo los archivos seleccionados y los guardo en aFilesToValidate
    let aux = $event.target.files;

    if (!aux[0]) { return; }

    let reader = new FileReader();
    // console.info(reader);
    reader.onload = (content : any) => {
      this.oHSHPLU = content.target.result;
    };
    reader.readAsText(aux[0]);      
  
   
  }

  clear(){
    // limpio los arrays para iniciar validaciones nuevas

    this.oHSHPLU = "";
    this.txtDropDown = "Select project";


  }


}//class
