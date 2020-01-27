import { Component, OnInit } from '@angular/core';
import { AreasControllerService } from '../../services/areas-controller.service';
import { Area } from '../../classes/objects/area';
import { ToastController } from '@ionic/angular';

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

  constructor(private areasService: AreasControllerService, private toastCtrl: ToastController) { }

  ionViewWillEnter() {
   this.loadAreas();
  }

  ngOnInit() {

  }

  async loadAreas() {
    this.areas = await this.areasService.getAll();
  }

  async updateArea(area) {
    console.log('UpdateArea: ', [area.name, area.description, area.x, area.y, area.width, area.height]);
    await this.areasService.save(area).then( async () => {
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
    await this.areasService.delete(id).then( async () => {
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
