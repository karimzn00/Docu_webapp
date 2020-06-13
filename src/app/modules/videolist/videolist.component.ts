import { Component, OnInit } from '@angular/core';
import { Video } from '../Db'
import { ServService } from '../serv.service'



@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.scss']
})
export class VideolistComponent implements OnInit {
  videoList: Video[];

  constructor(public servservice : ServService) { }

ngOnInit(): void {
    var x = this.servservice.getData();
    x.snapshotChanges().subscribe(item => {
      this.videoList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.videoList.push(y as Video);
      })
    })
  }
  onEdit(vid: Video){
    this.servservice.selectedVideo = Object.assign({}, vid);
  }
  onDelete(vid : Video){
    this.servservice.deleteVideo(vid.$key);

  }

}
