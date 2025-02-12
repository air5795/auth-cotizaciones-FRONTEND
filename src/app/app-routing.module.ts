import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardDemoComponent} from './componentes/inicio/dashboarddemo.component';
import {AppMainComponent} from './app.main.component';
import {AppErrorComponent} from './componentes/error/app.error.component';
import {AppLoginComponent} from './componentes/login/app.login.component';
import { AutentificacionComponent } from './componentes/autentificacion/autentificacion.component';
import { AppAccessdeniedComponent } from './componentes/denegado/app.accessdenied.component';
import { SistemaComponent } from './componentes/sistema/sistema.component';
import { ClasificadorComponent } from './componentes/clasificador/clasificador.component';
import { RecursoComponent } from './componentes/recurso/recurso.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { RestriccionComponent } from './componentes/usuario/restriccion/restriccion.component';
@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'inicio', component: AppMainComponent,
                children: [
                    {path: '', component: DashboardDemoComponent},
                    {path: 'sistemas', component: SistemaComponent},
                    {path: 'clasificadores', component: ClasificadorComponent},
                    {path: 'recursos', component: RecursoComponent},
                    {path: 'usuarios', component: UsuarioComponent},
                    {path: 'perfiles', component: PerfilComponent},
                    {path: 'restriccionesUsuario/:id', component: RestriccionComponent },
                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: '', component: AppLoginComponent},
            {path: 'autentificar', component: AutentificacionComponent},
            {path: 'denegado', component: AppAccessdeniedComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

