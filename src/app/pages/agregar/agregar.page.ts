import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonInput, IonListHeader, IonLabel, IonCheckbox, IonItemSliding, IonItemOptions, IonItemOption, IonIcon } from '@ionic/angular/standalone';
import { TareasService } from 'src/app/services/tareas.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
  standalone: true,
  imports: [IonIcon, IonItemOption, IonItemOptions, IonItemSliding, IonCheckbox, CommonModule, IonLabel, IonListHeader, IonInput, IonItem, IonList, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AgregarPage implements OnInit {

  lista!: Lista;
  nombreTarea:string = ''

  constructor( private _tareasService: TareasService, private _route: ActivatedRoute) {

    const listaId = this._route.snapshot.paramMap.get('listaId')!
    
    this.lista = _tareasService.obtenerLista(listaId)!

    console.log(this.lista);
  }

  ngOnInit() {
  }

  agregarTarea(){

    if (this.nombreTarea.length === 0) {
      return;
    }
    const tarea = new ListaItem(this.nombreTarea)
    this.lista.items.push(tarea)
    this.nombreTarea = ''
    this._tareasService.guardarLista()
  }

  cambioCheckbox( item: ListaItem ){
    
    const pendientes = this.lista.items.filter(item => !item.completado).length

    if (pendientes === 0) {
      this.lista.completada = true
      this.lista.fechaCompletada = new Date()
    }else{
      this.lista.completada = false
      this.lista.fechaCompletada = null!
    }

    console.log(this.lista);

    this._tareasService.guardarLista()
  }

  eliminarItem( i: number ){
    this.lista.items.splice(i, 1)
    this._tareasService.guardarLista()
  }

}
