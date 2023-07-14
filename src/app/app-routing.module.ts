import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { CustomPreloadService } from './services/custom-preload.service'; // Se importa el servicio donde va a precargar de los modulos personalizados
import { QuicklinkStrategy } from 'ngx-quicklink';

import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data: { //services/custom-preload.service.ts
      preload: true
    }
  },
  {
    path: 'cms',
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //preloadingStrategy: PreloadAllModules// precarga todos los modulos por prioridad
    //preloadingStrategy: CustomPreloadService// precarga los modulos que elegi (website y category en los routing module)
    preloadingStrategy: QuicklinkStrategy// precarga los modulos de los router link donde se encuentra actual el usuario
    //lo que hace Quicklink esque cualquier modulo que este con Lazy Loading dentro de un modulo (como website que tiene otro modulo dentro que es Category)
    // que se aplique la tecnica de Quicklink
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
