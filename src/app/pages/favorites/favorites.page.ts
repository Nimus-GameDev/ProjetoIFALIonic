import { Component, OnInit } from '@angular/core';
import { AreasControllerService } from '../../services/areas-controller.service';
import { DrawMapService } from '../../services/draw-map.service';
import { CrudAreaService } from '../../services/crud-area.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  public edit: boolean = false;
  public editID: number = undefined;

  areas = [];

  constructor(private areasCtrl: AreasControllerService, private drawMap: DrawMapService,
    private crudArea: CrudAreaService) { }

  ngOnInit() {

    this.crudArea.readAreas().subscribe(data => {
      this.areas = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          description: e.payload.doc.data()['description'],
          x: e.payload.doc.data()['x'],
          y: e.payload.doc.data()['y'],
          width: e.payload.doc.data()['width'],
          height: e.payload.doc.data()['height']
        };
      });
      console.log(this.areas);
    });

  }

  remove(id: any) {
    this.crudArea.remove(id);
    this.drawMap.updateDraw();
  }

  editArea(area: any) {
    this.edit = true;

    this.editID = area.id;

  }

  salvarDados(area: any) {

  }

  cancelar() {
    this.edit = false;
  }

}
