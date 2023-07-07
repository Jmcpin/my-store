import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver'; // Libreria para descargar archivos
import { tap, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

interface fileTipeado {
  originalname: string;
  filename: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private httpp : HttpClient
  ) { }

  private UrlApi = `${environment.API_URL}/api/files`;

  getFile(name: string, urll: string, type: string){
    return this.httpp.get(urll, {responseType: 'blob'})
    // blob en un indicar que es un archivo, con esto ya se obtiene el contenido del archivo, falta el paso para descargar el archivo
    //para descargar el archivo se utilizara la libreria 'file-saver'
    .pipe(
      tap(respuesta => {
        const blobb = new Blob([respuesta], {type});
        //blob es el archivo en donde respuesta es el contenido del archivo que recibe de la peticion y type es el tipo de archivo que es el archivo
        saveAs(blobb, name); // con la clase saveAs guarda/ descarga el archivo indicando que blobb es el archivo y name es el nombre del archivo
      }),
      map(() => true)//Una vez descargado el archivo, que devuelva un true o false
    );
  }

  setUpload(file: Blob){ // Los archivos por defecto son blob, el file es el archivo que se recibe
    const form = new FormData; //como el file es un archivo, no se necesita enviar como json, si no como archivo
    // y para esto se puede enviar como formData, asi se envian los archivos
    form.append('file',file)// aqui se indica como espera recibir el archivo el backend, el campo file
    //asi lo tiene en la base de datos el back end y se envia el file como parametro
    return this.httpp.post<fileTipeado>(`${this.UrlApi}/upload`, form, { // aqui ya se abjunta el archivo file
      //headers: {
      //  'Content-file': 'multipart/form-data' // este header se pone especificamente si el back end lo requiere
      //}
    });
  }

}
