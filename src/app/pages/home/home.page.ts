import { Component, OnInit } from '@angular/core';
import { Area } from '../../classes/area';
import { ConnectionService } from 'src/app/services/connection/connection.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private results = {};
  constructor(private conn: ConnectionService) { }

  ngOnInit() {

    this.conn.open("", 7777);
    
  }

  test() {
    if ( this.conn.getSocket().state == (<any>window).Socket.State.OPENED ) {
      alert('opened');
      ConnectionService.data = null;
      this.conn.write("m");
      alert(`data: ${this.conn.read()} `);
    }
  }

  test2() {
    if ( this.conn.getSocket().state == (<any>window).Socket.State.OPENED ) {
      this.conn.read();
    }
  }
}
