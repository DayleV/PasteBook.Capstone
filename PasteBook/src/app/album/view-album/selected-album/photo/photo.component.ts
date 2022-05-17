import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  fileToUpload:File | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList){
    this.fileToUpload = files.item(0);
        //insert iteration for multiple files
    }
}
