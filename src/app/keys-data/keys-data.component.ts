import { Component, OnInit } from '@angular/core';
import {FilesService} from './../services/files.service';

@Component({
  selector: 'app-keys-data',
  templateUrl: './keys-data.component.html',
  styleUrls: ['./keys-data.component.css']
})
export class KeysDataComponent implements OnInit {

  private aItems: any [];

  constructor(public key : FilesService) {

    this.key.getFile("c:/NCR/caja/testing-sodimac-colombia/log/gdpos.log").subscribe(data => 
      this.aItems = <any>data['jobs'],
      err => console.error(err)
 );

   }

  ngOnInit() {
  }



  test(){
    console.log("test");
  }


}
