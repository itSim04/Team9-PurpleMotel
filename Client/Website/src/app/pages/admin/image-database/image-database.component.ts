import { image_names } from './../../../services/utility/image-caching.service';
import { InformationDatabaseService } from './../../../services/providers/information-database.service';
import { Component } from '@angular/core';
import { ImagePickerConf } from 'ngp-image-picker';

@Component({
  selector: 'app-image-database',
  templateUrl: './image-database.component.html',
  styleUrls: ['./image-database.component.scss']
})
export class ImageDatabaseComponent {

  onImageChange($event: any, image: { filename: string, base64: string; }, image_id: number, location: 'website' | 'application') {

    if ($event) {

      if (image.filename) {

        const filename = image?.filename!.split('/')!;
        this.image_service.modifyImage($event, 'Assets', location.toString(), filename[filename.length - 1]).subscribe((result) => {

          this.images[location == 'website' ? 0 : 1][image_id].base64 = $event.split(',')[1];

        });


      } else {

        this.image_service.storeImage($event, 'Assets', location.toString()).subscribe((result) => {


          this.images[location == 'website' ? 0 : 1][image_id] = {

            filename: result.data.filename,
            base64: $event.split(',')[1]

          };

          console.log(this.images);

        });
      }

    } else {

      console.log(image);
      const filename = image?.filename!;

      this.image_service.deleteImage(filename, 'Assets', location.toString()).subscribe((result) => {

        const image = this.images[location == 'website' ? 0 : 1].at(this.images[location == 'website' ? 0 : 1].findIndex((data) => data.filename === image?.filename));

        if (image)
          image.base64 = '';

      });


    }
  }

  images: { filename: string, base64: string; }[][] = [[], []];

  imagePickerConf: ImagePickerConf = {

    borderRadius: '4px',
    language: 'en',
    width: '30vw',
    height: '30vh',
    aspectRatio: 8 / 6,
    hideAddBtn: true,

  };

  constructor(private image_service: InformationDatabaseService) { }



  ngOnInit() {

    this.downloadImages(0);
    this.downloadImages(1);

  }

  downloadImages(index: 0 | 1) {

    const location = index ? 'application' : 'website';

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
