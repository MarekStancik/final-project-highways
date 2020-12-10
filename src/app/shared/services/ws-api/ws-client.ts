import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";
import { UserService } from "../user.service";
import { Message } from "./dto";
import { ActionType, EntityType, EventMessage } from "./dto/events";

export class WsClient {

    private internalReceive$: BehaviorSubject<Message> = new BehaviorSubject(null);
    private ws: WebSocket;
  
    constructor(private http: HttpClient,private auth: AuthService) {
      this.createSocket();
    }
  
    public listen<T>(action: ActionType, object: EntityType): Observable<T> {
      return this.internalReceive$.pipe(
        filter(m => !!m),
        filter(m => m.type === "event"),
        map(m => m as EventMessage),
        filter((m: EventMessage) => m.action === action && m.objectType === object),
        map(m => m.object)
      );
    }
  
    private createSocket(): void {
      this.ws = new WebSocket(environment.apiUrl.split("http").join("ws") + "/ws/v1");
  
      // Authenticate ON OPEN
      this.ws.onopen = ev => {
       this.ws.send(JSON.stringify({
        type: "authentication.request",
        sessionToken: this.auth.sessionToken
       }))
      };
  
      // Handle Messages
      this.ws.onmessage = ev => {
        try{
          const parsed = JSON.parse(ev.data);
          this.internalReceive$.next(parsed);
        } catch(err) {
  
        }
      };
  
      // React to keepalive requests
      this.internalReceive$.pipe(
        filter(m => !!m),
        filter(m => m.type === "common.keepalive"),
        tap(m => this.send({type: "common.keepalive",sequenceId: m.sequenceId}))
        ).subscribe();
  
      // Handle Errors
      this.ws.onerror = ev => {
        console.log("Websocket Error:", ev);
      };
  
      // Handle Closure
      this.ws.onclose = ev => {
        console.log("Websocket closed:", ev);
        this.reconnect();
      };
    }
  
    private reconnect(): void {
      setTimeout(() => {
        console.log("Reconnecting WebSocket");
        this.createSocket();
      }, 5000);
    }
  
    private send(message: Message): void {
      this.ws.send(JSON.stringify(message));
    }
  }