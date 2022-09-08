import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';

@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
})
export class PromesaComponent implements OnInit {

  constructor() { }

  // ngOnInit(): void {
  //   this.getUsuarios()
  // }
  ngOnInit(): void {
    this.getUsuarios().then(usuarios =>{
      console.log(usuarios);
    })
  }

  getUsuarios(){
    return new Promise(resolve =>{
      fetch('https://reqres.in/api/users')
      .then(resp => resp.json())
      .then(body => resolve(body.data));
    });
  }

}
 //   const promesa = new Promise( (resolve, reject )=> {
  //     if (false){
  //       resolve('Hola mundo');

  //     }else{
  //       reject('Algo salio mal');
  //     }
      
  //   });
  //   promesa.then((mensaje) => {
  //     console.log(mensaje);
  //   })
  //   .catch( error => console.error('error en mi promesa', error))
  //   console.log('Fin del Init');
  // }