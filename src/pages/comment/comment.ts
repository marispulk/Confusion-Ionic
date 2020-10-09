import { CommentStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Comment } from "../../shared/comment";
import { Dish } from '../../shared/dish';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  commentForm: FormGroup;
  comment: Comment;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    ) {

      this.commentForm = this.formBuilder.group({
        author: ['', Validators.required],
        rating: '5',
        comment: ['', Validators.required]

      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    const date = new Date();
    this.comment.date = date.toISOString();
    console.log(this.comment);
    this.viewCtrl.dismiss(this.comment);
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }
}
