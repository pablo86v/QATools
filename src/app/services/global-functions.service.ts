import { Injectable } from '@angular/core';

@Injectable()
export class GlobalFunctionsService {

  constructor() { }


  ArrayToCSV(parFileName,parArray){
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
    for (let i = 0; i < parArray.length; i++) {
      csvFile += processRow(parArray[i]);
    }

    let blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, parFileName);
    } else {
      let link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          let url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", parFileName);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
    }
  }
 
  copyToClipBoard(parContent){
    let selBox = document.createElement('textarea');

    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
  
    selBox.value = parContent;
  
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
  
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  validarSiNumero(numero){
    if (!/^([0-9])*$/.test(numero)){
      return false
    }else{
      return true
    }
  }   

  test(){
    console.log("test");
  }

}
