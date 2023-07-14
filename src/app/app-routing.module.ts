import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { CustomPreloadService } from './services/custom-preload.service'; // Se importa el servicio donde va a precargar de los modulos personalizados

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
    preloadingStrategy: CustomPreloadService// precarga los modulos que elegi (website y category en los routing module)
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
