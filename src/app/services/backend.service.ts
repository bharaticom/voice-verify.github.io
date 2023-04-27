import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ServerConstants } from '../constants/server.constants';
import { RestClient } from './rest-client.service';
import { Constants } from '../constants/constants';

@Injectable({
    providedIn: 'root'
})
export class BackendService {
  constructor(private restClient: RestClient) {}

  status(){
    return this.restClient.get(ServerConstants.STATUS);
  }

  createStream(){
    return this.restClient.post(ServerConstants.CREATE_STREAM, {});
  }

  sendDataToStream(uuid:any, data:any){
    return this.restClient.post(ServerConstants.SEND_DATA_TO_STREAM, {uuid: uuid, data: data});
  }

  enrole(uuid:any, id:any){
    return this.restClient.post(ServerConstants.ENROLL, {uuid: uuid, id: id});
  }

  voiceverify(uuid:any, id:any){
    return this.restClient.post(ServerConstants.VOICE_VERIFY, {uuid: uuid, id: id});
  }
}
