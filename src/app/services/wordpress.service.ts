import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ServerConstants } from '../constants/server.constants';
import { RestClient } from './rest-client.service';
import { Constants } from '../constants/constants';

@Injectable({
    providedIn: 'root'
})
export class WordPressService {
  constructor(private restClient: RestClient) {}

  postsData(id){
    return this.restClient.get(ServerConstants.POSTS + '?categories=' + id);
  }

  getVariationId(payload){
    return this.restClient.post(ServerConstants.GET_VARIATION_ID, payload);
  }
}
