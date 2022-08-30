import { Component, Input, OnInit} from '@angular/core';
import { ChartData, ChartType} from 'chart.js';



@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent{

  public doughnutChartType: ChartType = 'doughnut';
  // Doughnut
  @Input("labels")
  public doughnutChartLabels: string[] = [ 'label1', 'labe2', 'label3'];
  // public labels1: string[] = ['Pan', 'Refresco', 'Tacos'];
  
 
  @Input()
  public title: string  = "Sin titulo"
   // public data1: ChartData = [350, 450, 100];
  @Input('data')
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { 
        data:  [350, 450, 100], 
        backgroundColor: ['#9e120e','#ff5800', '#ffb414']       
      },
    ] 
  } 
  ngOnInit(): void {
    console.info(this.doughnutChartLabels)
    console.info(this.doughnutChartData.labels)
  }
  ngOnChanges(): void {
    this.doughnutChartData.labels = this.doughnutChartLabels;
    // this.doughnutChartData.datasets["data"] = this.data;
   
  }
   
  
  

}

