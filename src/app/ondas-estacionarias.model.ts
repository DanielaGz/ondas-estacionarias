export class OndasEstacionarias{

  constructor(
    public material: string = "",
    public longitud_cuerda: number = 0,
    public amplitud_onda: number = 0,
    public num_armonicos: number = 0,
    public longitud_onda: number = 0,
  ){

  }

  getBodyChart(){
    return {
      legend: {
        data: ['bar'],
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
      series: [],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }
}

