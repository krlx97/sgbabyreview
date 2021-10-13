import {Injectable} from "@angular/core";
import {io} from "socket.io-client";

@Injectable({
  providedIn: "root"
})
export class IoService {
  private readonly _socket = io("ws://localhost:4100");

  emit (event: string, data: object = {}): void {
    this._socket.emit(event, data);
  }

  listenToResponses (responses: any): void {
    Object.keys(responses).forEach((response) => {
      this._socket.on(response, (params = {}) => {
        responses[response](params);
      });
    });
  };
}