import { InformationDatabaseService } from './../../../services/providers/information-database.service';
import { Component } from '@angular/core';
import { ImagePickerConf } from 'ngp-image-picker';
import { image_names } from 'src/app/services/utility/image-caching.service';

@Component({
  selector: 'app-image-database',
  templateUrl: './image-database.component.html',
  styleUrls: ['./image-database.component.scss']
})
export class ImageDatabaseComponent {

  onImageChange($event: any, image: { filename: string, base64: string; }, image_id: number, location: 'application' | 'website') {

    if ($event) {

      if (image.filename) {

        const filename = image?.filename!.split('/')!;
        this.image_service.modifyImage($event, 'Assets', location.toString(), filename[filename.length - 1]).subscribe((result) => {

          if (!this.images[location == 'application' ? 0 : 1][image_id])
            this.images[location == 'application' ? 0 : 1][image_id] = { filename: image.filename, base64: $event.split(',')[1] };
          this.images[location == 'application' ? 0 : 1][image_id].base64 = $event.split(',')[1];

        });


      } else {

        this.image_service.storeImage($event, 'Assets', location.toString()).subscribe((result) => {


          this.images[location == 'application' ? 0 : 1][image_id] = {

            filename: result.data.filename,
            base64: $event.split(',')[1]

          };

  

        });
      }

    } else {

      const filename = image?.filename!;

      this.image_service.deleteImage(filename, 'Assets', location.toString()).subscribe((result) => {

        const image_old = this.images[location == 'application' ? 0 : 1].at(this.images[location == 'application' ? 0 : 1].findIndex((data) => data?.filename === image?.filename));

        if (image_old)
          image_old.base64 = '';

      });


    }
  }

  images: { filename: string, base64: string; }[][] = [[], []];

  imagePickerConf: ImagePickerConf = {

    borderRadius: '4px',
    language: 'en',
    width: '100%',
    height: '30vh',
    aspectRatio: 8 / 6,
    hideAddBtn: true,

  };

  constructor (private image_service: InformationDatabaseService) { }



  ionViewWillEnter() {

    this.downloadImages(0);
    this.downloadImages(1);

  }

  selected: 'application' | 'website' = 'application';

  onSegmentChange(event: any) {

    const selectedValue = event.detail.value;


    if (selectedValue === 'application') {
      this.selected = 'application';
    } else if (selectedValue === 'website') {
      this.selected = 'website';
    }
  }

  downloadImages(index: 0 | 1) {

    const location = !index ? 'website' : 'application';

    this.image_service.browseImages('Assets', location).subscribe((result) => {

      this.images[index] = result.data.map(t => {

        const name = t.filename.split('/');

        return {

          filename: name.at(name.length - 1)!,
          base64: t.base64

        };
      });


      image_names[index].forEach((value) => {

        if (!this.images[index].find((data) => data.filename === value)) {

          this.images[index].push({

            filename: value,
            base64: ''

          });

        }

      });

    });



  }

}
