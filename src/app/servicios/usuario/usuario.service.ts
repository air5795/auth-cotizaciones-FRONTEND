import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../dominio/Usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  getUsuarios(parametro:any): Observable<any>{
    return this.http.get(environment.url+"aut-usuario/listar/",parametro);
  }
  getUsuario(idPersona:number): Observable<any>{
    return this.http.get(environment.url+"aut-persona/aut-pers-usuario/"+idPersona);
  }
  guardarSistema(usuario:Usuario): Observable<any>{
    return this.http.post(environment.url+"aut-usuario/adicionar",usuario);
  }
  listarExpedicion(): Observable<any>{
    return this.http.get(environment.url+"clasificador-detalle/identificadorclasificador/EXPEDICION");
  }
  listarProfesion(): Observable<any>{
    return this.http.get(environment.url+"grupo-profesion/listar-grupo-profesion");
  }
  listarDepartamento(): Observable<any>{
    return this.http.get(environment.url+"geografia/regionales");
  }
  listarEstadoUsuario(): Observable<any>{
    return this.http.get(environment.url+"clasificador-detalle/identificadorclasificador/ESTADO_USUARIO");
  }
  guardarUsuario(usuario:any): Observable<any>{
    return this.http.post(environment.url+"aut-persona",usuario);
  }
  eliminarUsuario(idPersona:number,idUsuario:string): Observable<any>{
    return this.http.patch(environment.url+"aut-usuario/delete-logico/"+idPersona+"/"+idUsuario,{});
  }
  actualizarUsuario(usuario:any,idpersona:number): Observable<any>{
    return this.http.put(environment.url+"aut-persona/"+idpersona,usuario);
  }
  getRestricciones(usuario:string): Observable<any>{
    return this.http.get(environment.url+"aut-usuario-restriccion/"+usuario);
  }
  guardarRestricciones(perfiles:any): Observable<any>{
    return this.http.post(environment.url+"aut-usuario-restriccion/adicionar-perfiles",perfiles);
  }
  eliminarRestricciones(idRestriccion:any): Observable<any>{
    return this.http.delete(environment.url+"aut-usuario-restriccion/"+idRestriccion);
  }
  getPerfilesUsuario(idSistema:number,usuario:string): Observable<any>{
    return this.http.get(environment.url+"aut-perfil/aut-usuario-perfil/"+idSistema+"/"+usuario);
  }
  actualizarRestricciones(idUsuarioRestriccion:number,perfiles:any): Observable<any>{
    return this.http.put(environment.url+"aut-usuario-restriccion/update-usurestperfil/"+idUsuarioRestriccion,perfiles);

  }
  listaEmpresa(idRegional:number): Observable<any>{
    return this.http.get(environment.url+"geografia/empresa/"+idRegional);
  }
}
