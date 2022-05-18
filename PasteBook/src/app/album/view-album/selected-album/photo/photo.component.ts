import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from 'src/app/album/album.service';
import { ConfigurationService } from 'src/app/configuration/configuration.service';
import { IPhoto } from './model/photo';
import { PhotoService } from './photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  route: ActivatedRoute;
  currentAlbumId:string = '0';
  albumId:string = '0';
  selectedFile: File | null = null;
  serverResponse:string = '';
  apiUrl: string = "";
  // newPhoto: IPhoto = {
  //   albumId: 0,
  //   Image: null
  // }

  constructor(private photoService: PhotoService, private albumService: AlbumService, route: ActivatedRoute, public fb: FormBuilder, private http: HttpClient, private configService: ConfigurationService) { 
    this.route = route;
    this.apiUrl = this.configService.settings.apiUrl + '/Images/';
  }
  
  private options = { headers: new HttpHeaders().set('Content-Type', 'multipart/form-data') };

  ngOnInit(): void {
    //to assign current album page to albumId
    this.currentAlbumId = this.route.snapshot.paramMap.get('id')!;
    this.albumId = this.currentAlbumId;
    //this.newPhoto.albumId = Number(this.currentAlbumId);
    // this.uploadPhotoForm.controls['albumId'].setValue(this.currentAlbumId);
  }

  onFileSelected(event: any){
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(){
    this.photoService.addPhoto(this.selectedFile!, this.albumId).subscribe(response => this.serverResponse = response.toString());
  }

  
  // uploadPhotoForm = new FormGroup(
  //   {
  //     albumId: new FormControl(''),
  //     Image: new FormControl('',[Validators.required])
  //   }
  // )

  // @Output() customSubmit = new EventEmitter();

  // onSubmit(){
  //   this.customSubmit.emit(this.uploadPhotoForm.value);
  // }

  // uploadFile(files: FileList){
  //   //we can array file list here i = index;
  //   this.fileToUpload = files.item(0);
  //   this.uploadPhotoForm.patchValue({
  //     Image: this.fileToUpload
  //   })
  //   this.uploadPhotoForm.get('Image')!.updateValueAndValidity;
  // }

  // uploadPhotoToAlbum():void{
  //   this.photoService.addPhoto(this.newPhoto).subscribe(newPhoto => this.newPhoto = newPhoto);
  // }
}
