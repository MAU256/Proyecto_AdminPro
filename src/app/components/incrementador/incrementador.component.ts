import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @Input('valor')// decorador nombrado  
  progreso: number;
  @Input()
  btnClass: string;

  @Output('valor')
  valorSalida: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.progreso = 50;
    this.btnClass = 'btn-primary';
   }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  getProgreso(){
    return  `${this.progreso}%`;
  }

  cambiarValor(valor:number){
    this.progreso += valor;
    this.valorSalida.emit(this.progreso);
    if(this.progreso < 0 || this.progreso > 100 ){     
      this.progreso -= valor;
      this.valorSalida.emit(this.progreso);
    }
  }

  onChange(valor: number){
    this.valorSalida.emit(valor);
    if(valor >= 100){
      valor = 100;
    }else if(valor <= 0){
      valor = 0;
    }
    this.valorSalida.emit(valor);

  }
    
}
