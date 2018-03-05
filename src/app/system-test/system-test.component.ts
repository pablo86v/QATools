import { Component, OnInit } from '@angular/core';
import {JenkinsService} from './../services/jenkins.service';


@Component({
  selector: 'app-system-test',
  templateUrl: './system-test.component.html',
  styleUrls: ['./system-test.component.css']
})
export class SystemTestComponent implements OnInit {

  private txtDropDown = "Seleccionar ST";

  constructor(public jks : JenkinsService  ) { }

  ngOnInit() {
  }

  test(){
    console.log("test");
  }

}
