import { Component, Inject } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Dish } from "../../shared/dish";
import { Comment } from "../../shared/comment";
import { FavoriteProvider } from "../../providers/favorite/favorite";
import { ActionSheetController } from 'ionic-angular'
import { CommentPage } from '../comment/comment';



/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetController: ActionSheetController,
    public modalCtrl: ModalController,


    @Inject('BaseURL') private BaseURL,
    private toastCtrl: ToastController,
    private favoriteservice: FavoriteProvider) {
      this.dish = navParams.get('dish');
      this.favorite = this.favoriteservice.isFavorite(this.dish.id)
      this.numcomments = this.dish.comments.length;

      let total = 0;
      this.dish.comments.forEach(comment => total += comment.rating);
      this.avgstars = (total/this.numcomments). toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

    addToFavorites() {
      console.log("Adding to Favorites", this.dish.id);
      this.favorite = this.favoriteservice.addFavorite(this.dish.id);
      this.toastCtrl.create({
        message: 'Dish ' + this.dish.id + ' added as a favorite successfully',
        duration: 3000
      }).present();
    }

  /** Action sheet */

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      title: 'Select Actions',
      buttons: [
        {
          text: 'Add to Favorites',
          handler: () => {
            this.addToFavorites();
          }
        },
        {
          text: 'Add Comment',
          handler: () => {
            this.openComment();

          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  openComment() {
    let modal = this.modalCtrl.create(CommentPage); // See loob esmalt modali, siis lisab Modali sisse comment page (HTML sisu)
    modal.present(); // See toob modali nähtavale
    modal.onDidDismiss((commentForm) => { // Commentit sulgedes kontrollitakse kas
      if (commentForm) //commentFormis on andmed sees või suleti modal X nuputust.
        this.dish.comments.push(commentForm); // Kui andmed on commentFormis olemas, siis pushitakse comment vastava dishi comments arraysse.
      });
  }
}



