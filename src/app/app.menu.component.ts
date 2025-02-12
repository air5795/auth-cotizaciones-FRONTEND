import {Component, OnInit} from '@angular/core';
import { LocalService } from './servicios/local/local.service';
import { Recurso } from './dominio/Recurso';

@Component({
  selector: 'app-menu',
  template: `
    <div class="menu-scroll-content">
      <ul class="navigation-menu">
        <li
          app-menuitem
          *ngFor="let item of model; let i = index"
          [item]="item"
          [index]="i"
          [root]="true"
        ></li>
      </ul>
    </div>
  `,
})
export class AppMenuComponent implements OnInit {
  public model: any[] | undefined;
  constructor(private localService:LocalService){}
  ngOnInit() {
    this.model = this.mapear(JSON.parse(this.localService.getLocalStorage("recursos")!));
  }

 mapear(recurso: Recurso[]): any {
  if(recurso.length==0){
    return null;
  }else{
   return recurso.map((r:Recurso) => {
    return {
      label: r.nombreRecurso,
      icon: 'pi pi-'+r.icono,
      routerLink: r.uri,
      badgeStyleClass: 'teal-badge',
      items: this.mapear(r.listaDeRecurso),
    };
  })
  }
}

}
