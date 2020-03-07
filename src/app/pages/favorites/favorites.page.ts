import { Component, OnInit } from '@angular/core';
import { AreaController } from '../../classes/area_controller/area-controller';
import { ToastController } from '@ionic/angular';
import { Area } from '../../classes/area';
import { DatabaseService } from '../../services/sqlite/database.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  public edit = false;
  public editID: number = undefined;

  public newArea: Area;

  areas: Area[] = [];

  public areasCtrl: AreaController;

  constructor(private database: DatabaseService, private toastCtrl: ToastController) { }

  ionViewWillEnter() {
   this.loadAreas();
  }

  ngOnInit() {
    this.areasCtrl = new AreaController(this.database);
  }

  async loadAreas() {
    this.areas = await this.areasCtrl.getAll();
  }

  async updateArea(area) {
    console.log('UpdateArea: ', [area.name, area.description, area.x, area.y, area.width, area.height]);
    await this.areasCtrl.save(area).then( async () => {
      const toast = await this.toastCtrl.create(
        {message: 'Atualizado com sucesso!', duration: 2000}
      );
      toast.present();
      await this.loadAreas();
      this.edit = false;
    }).catch( (error) => {
      console.log('Erro ao atualizar: ', error);
    });
  }

  editArea(area) {
    this.edit = true;
    this.editID = area.id;
  }

  async remove(id: number) {
    console.log('Deletando');
    await this.areasCtrl.delete(id).then( async () => {
      const toast = await this.toastCtrl.create(
        {message: 'Area deletada com sucesso!', duration: 2000}
      );
      toast.present();
      this.loadAreas();
    }).catch((error) => {
      console.log('Erro ao deletar: ', error);
    });
  }


  cancelar() {
    this.edit = false;
  }

}
