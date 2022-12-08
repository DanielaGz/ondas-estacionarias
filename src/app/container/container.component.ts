import { Component, OnInit } from '@angular/core';
import { OndasEstacionariasService } from '../ondas-estacionarias.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  public graphicData:any = {};

  constructor() { }

  ngOnInit(): void {
  }

  changeGraphicData(event:any){
    this.graphicData = event;
  }

}
