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
  private txtDropDown = "Seleccionar Job";
  private Outputs_config;
  public fileToValidate;

  constructor(public file : FilesService , public jks:JenkinsService) { 

      // Obtengo el archivo de config local
      this.file.getJsonFile("assets/Outputs_config.json").subscribe(data => 
        {
          this.Outputs_config = <any[]>data
          this.aItems = this.Outputs_config;
          // console.info(this.aItems);
        },
        err => console.error(err)
      );
  
  }//constructor

  ngOnInit() {
    document.getElementById('files').addEventListener('change', this.readSingleFile, false);
  }

  validateTCOutputs(){
    console.info(this.Outputs_config[0].sodimac_colombia[0].mark);

  }

  readSingleFile($event) {
    let file = $event.target.files[0];
    if (!file) {
      return;
    }

    let reader = new FileReader();
    reader.onload = (e) => {
      this.fileToValidate = $event.target.result;
      //  console.log(this.fileToValidate);
    };
    reader.readAsText(file);
  }



}//class
