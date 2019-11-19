import { Component, OnInit } from '@angular/core';
import { AreasControllerService } from '../../services/areas-controller.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  constructor(private areasCtrl: AreasControllerService) { }

  ngOnInit() {
  }

  getAreas() {
    return this.areasCtrl.getAreas;
  }

  remove(area: any) {
    this.areasCtrl.removeArea(area);
  }

}
