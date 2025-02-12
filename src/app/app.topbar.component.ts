import {Component} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import { Router } from '@angular/router';
import { LocalService } from './servicios/local/local.service';
@Component({
    selector: 'app-topbar',
    template: `
        <div class="topbar clearfix">
            <div class="logo">
                <a href="#">
                    <img src="assets/layout/images/logo.png">
                </a>
            </div>

			<a href="#">
                <img src="assets/layout/images/logo-text.png" class="app-name"/>
            </a>

            <a id="topbar-menu-button" href="#" (click)="appMain.onTopbarMenuButtonClick($event)">
                <i class="pi pi-bars"></i>
            </a>

            <ul class="topbar-menu fadeInDown" [ngClass]="{'topbar-menu-visible': appMain.topbarMenuActive}">
                <li #profile class="profile-item" [ngClass]="{'active-topmenuitem':appMain.activeTopbarItem === profile}">
                    <a href="#" (click)="appMain.onTopbarItemClick($event,profile)">
                        <div class="profile-image">
                            <img src="assets/layout/images/profile-image.png">
                        </div>
                        <div class="profile-info">
                            <span class="topbar-item-name profile-name">{{persona.nombres+" "+persona.primerApellido+" "+persona.segundoApellido}}</span>
                            <span class="topbar-item-name profile-role">{{usuario}}</span>
                        </div>
                    </a>

                    <ul class="fadeInDown">
                        <li role="menuitem">
                            <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-user"></i>
                                <span>Perfil</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="CerrarSession()">
                                <i class="pi pi-sign-out"></i>
                                <span>Cerrar Session</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    `
})
export class AppTopbarComponent {

    constructor(public appMain: AppMainComponent, public router: Router, private localService:LocalService) {}
  persona:any;
  usuario:any;
    ngOnInit() {
      this.persona=JSON.parse(this.localService.getLocalStorage("persona")!);
      this.usuario=this.localService.getLocalStorage("usuario")!;
    }
    CerrarSession(){
      this.localService.deleteStorage();
      this.router.navigate(['']);
    }

}
