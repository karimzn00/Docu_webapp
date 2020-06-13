import { Component, OnInit } from '@angular/core';
import { ServService } from '../serv.service'
import { NgForm, FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(public servservice : ServService) { }

  onSubmit (videoForm: NgForm){
    if(videoForm.value.$key == null) this.servservice.insertVideo(videoForm.value);
    else
    this.servservice.updateVideo(videoForm.value);

  };
  resetForm(videoForm?: NgForm){
    if (videoForm != null) videoForm.reset()
    this.servservice.selectedVideo = {
      $key: null,
      doc_title: '',
      doc_cat: '',
      doc_description: '',
      doc_image: '',
      doc_score: 0,
      doc_url: '',
    }
  }

  ngOnInit(): void {
    this.resetForm();

  }

}