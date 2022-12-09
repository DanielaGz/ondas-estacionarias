import { Component, OnInit } from '@angular/core';
import { OndasEstacionariasService } from '../ondas-estacionarias.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  public graphicsData:any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  changeGraphicData(event:any){
    this.graphicsData.push(event);
  }

  closeGraphic(event){
    let indexOfElement = this.graphicsData.indexOf(event);
    this.graphicsData.splice(indexOfElement, 1);
  }

}
