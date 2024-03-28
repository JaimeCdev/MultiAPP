import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, LoadingController, Platform } from '@ionic/angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-detalle-pinboard',
  templateUrl: './detalle-pinboard.page.html',
  styleUrls: ['./detalle-pinboard.page.scss'],
})


export class DetallePinboardPage implements OnInit {

  @Input() multimedia: any;
  viewEntered: any;
  currentSlide = 0;
  @ViewChild("carrousel_item") carrousel_item?: ElementRef<HTMLDivElement>;


  constructor(private modalController: ModalController, private loadingController: LoadingController, private platform: Platform, private sanitizer: DomSanitizer) {}
  
  ngOnInit() {
    this.getSafeComponent();
    console.log(this.multimedia)
  }
  
  getSafeComponent() {
    this.multimedia.data[0].descripcion = this.sanitizer.bypassSecurityTrustHtml('Descripción: '+this.multimedia.data[0].descripcion);
  }

  ionViewDidEnter() {
    this.viewEntered = true;
    this.loadingController.dismiss();
  }

  ionViewWillLeave(){
    this.viewEntered = false;
  }

  back(){
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
    this.modalController.dismiss();
  }

  next() {
    if (this.currentSlide < this.multimedia.imagenes.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
  }

  previous() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.multimedia.imagenes.length - 1;
    }
  }

  async openModal(imgSrc: string) {
    const modal = await this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        'imgSrc': imgSrc
      }
    });
    return await modal.present();
  }

}
