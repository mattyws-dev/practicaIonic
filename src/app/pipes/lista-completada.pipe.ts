import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'listaCompletada',
  pure:false
})
export class ListaCompletadaPipe implements PipeTransform {

  transform(listas: Lista[], completada: boolean): Lista[] {
    return listas.filter(lista => lista.completada === completada);
  }

}
