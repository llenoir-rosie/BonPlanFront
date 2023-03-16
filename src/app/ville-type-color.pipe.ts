import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'villeTypeColor'
})
export class VilleTypeColorPipe implements PipeTransform {

  transform(type: string): string {
    let color = '';
    switch (type) {
      case 'grande ville':
        color = 'red lighten-1';
        break;
      case 'moyenne ville':
        color = 'blue lighten-1';
        break;
    }
    return 'chip ' + color;
  }
}
