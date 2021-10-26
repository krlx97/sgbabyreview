import {Injectable} from "@angular/core";
import {io} from "socket.io-client";
import * as SocketIOFileUpload from "socketio-file-upload";

@Injectable({
  providedIn: "root"
})
export class IoService {
  private readonly _socket = io("ws://localhost:4100");
  readonly uploader = new SocketIOFileUpload(this._socket);

  constructor () {}

  emit (event: string, data: object = {}): void {
    this._socket.emit(event, data);
  }

  on (event: string, cb: (params: any) => void): void {
    this._socket.on(event, cb);
  }

  off (event: string): void {
    this._socket.off(event);
  }

  listenToResponses (responses: any): void {
    Object.keys(responses).forEach((response) => {
      this._socket.on(response, (params = {}) => {
        responses[response](params);
      });
    });
  };
}