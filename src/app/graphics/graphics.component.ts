import { Component, OnInit, Input } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { OndasEstacionariasService } from '../ondas-estacionarias.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {

  @Input() graphicData = '';

  options: any;

  A = 6
  w = 8* Math.PI
  t = 0.004
  k = 4 * Math.PI

  xAxisData : any[] = [];

  incidentWaveOptions : any ;
  recidentWaveOptions : any ;
  standingWaveOptions : any ;

  subscription: Subscription = interval(180).subscribe( t => this.ngOnInit());

  constructor(private _ondasService : OndasEstacionariasService) { }

  ngOnInit(): void {
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

    for (let i = 0; i < 1; i=(i+0.002)) {
      this.xAxisData.push(i.toFixed(3));
      let num = this.getIncidentInfo(i)
      let tam = num.split('.')[1].length
      incident.push(Number(num)*Math.pow(10,Math.round(tam/3)));
      recident.push(Number(this.getRecidentInfo(i))*Math.pow(10,Math.round(tam/3)));
      standing.push(Number(this.getStandingInfo(i))*Math.pow(10,Math.round(tam/3)));
    }

    this.incidentWaveOptions.xAxis.data = this.xAxisData
    this.incidentWaveOptions.series[0].data = incident
    this.recidentWaveOptions.series[0].data = recident
    this.standingWaveOptions.series[0].data = standing
    this.t = this.t + 0.01
  }

  getIncidentInfo(x){
    //Ecuacion A cos (wt - kx)
    return (this.A*Math.sin((this.w*this.t)-(this.k*x))).toFixed(20)
  }

  getRecidentInfo(x){
    //Ecuacion A cos (wt - kx)
    return (this.A*Math.sin((this.w*this.t)+(this.k*x))).toFixed(20)
  }
  getStandingInfo(x){
    //Ecuacion 2A sen (kx) * cos (wt)
    return (2*this.A*Math.sin(this.k*x)*Math.cos(this.w*this.t)).toFixed(20)
  }

}
