import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy{
  public uidUsuario: string;
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription = new Subscription();
  public valor: number = 0;
  constructor(
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {
    this.uidUsuario = usuarioService.uidUsuario;
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.modalImagenService.nuevaImagen
      .pipe(delay(300))
      .subscribe(img => {
        this.cargarUsuarios()
      });
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.valor = valor
    this.desde += valor
    if (this.desde < 0) {
      this.desde = 0
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();

  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }
    return this.busquedasService.buscar('usuarios', termino)
      .subscribe((resultados: any) => {
        this.cargando = false;
        this.usuarios = resultados;
      },error =>{
        this.cargando = true;
      });
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this.uidUsuario) {
      Swal.fire('Error', 'No puede borarse a si mismo', 'error');
      return;
    }
    Swal.fire({
      title: '¿Desea Borrar al usuario?',
      text: `Esta a punto de borrar al usuario ${usuario.nombre}!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(resp => {
            Swal.fire({
              title: 'Eliminado!',
              text: `El usuario ${usuario.nombre} ha sido eliminado.`,
              icon: 'success',
              confirmButtonColor: '#00aa00',
            })
            this.cargarUsuarios();
          });
      }
    })

  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService.cambiarUsuario(usuario)
      .subscribe(resp => {
        console.log(resp)
      })
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img);

  }

}
