import { Component, OnInit } from '@angular/core';
import { AreasControllerService } from '../../services/areas-controller.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  public edit: boolean = false;
  public editID: number = undefined;

  constructor(private areasCtrl: AreasControllerService) { }

  ngOnInit() {
  }

  getAreas() {
    return this.areasCtrl.getAreas;
  }

  remove(area: any) {
    this.areasCtrl.removeArea(area);
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
