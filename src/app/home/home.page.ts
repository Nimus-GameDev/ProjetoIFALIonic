import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public iconSquare = '../../assets/images/bntSquare.png';
  public iconStar = '../../assets/images/bntStar.png';

  constructor(public toast: ToastController) {}

  public async squareClick() {

    const t = await this.toast.create({message: 'Square was actived.',
                                              duration: 500,
                                              position: 'middle',
                                              color: 'secondary'});
    t.present();

  }

  public async starClick() {

    const t = await this.toast.create({message: 'Star was actived.',
                                              duration: 500,
                                              position: 'middle',
                                              color: 'success'});
    t.present();

  }

}
