import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  lista: Lista[] = []

  constructor() {
    this.cargarLista()
  }

  crearLista(titulo:string){
    const nuevaLista = new Lista(titulo);
    this.lista.push(nuevaLista)
    this.guardarLista()
    return nuevaLista.id;
  }

  obtenerLista(id:string | number){

    id = Number(id)

    return this.lista.find( item => item.id === id)
  }

  guardarLista(){

    localStorage.setItem('lista', JSON.stringify(this.lista))

  }

  cargarLista(){

    if (localStorage.getItem('lista')) {
      this.lista = JSON.parse( localStorage.getItem('lista')! )
    }else{
      this.lista = []
    }
  }
}
