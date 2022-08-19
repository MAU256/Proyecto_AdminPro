import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
 styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  progreso1: number;
  progreso2: number;

  constructor() {
    this.progreso1 = 25;
    this.progreso2 = 35;
   }

  ngOnInit(): void {
  }

  getProgreso1(){
    return `${this.progreso1}%`;
  }

  getProgreso2(){
    return `${this.progreso2}%`;
  }

}
