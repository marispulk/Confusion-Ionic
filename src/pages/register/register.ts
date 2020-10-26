import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Camera, CameraOptions } from "@ionic-native/camera";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm: FormGroup;
  image: string = 'assets/images/logo.png';


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    private camera: Camera,
    private formBuilder: FormBuilder) {

      this.registerForm = this.formBuilder.group({ // Form expected inputs and validators
        firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
        telnum: ['', [Validators.required, Validators.pattern]],
        email: ['', [Validators.required, Validators.email]]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  dismiss() {
    this.viewCtrl.dismiss(true); //this "true" parameter will be passed in back as a parameter for login model.

  }

  getPicture() {
    // Uses the camera plugin to obtain the picture from the camera
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 100,
      targetWidth: 100,
      correctOrientation: true,
      allowEdit: true, // Allows edit the image
      destinationType: this.camera.DestinationType.FILE_URI, //URI will save the image in a temporary storage on your device, and return the URI for the image.
      encodingType: this.camera.EncodingType.PNG, // What extension it allows to images


      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.FRONT
    };

    this.camera.getPicture(options) // To obtain the image form camera, we will say "this.camera" and "getPictures method". getPicture takes options as parameter.
    .then((imageData) => {

      // returns a promise, in which the return value is returned as parameter, which is called image data.(destinationType: this.camera.DestinationType.FILE_URI,)
      this.image = imageData;
      console.log(imageData);
      // If image data is returned, data is called ImageData.
    },
    (err) => {console.log('Error obtaining picture') }) // Error message
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.dismiss();
  }

  getFromLibrary() {
   this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL
   }).then((res) => {
     this.image = 'data: image/jpeg;base64,' + res;
   }).catch(e => {
     console.log(e);
   })

  }

}
