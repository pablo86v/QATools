import { Component, OnInit } from '@angular/core';
import {FilesService} from './../services/files.service';
import {JenkinsService} from './../services/jenkins.service';
import {GlobalFunctionsService} from './../services/global-functions.service';

//to do:  recuperar al inicio el config-xml para tenerlo en memoria.
// No está bueno ir tantas veces contra el servicio file (una vez por cada tecla encontrada)
//Podria guardar la lista de clientes al iniciar el sistema...

@Component({
  selector: 'app-keys-data',
  templateUrl: './keys-data.component.html',
  styleUrls: ['./keys-data.component.css']
})
export class KeysDataComponent implements OnInit {


  private txtURL = "";
  private aKeys= [];
  private aItems= [];
  private txtDropDown = "Seleccionar Job";
  private keysConfigFile;
  private flagBtnGetKeysInfo = false;
  private flagAlertTxtURL = false;
  private keysConfigURL;
  private QATools_config;
  private aux = "";

  constructor(public file : FilesService , public jks:JenkinsService , public gFx : GlobalFunctionsService) {
        //Obtengo de jenkins la info general que incluye la lista de jobs en un array ("jobs")
        this.jks.getJobsList().subscribe(data => 
          this.aItems = <any>data['jobs'],
          err => console.error(err)
        );
    
        // Obtengo el archivo de config local
        this.file.getJsonFile("assets/QATools_config.json").subscribe(data => 
          this.QATools_config = <any>data['version'],
          err => console.error(err)
        );

    

  }

  ngOnInit() {
  }


  selectedJob(parName,parURL){
    // Cuando se cambia de job en el combo , me traigo el keys.xml


    //cambio el texto del botón dropdown
    this.txtDropDown = parName;

    // se activa el botón para procesar la info
    this.flagBtnGetKeysInfo = true;

    //genero la URL del keys.xml
    this.getKeyConfigURL(parName,parURL);
    console.log(this.keysConfigURL)

    //Obtengo de jenkins el archivo keys
     this.file.getTxtFile(this.keysConfigURL).subscribe(data => 
          this.keysConfigFile = data
          ,err => console.error(err)
      );
   
  }
 
  getKeyConfigURL(parName,parURL){

    this.keysConfigURL = parURL + "ws/eris/config-xml/keys.xml";

    this.QATools_config.ARS_v26.forEach(element => {
      if (parName.indexOf(element) >= 0) this.keysConfigURL = parURL + "ws/config-xml/keys.xml"
    });
   
  }

  getKeysInfo(){
     //Invocada desde el botón


    if(this.txtURL.length >1){
      // limpio flag de alert
      this.flagAlertTxtURL = false;
      this.file.getTxtFile(this.txtURL).subscribe(
        data => {
            //leo gdPOS ingresado en input para buscar teclas presionadas
            this.readFile(data);
        }
        ,err => console.error(err)
       );
    } else{
      //mostrar alert de error
      this.flagAlertTxtURL = true;
    }
  }

  readFile(parFile){
    if(parFile!=null){ 
       let lineas = parFile.split('\n');
       let position,i;
       for(i=0;i<lineas.length;i++){
           position = lineas[i].indexOf("keyData");
           if (position > 0) {
              let keyInDecimal = lineas[i].substring(position+8,lineas[i].indexOf("keyEventType"));
              this.getKeyFromConfig(keyInDecimal);
           }
       }
    }
  }

  getKeyFromConfig(parKeyInDecimal){
    //convierto la tecla a hexa para buscar en el keys.xml
    let keyInHexa = Number(parKeyInDecimal).toString(16);
    let keyValueXML = keyInHexa.length == 2 ? ("0x00" + keyInHexa.toUpperCase()): ("0x0" + keyInHexa.toUpperCase());
   
    //Busco la tecla en el keys.xml
    let lineas = this.keysConfigFile.split('\n');
    let position,i;
    
    for(i=0;i<lineas.length;i++){
        position = lineas[i].indexOf(keyValueXML);
        if (position > 0) {
           let inicio = lineas[i].indexOf("key name=")+9;
           let keyText = lineas[i].substring(inicio,lineas[i].indexOf("value="));
           
          //  agrego la info obtenida del keys al array para mostrarlo en pantalla
           if(this.gFx.validarSiNumero(keyText.trim().substr(1,1))){
              this.aux = this.aux + keyText.trim().substr(1,1);
           }else{
              if(this.aux.trim().length > 0) this.aKeys.push(this.aux.trim());
              this.aKeys.push(keyText.trim());    
              this.aux = "";            
           }
           
        }
    } 
    
  }

  copy() {
    let auxArray = "";
    this.aKeys.forEach(element => {
      auxArray = auxArray + element + "\n";
    });

    this.gFx.copyToClipBoard(auxArray);

  }

 

}//class
