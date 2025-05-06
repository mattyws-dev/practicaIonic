import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonList, IonItem, IonNote, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonIcon } from "@ionic/angular/standalone";
import { Lista } from 'src/app/models/lista.model';
import { ListaCompletadaPipe } from 'src/app/pipes/lista-completada.pipe';
import { TareasService } from 'src/app/services/tareas.service';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.scss'],
  imports:[IonList, IonItem, IonLabel, IonNote, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, CommonModule, ListaCompletadaPipe],
  standalone: true
})
export class ListaTareasComponent  implements OnInit {

  @Input() completada:boolean = true
  @ViewChild(IonList) ionList!: IonList 

  constructor(public _tareasService:TareasService, private _router:Router, private alertController:AlertController) { }

  ngOnInit() {}
  
  abrirLista(lista:Lista){
    if (this.completada) {
      this._router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`)
    }else{
      this._router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`)
    }
  }

  async editarLista( lista:Lista ){

    const alerta = await this.alertController.create({
      header: 'Editar nombre',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () =>{
            this.ionList.closeSlidingItems()
          }
        },
        {
          text: 'Actualizar',
          role: 'confirm',
          handler: ( data ) => {
            if (data.titulo.length === 0) {
              return;
            }
            lista.titulo = data.titulo
            this._tareasService.guardarLista()
            this.ionList.closeSlidingItems()
          },
        }
      ],
      inputs:[
        {
          name: 'titulo',
          placeholder: 'Nuevo Titulo',
          type: 'text',
          value: lista.titulo
        },
      ]
    })

    alerta.present()

  }

  eliminarLista( item:Lista ){
    this._tareasService.eliminarLista(item);
  }

}
