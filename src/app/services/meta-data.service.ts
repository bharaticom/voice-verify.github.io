import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class MetaData {

  constructor(private meta: Meta, private title: Title) {
  }

  addMetaTags(){

    /*General tag*/
    this.title.setTitle('Dysco');
    this.meta.addTag({ name: 'title', content: 'Dysco' });
    this.meta.addTag({ name: 'description', content: 'Designed to find | Your social network for professional discovery' });
    this.meta.addTag({ name: 'image', itemprop:"image", content: environment.S3_BASE_URL + 'production/assets/DyscoLogo.png' });
    this.meta.addTag({ name: 'url', content: window.location.href });

    /*Facebook*/
    this.meta.addTag({ property: 'og:title', content: 'Dysco' });
    this.meta.addTag({ property: 'og:type', content: 'article' });
    this.meta.addTag({ property: 'og:site_name', content: 'https://dysco.in' });
    this.meta.addTag({ property: 'og:description', content: 'Designed to find | Your social network for professional discovery' });
    this.meta.addTag({ property: 'og:url', content: window.location.href });
    this.meta.addTag({ property: 'og:image', itemprop:"image", content:  environment.S3_BASE_URL + 'production/assets/DyscoLogo.png' });
    this.meta.addTag({ property: 'og:image:width', content: '300' });
    this.meta.addTag({ property: 'og:image:height', content: '300' });

    /*Twitter*/
    this.meta.addTag({ property: 'twitter:title', content: 'Dysco' });
    this.meta.addTag({ property: 'twitter:site', content: '@dyscoin' });
    this.meta.addTag({ property: 'twitter:description', content: 'Designed to find | Your social network for professional discovery' });
    this.meta.addTag({ property: 'twitter:image', itemprop:"image", content:  environment.S3_BASE_URL + 'production/assets/DyscoLogo.png' });
  }

  updateMetaTags(data){

    let url = (data.endpoint != undefined && data.endpoint != null && data.endpoint != '') ? environment.APP_END_POINT + (data.user_level == Constants.DYSCO_USER ? 'blurb/' : 'user/' + data.username + '/') + data.endpoint : window.location.href;

    /*General*/
    this.title.setTitle(data.title || 'Dysco');
    this.meta.updateTag({ name: 'title', content: data.title != undefined ? data.title.replace(/['"]+/g, '')  : 'Dysco' });
    this.meta.updateTag({ name: 'description', content: data.description != undefined ? data.description.replace(/['"]+/g, '') : 'Designed to find | Your social network for professional discovery' });
    this.meta.updateTag({ name: 'image', itemprop:"image", content: data.feature_img || data.postimage || environment.S3_BASE_URL + 'production/assets/DyscoLogo.png'});
    this.meta.updateTag({ name: 'url', content: url});

    /*Facebook*/
    this.meta.updateTag({ property: 'og:title', content: data.title != undefined ? data.title.replace(/['"]+/g, '') : 'Dysco'});
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:description', content: data.description != undefined ? data.description.replace(/['"]+/g, '') : 'Designed to find | Your social network for professional discovery'});
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', itemprop:"image", content:  data.feature_img || data.postimage || environment.S3_BASE_URL + 'production/assets/DyscoLogo.png' });
    this.meta.updateTag({ property: 'og:image:width', content: '300' });
    this.meta.updateTag({ property: 'og:image:height', content: '300' });

    /*Twitter*/
    this.meta.updateTag({ property: 'twitter:title', content: data.title != undefined ? data.title.replace(/['"]+/g, '') : 'Dysco' });
    this.meta.updateTag({ property: 'twitter:site', content: '@dyscoin' });
    this.meta.updateTag({ property: 'twitter:description', content: data.description != undefined ? data.description.replace(/['"]+/g, '') : 'Designed to find | Your social network for professional discovery' });
    this.meta.updateTag({ property: 'twitter:image', itemprop:"image", content:  data.feature_img || data.postimage  || environment.S3_BASE_URL + 'production/assets/DyscoLogo.png'});
  }

  addNoIndexTag(){
    this.meta.addTag({ name: 'robots', content: 'noindex' });
  }

  removeNoIndexTag(){
    this.meta.removeTag("name='robots'");
  }
}
