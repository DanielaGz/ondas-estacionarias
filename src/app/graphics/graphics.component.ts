import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {

  options: any;

  A = 6
  w = 8* Math.PI
  t = 0.004
  k = 4 * Math.PI

  xAxisData : any[] = [];
  data1 : any[] = [];
  data2 : any[] = [];

  subscription: Subscription = interval(180).subscribe( t => this.ngOnInit());

  constructor() { }

  ngOnInit(): void {
    this.xAxisData = []
    this.data1 = []
    this.options = {
      legend: {
        data: ['bar'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: this.xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: this.data1,
          seriesColor:"#5470c6",
          animationDelay: 0.5,
        }
      ],
      //animationEasing: 'elasticOut',
      animationDelayUpdate: 0.5,
    };

    this.setOptions();
  }

  changeTime(){
    this.t = this.t + 0.002
  }

  setOptions(){
    for (let i = 0; i < 1; i=(i+0.002)) {
      this.xAxisData.push(i*Math.pow(10,5));
      //Ecuacion A cos (wt - kx)
      let num = (this.A*Math.sin((this.w*this.t)-(this.k*i))).toFixed(20)
      let tam = num.split('.')[1].length
      this.data1.push(Number(num)*Math.pow(10,Math.round(tam/3)));
    }

    this.options.series[0].data = this.data1
    this.t = this.t + 0.002
  }

}
