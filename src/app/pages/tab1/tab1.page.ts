import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular/standalone';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonIcon, IonFabButton, IonFab, IonLabel, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
})
export class Tab1Page {

  constructor( public _tareasService: TareasService, private _router: Router, private alertController: AlertController ) {
  }

  async agregarTarea(){

    const alerta = await this.alertController.create({
      header: 'Nueva lista de tarea',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Crear',
          role: 'confirm',
          handler: ( data ) => {
            if (data.titulo.length === 0) {
              return;
            }
            const listaID = this._tareasService.crearLista(data.titulo)
            this._router.navigateByUrl(`/tabs/tab1/agregar/${listaID}`)
          },
        }
      ],
      inputs:[
        {
          name: 'titulo',
          placeholder: 'Titulo',
          type: 'text',
        },
      ]
    })

    alerta.present()
    

  }

}
