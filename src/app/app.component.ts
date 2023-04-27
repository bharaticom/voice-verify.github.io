import { Component, OnInit } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';

import { BackendService } from './services/backend.service';
import { LoadingService } from './services/loading.service';

import { ToastrService } from 'ngx-toastr';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'voice-verify';
  fileData:any;

  selectedCall:any = {};

  agents:any = [{
    id: 1,
    name: 'Aleena Malik',
    url: '/assets/bmgcalls/Aleena 60 sec.mp3',
    play: false,
    file: 'Aleena 60 sec.mp3'

  },{
    id: 2,
    name: 'Raaj Sharma',
    url: '/assets/bmgcalls/Raj 60 sec.mp3',
    play: false,
    file: 'Raj 60 sec.mp3'
  },{
    id: 3,
    name: 'Rebecca Hilliard',
    url: '/assets/bmgcalls/Rebecca 60 sec.mp3',
    play: false,
    file: 'Rebecca 60 sec.mp3'
  }];


  identificationList:any = [{
    id: 4,
    name: 'Rebecca Hilliard',
    url: '/assets/bmgcalls/RebeccaHilliard-1.mp3',
    play: false,
    file: 'RebeccaHilliard-1.mp3',
    verfied: false
  },{
    id: 5,
    name: 'Rebecca Hilliard',
    url: '/assets/bmgcalls/RebeccaHilliard-2.mp3',
    play: false,
    file: 'RebeccaHilliard-2.mp3',
    verfied: false
  },{
    id: 6,
    name: 'Rebecca Hilliard',
    url: '/assets/bmgcalls/RebeccaHilliard-3.mp3',
    play: false,
    file: 'RebeccaHilliard-3.mp3',
    verfied: false
  },{
    id: 7,
    name: 'Rebecca Hilliard',
    url: '/assets/bmgcalls/RebeccaHilliard-4.mp3',
    play: false,
    file: 'RebeccaHilliard-4.mp3',
    verfied: false
  },{
    id: 9,
    name: 'Raaj Sharma',
    url: '/assets/bmgcalls/RaajSharma-1.mp3',
    play: false,
    file: 'RaajSharma-1.mp3',
    verfied: false
  },{
    id: 10,
    name: 'Raaj Sharma',
    url: '/assets/bmgcalls/RaajSharma-2.mp3',
    play: false,
    file: 'RaajSharma-2.mp3',
    verfied: false
  },{
    id: 1,
    name: 'Aleena Malik',
    url: '/assets/bmgcalls/AleenaMalik-1.mp3',
    file: 'AleenaMalik-1.mp3',
    play: false,
    verfied: false
  },{
    id: 2,
    name: 'Aleena Malik',
    url: '/assets/bmgcalls/AleenaMalik-2.mp3',
    file: 'AleenaMalik-2.mp3',
    play: false,
    verfied: false
  },{
    id: 3,
    name: 'Aleena Malik',
    url: '/assets/bmgcalls/AleenaMalik-3.mp3',
    file: 'AleenaMalik-3.mp3',
    play: false,
    verfied: false
  },{
    id: 8,
    name: 'Rebecca Hilliard',
    url: '/assets/bmgcalls/RebeccaHilliard-5.mp3',
    play: false,
    file: 'RebeccaHilliard-5.mp3',
    verfied: false
  },{
    id: 11,
    name: 'Raaj Sharma',
    url: '/assets/bmgcalls/RaajSharma-3.mp3',
    play: false,
    file: 'RaajSharma-3.mp3',
    verfied: false
  }];

  constructor(private backendService: BackendService, public http: HttpClient, private toastr: ToastrService, private loadingService: LoadingService) { }

  ngOnInit(): void {
    // this.readFile();
    // this.getStatus();
    // this.createStream();
    this.loadingService.apiStart();
    this.loadingService.apiStop();
  }

  createStream(callback:any){

    this.loadingService.apiStart();
    this.backendService.createStream().subscribe((result)=>{
      // this.sendDataToStream(result.uuid);
      callback(result.uuid);
      this.loadingService.apiStop();
    }, ()=>{
      this.loadingService.apiStop();
    });
  }

  getStatus(){
    this.backendService.status().subscribe((result)=>{
      console.log(result);
    }, ()=>{});
  }

  sendDataToStream(uuid:any, filename:any, callback:any){

    let payload = {
      file: filename
    };

    this.loadingService.apiStart();
    this.backendService.sendDataToStream(uuid, payload).subscribe((result)=>{
      console.log(result);
      callback(result);
      // this.enrole(uuid);
      // this.voiceverify(uuid);
      this.loadingService.apiStop();

    }, (error)=>{
      console.log(error);
      this.loadingService.apiStop();
    });
  }

  readFile(){
    this.http.get('assets/output.raw', { responseType: 'text' })
    .subscribe((data:any)=>{
      // console.log(data)
      this.fileData = data;
      // this.createStream();
    });
  }

  enrole(uuid:any){
    this.backendService.enrole(uuid, 4).subscribe((result)=>{
      console.log(result);

      this.voiceverify(uuid);
    }, (error)=>{
      console.log(error);
    });
  }

  voiceverify(uuid:any){
    this.backendService.voiceverify(uuid, this.selectedCall.agent).subscribe((result)=>{
      console.log(result);
    }, (error)=>{
      console.log(error);
    });
  }

  playPauseAudio(agent:any, id:any){
    agent.play ? $('#' + id)[0].pause() : $('#'  + id)[0].play();
    agent.play = !agent.play;
  }

  verifyCall(call:any){
    if(!call.agent){
      this.toastr.error('Please select agent first to verify call!');
      return;
    }

    this.selectedCall = call;
    call.verfied = true;
    // this.createStream();
    // this.createStream((uuid:any)=>{
    //   console.log(uuid);

    //   this.sendDataToStream(uuid, call.file, (streamDataResponse:any)=>{
    //     console.log("Sent data to stream");
    //     this.loadingService.apiStart();

    //     this.backendService.voiceverify(uuid, call.agent).subscribe((result)=>{
    //       console.log(result);
    //       if(result.result == 'verified'){
    //         call.verfied = true;
    //         this.toastr.success("verified");
    //       }else{
    //         call.verfied = false;
    //         this.toastr.error("Not verified");
    //       }
    //       this.loadingService.apiStop();
    //     }, (error)=>{
    //       console.log(error);
    //       this.loadingService.apiStop();
    //     });
    //   });
    // });
  }

  enroll(agent:any){
    this.createStream((uuid:any)=>{
      console.log(uuid);
      this.sendDataToStream(uuid, agent.file, (streamDataResponse:any)=>{
        console.log("Sent data to stream");
        this.loadingService.apiStart();
        this.backendService.enrole(uuid, agent.id).subscribe((result)=>{
          this.toastr.success(result.detail);
          this.loadingService.apiStop();
        }, (error)=>{
          console.log(error);
          this.loadingService.apiStop();
        });
      });
    });
  }
}
