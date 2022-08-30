import { Component} from '@angular/core';
import { ChartData, ChartEvent, ChartType} from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component{
  public ventas: string = "Ventas";
  public labels1: string[] = ['Pan', 'Refresco', 'Tacos'];
  public data: ChartData<'doughnut'> = {   
    datasets: [
      { 
        data: [10, 15, 40], 
        backgroundColor: ['#9e120e','#ff5800', '#ffb414'],
        hoverBackgroundColor: ['#00821C','#09DB36','#024D0F'],
        
      },
    ] 
  }
  
  
}
