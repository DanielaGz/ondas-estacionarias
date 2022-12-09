import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { OndasEstacionariasService } from '../ondas-estacionarias.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit, OnChanges {

  @Input() graphicData = {
    amplitud_onda: 6,
    amplitud_onda_unidades: "1",
    longitud_cuerda: 0,
    longitud_cuerda_unidades: "1",
    longitud_onda: "sadasd",
    longitud_onda_unidades: 1,
    material: "sadasdasdasdasd",
    num_armonicos: 0,
    masa: 0
  };
  longitudOnda = 0;
  kVariable = 0;
  wVariable = 0;

  variables = {}

  options: any;

  A = 6
  w = 8* Math.PI
  t = 0.004
  k = 4 * Math.PI

  xAxisData : any[] = [];

  incidentWaveOptions : any ;
  recidentWaveOptions : any ;
  standingWaveOptions : any ;

  subscription: Subscription = interval(1000).subscribe( t => this.generateChart());

  constructor(private _ondasService : OndasEstacionariasService) { }

  ngOnInit(): void {
    this.generateVariables()
    this.generateChart()
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(this.graphicData);
  }

  generateChart(){
    this.xAxisData = []
    this.incidentWaveOptions = this.getBodyChart(['incident'])
    this.recidentWaveOptions = this.getBodyChart(['recident'])
    this.standingWaveOptions = this.getBodyChart(['standing'])

    this.setOptions();
  }

  getBodyChart(names?){
    return {
      legend: {
        data: names,
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: [],
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: names[0],
          type: 'bar',
          data: [],
          seriesColor:"#5470c6",
          animationDelay: 0.5,
        }
      ],
      animationDelayUpdate: 0.5,
    };
  }

  changeTime(){
    this.t = this.t + 0.002
  }

  setOptions(){
    let incident : any[] = []
    let recident : any[] = []
    let standing : any[] = []

    for (let i = 0; i < this.graphicData['longitud_cuerda']; i=(i+0.002)) {
      this.xAxisData.push(i.toFixed(3));
      let num = this.getIncidentInfo(i)
      let tam = num.split('.')[1].length
      incident.push(Number(num)*Math.pow(10,Math.round(tam/3)));
      recident.push(Number(this.getRecidentInfo(i)));
      standing.push(Number(this.getStandingInfo(i)));
    }

    this.incidentWaveOptions.xAxis.data = this.xAxisData
    this.incidentWaveOptions.series[0].data = incident
    this.recidentWaveOptions.series[0].data = recident
    this.standingWaveOptions.series[0].data = standing
    this.t = this.t + 0.01
  }

  //Calculos de variables

  generateVariables(){
    this.getLongitudOnda().then(
      result =>{
        this.getk().then(
          result =>{
            this.getw().then(
              result =>{
                this.variables = {
                  lambda: this.longitudOnda,
                  k: this.kVariable,
                  w: this.wVariable
                }
              }
            ).catch()
          }
        ).catch();
      }
    ).catch();
    console.log(this.variables)
  }

  getk(){
    return new Promise((resolve, reject)=>{
      this.kVariable = (2*Math.PI)/this.longitudOnda;
      resolve(true);
    });
  }

  getw(){
    return new Promise(
      (resolve, reject)=>{
        this.wVariable = Math.sqrt(this.kVariable/ this.graphicData['masa'])
        resolve(true);
      }
    )
  }

  getLongitudOnda(){
    return new Promise((resolve, reject)=>{
      this.longitudOnda = 2*(this.graphicData['longitud_cuerda'])/this.graphicData['num_armonicos'];
      resolve(true);
    });
  }

  getIncidentInfo(x){
    //Ecuacion A cos (wt - kx)
    return (this.graphicData.amplitud_onda*Math.sin((this.variables['w']*this.t)-(this.variables['k']*x))).toFixed(20)
  }

  getRecidentInfo(x){
    //Ecuacion A cos (wt - kx)
    return (this.graphicData.amplitud_onda*Math.sin((this.variables['w']*this.t)+(this.variables['k']*x))).toFixed(20)
  }
  getStandingInfo(x){
    //Ecuacion 2A sen (kx) * cos (wt)
    return (2*this.graphicData.amplitud_onda*Math.sin(this.variables['k']*x)*Math.sin(this.variables['w']*this.t)).toFixed(20)
  }

}
