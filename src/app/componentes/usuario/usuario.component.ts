import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { Table } from 'primeng/table';
import { SistemaService } from '../../servicios/sistema/sistema.service';
import { ClasificadorService } from '../../servicios/clasificador/clasificador.service';
import { PerfilService } from '../../servicios/perfil/perfil.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificacionService } from '../../servicios/mensaje/notificacion.service';
import { MessageService } from 'primeng/api';
import { Mensaje } from '../../dominio/Mensaje';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
  providers: [MessageService,NotificacionService]
})
export class UsuarioComponent {
  listaUsuarios!:any[];
  columnas: any[] | undefined;
  nuevoUsuarioDialog:boolean=false;
  listaExpedicion!:any[];
  listaProfesion!:any[];
  listaEstado!:any[];
  listaNiveles!:any[];
  listaDepartamento!:any[];
  listaSistemas!:any[];
  listaPerfiles!:any[];
  colIdPerfiles:any[]=[];
  sistemaSeleccionado:any;
  guardarUsuarioDialogo:boolean=false;
  mostrarTabla:boolean=false;
  personaForm!:FormGroup;
  nivelForm!:FormGroup;
  perfilForm!:FormGroup;
  usuario:any;
  editarUsuarioDialogo:boolean=false;
  eliminarUsuarioDialogo:boolean=false;
  guardarEditarUsuarioDialogo:boolean=false;
  idPersona!:number;
  constructor(private usuarioService:UsuarioService,private sistemaService:SistemaService,private clasificadorService :ClasificadorService,private  perfilService:PerfilService,private notificacionService:NotificacionService, private route:Router){}
  ngOnInit() {
    this.cargarListaUsuarios();
    this.listarExpedicion();
    this.listarProfesion();
    this.listarEstadoUsuario();
    this.listarSistemas();
    this.cargarListaNiveles();
    this.cargarListaDepartamento();
    this.personaForm = new FormGroup({
      nombres: new FormControl('', [Validators.required, Validators.minLength(3)]),
      primerApellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
      segundoApellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      numeroDocumento: new FormControl('', [Validators.required, Validators.minLength(5)]),
      complemento: new FormControl(),
      expedicion: new FormControl('', [Validators.required]),
      idGrupoProfesion: new FormControl('', [Validators.required]),
      matriculaProfesional: new FormControl(),
      correoElectronico: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      idcEstado: new FormControl('', [Validators.required]),
    });
    this.nivelForm = new FormGroup({
      idSistema: new FormControl('', [Validators.required]),
      idcNivel: new FormControl('', [Validators.required]),
      codDepartamento: new FormControl('', [Validators.required]),
    });
    this.perfilForm = new FormGroup({
      colIdPerfiles: new FormControl(),
    });
    this.columnas = [
      { field: 'usuario', header: 'usuario' },
      { field: 'nombres', header: 'nombres' },
      { field: 'apellidos', header: 'apellidos' },
      { field: 'numeroDocumento', header: 'numeroDocumento' },
      { field: 'estadoUsuario', header: 'estadoUsuario' },
      { field: 'idcNivel', header: 'idcNivel' },

  ];
  }
  cargarListaUsuarios(){
    let p={idSistema:0,idcNivel:0,codDepartamento:0,codArea:0,codMunicipio:0,codEstablecimiento:0,usuario:"mferrufino"}
    this.usuarioService.getUsuarios(p)
    .subscribe((respuesta: any) => {
      console.log(respuesta);
      if (respuesta.status) {
        this.listaUsuarios=respuesta.data;
      }
    });
  }
  buscadorPerfil(table: Table, event: Event){
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  abrirNuevoRecurso(){
    this.nuevoUsuarioDialog=true;
  }
  listarExpedicion(){
    this.usuarioService.listarExpedicion()
    .subscribe((respuesta: any) => {
      if (respuesta.status) {
        this.listaExpedicion=respuesta.data;
      }
    });
  }
  listarEstadoUsuario(){
    this.usuarioService.listarEstadoUsuario()
    .subscribe((respuesta: any) => {
      if (respuesta.status) {
        console.log(respuesta.data);
        this.listaEstado=respuesta.data;
      }
    });
  }
  listarProfesion(){
    this.usuarioService.listarProfesion()
    .subscribe((respuesta: any) => {
      if (respuesta.status) {
        this.listaProfesion=respuesta.data;
      }
    });
  }
  listarSistemas(){
    this.sistemaService.getSistemas()
    .subscribe((respuesta: any) => {
      if (respuesta.status) {
        this.listaSistemas=respuesta.data
      }
    });
  }
  cargarListaNiveles(){
    this.clasificadorService.getNiveles()
    .subscribe((respuesta: any) => {
      if(respuesta.status){
        console.log(respuesta.data);
        this.listaNiveles=respuesta.data;
      }
    });
  }
  cargarListaDepartamento(){
    this.usuarioService.listarDepartamento()
    .subscribe((respuesta: any) => {
      console.log("respuesta",respuesta.data);
      if(respuesta.status){
        console.log(respuesta.data);
        this.listaDepartamento=respuesta.data;
      }
    });
  }
  cargarPerfiles(){
    if(this.sistemaSeleccionado){
    this.perfilService.getPerfiles(this.sistemaSeleccionado)
    .subscribe((respuesta: any) => {
      if(respuesta.status){
        console.log("perfiles",respuesta.data);
        this.listaPerfiles=respuesta.data;
        this.mostrarTabla=true;
      }
    });
  }else{
    this.mostrarTabla=false;
  }
}
mostrarDialogoUsuarioGuardar(){
  this.guardarUsuarioDialogo=true;
}

confirmarGuardadoUsuario(){
  let usuario={...this.personaForm.value, ...this.nivelForm.value, ...this.perfilForm.value }
  console.log(usuario);
  this.usuarioService.guardarUsuario(usuario)
    .subscribe((respuesta: any) => {
      if(respuesta.status){
        this.guardarUsuarioDialogo=false;
        this.nuevoUsuarioDialog=false;
        this.cargarListaUsuarios();
        this.personaForm.reset();
        this.perfilForm.reset();
        this.nivelForm.reset();
      this.notificacionService.mostrarMensaje("usuario","success","Correcto",respuesta.message);
      }else{
        this.guardarUsuarioDialogo=false;
        this.nuevoUsuarioDialog=false;
        this.personaForm.reset();
        this.perfilForm.reset();
        this.nivelForm.reset();
        this.notificacionService.mostrarMensaje("usuario","error","Error",respuesta.message);
      }
    });
}
editarUsuario(){

}
confirmarEliminarUsuario(){
  this.eliminarUsuarioDialogo=false;
  this.eliminarUsuario(this.usuario.idPersona,this.usuario.usuario);
}
mostrarDialogoEliminar(a:any){
  this.usuario=a;
  this.eliminarUsuarioDialogo=true;
}
eliminarUsuario(idPersona:number,idUsuario:string){
  this.usuarioService.eliminarUsuario(idPersona,idUsuario).subscribe((respuesta:Mensaje) => {
    if(respuesta.status){
      this.cargarListaUsuarios();
      this.notificacionService.mostrarMensaje("usuario","success","Correcto",respuesta.message);
    }
    else{
      this.notificacionService.mostrarMensaje("usuario","error","Error",respuesta.message);
    }
  });
}
abrirEditarUsuario(u:any){
  console.log(u.idcEstado);
  this.idPersona=u.idPersona;
  this.editarUsuarioDialogo = true;
  this.personaForm.controls['nombres'].setValue(u.nombres);
  this.personaForm.controls['primerApellido'].setValue(u.primerApellido);
  this.personaForm.controls['segundoApellido'].setValue(u.segundoApellido);
  this.personaForm.controls['fechaNacimiento'].setValue(new Date(u.fechaNacimiento));
  this.personaForm.controls['numeroDocumento'].setValue(u.numeroDocumento);
  this.personaForm.controls['complemento'].setValue(u.complemento);
  this.personaForm.controls['expedicion'].setValue(u.expedicion);
  this.personaForm.controls['idGrupoProfesion'].setValue(u.idGrupoProfesion);
  this.personaForm.controls['matriculaProfesional'].setValue(u.matriculaProfesional);
  this.personaForm.controls['correoElectronico'].setValue(u.correoElectronico);
  this.personaForm.controls['telefono'].setValue(u.telefono);
  this.personaForm.controls['idcEstado'].setValue(u.idcEstado);

}

confirmarEditarUsuario(){
  this.guardarEditarUsuarioDialogo=true;
}

guardarEditarUsuario(){
  console.log(this.personaForm.value);
  this.usuarioService.actualizarUsuario(this.personaForm.value,this.idPersona)
  .subscribe((respuesta: any) => {
    if(respuesta.status){
      this.cargarListaUsuarios();
      this.guardarEditarUsuarioDialogo=false;
      this.editarUsuarioDialogo = false;
      this.personaForm.reset();
    this.notificacionService.mostrarMensaje("usuario","success","Correcto",respuesta.message);
    }else{
      this.personaForm.reset();
      this.notificacionService.mostrarMensaje("usuario","error","Error",respuesta.message);
    }
  });
}

cerrarEditarUsuario(){
  this.personaForm.reset();
  this.editarUsuarioDialogo = false;
}
abrirRestriccionesUsuario(u:any){
  this.route.navigate(['inicio/restriccionesUsuario/'+u.idPersona]);

}
cerrarNuevoUsuario(){
  this.editarUsuarioDialogo=false;
  this.personaForm.reset();
}

}
