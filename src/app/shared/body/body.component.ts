import { Component, OnInit } from '@angular/core';
import {Video} from 'src/app/modules/Db'
import { from } from 'rxjs';
import { ServService } from 'src/app/modules/serv.service';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  videoList: Video[];

  constructor(public serservice : ServService) { }

  ngOnInit(): void {
    var x = this.serservice.getData();
    x.snapshotChanges().subscribe(item => {
      this.videoList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.videoList.push(y as Video);
      })
    })
  }

}
