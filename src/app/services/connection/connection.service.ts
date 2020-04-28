import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private socket: any;
  public static data = null;

  constructor(private platform: Platform) {

  }

  open(host, port) {
    this.platform.ready().then((readySource) => {
      if(readySource=='cordova'){
        this.socket = new (<any>window).Socket();

       this.socket.onData = function(data) {
         ConnectionService.data = data;
       };
       this.socket.onError = function(errorMessage) {
         return errorMessage;
       };
       this.socket.onClose = function(hasError) {
         return hasError;
       };

      this.socket.open("192.168.2.13", port, () => {
        alert("Connected to " + port);
      }, (e) => {
        alert("Error to connect" + e);
      });

      }
    });
    
  }

  write(data: string) {
    var dataString = data;
    var dataToArray = new Uint8Array(dataString.length);
    for (var i = 0; i < dataToArray.length; i++) {
      dataToArray[i] = dataString.charCodeAt(i);
    }
    this.socket.write(dataToArray);
  }

  read() {
    var byteArray = ""
    if ( ConnectionService.data != null || ConnectionService.data != undefined ) {

      byteArray = String.fromCharCode.apply(null, ConnectionService.data);
      alert(byteArray);
      alert(byteArray.indexOf('1'));
    }
    alert(byteArray);
    return ConnectionService.data;
  }

  getSocket() {
    return this.socket;
  }

}
