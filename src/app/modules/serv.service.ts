import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, observable, Subscriber } from 'rxjs';



export class Video {
  $key: string;
  doc_title:string;
  doc_cat:string;
  doc_image:string;
  doc_description:string;
  doc_url:string;
  doc_score:number;
}  
@Injectable({
  providedIn: 'root'
})
export class ServService {
  public signedIn: Observable<any>;
  videoList: AngularFireList<any>;
  selectedVideo: Video = new Video();
  constructor(
    private Db: AngularFireDatabase,
    public fs:AngularFirestore,
    public auth : AngularFireAuth
    ) {
      this.signedIn = new Observable((Subscriber) => {
        this.auth.onAuthStateChanged(Subscriber);
      });
     }

     async signIn(email : string, password : string){
       try {
         if (!email || !password) throw new console.error('invalid email and/or password');
         await this.auth.signInWithEmailAndPassword(email,password);
         return true;
         
       } catch(error) {

       }
     }
     async signOut(email : string, password : string){
      try {
        await this.auth.signOut();
        return true;
      }catch(error) {
         console.log('sign out failed', error);
         return false;
       }
     }
getData(){
  this.videoList = this.Db.list('videos');
  return this.videoList;
}
insertVideo(video : Video){
  this.videoList.push({
    doc_title: video.doc_title,
    doc_cat: video.doc_cat,
    doc_description: video.doc_description,
    doc_url: video.doc_url,
    doc_image: video.doc_image,
    doc_score: video.doc_score
  });
}
updateVideo(video : Video){
  this.videoList.update(video.$key,{
    doc_title: video.doc_title,
    doc_description: video.doc_description,
    doc_url: video.doc_url,
    doc_cat: video.doc_cat,
    doc_image: video.doc_image,
    doc_score: video.doc_score
  });
}
deleteVideo($key:string){
  this.videoList.remove($key);
}

}



  