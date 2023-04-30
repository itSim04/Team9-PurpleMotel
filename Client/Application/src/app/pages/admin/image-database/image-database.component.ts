
import { Component } from '@angular/core';
import { ImagePickerConf } from 'ngp-image-picker';
import { InformationDatabaseService } from 'src/app/services/providers/information-database.service';
import { image_names } from 'src/app/services/utility/image-caching.service';

@Component({
  selector: 'app-image-database',
  templateUrl: './image-database.component.html',
  styleUrls: ['./image-database.component.scss']
})
export class ImageDatabaseComponent {

  onImageChange($event: any, image: { filename: string, base64: string; }, image_id: number) {

    if ($event) {

      if (image.filename) {

        const filename = image?.filename!.split('/')!;
        this.image_service.modifyImage($event, 'Assets', 'application', filename[filename.length - 1]).subscribe((result) => {

          this.images[image_id].base64 = $event.split(',')[1];

        });


      } else {

        this.image_service.storeImage($event, 'Assets', 'application',).subscribe((result) => {


          this.images[image_id] = {

            filename: result.data.filename,
            base64: $event.split(',')[1]

          };

          console.log(this.images);

        });
      }

    } else {

      console.log(image);
      const filename = image?.filename!;

      this.image_service.deleteImage(filename, 'Assets', 'application',).subscribe((result) => {

        const image = this.images.at(this.images.findIndex((data) => data.filename === image?.filename));

        if (image)
          image.base64 = '';

      });


    }
  }

  images: { filename: string, base64: string; }[] = [];

  imagePickerConf: ImagePickerConf = {

    borderRadius: '4px',
    language: 'en',
    width: '30vw',
    height: '30vh',
    aspectRatio: 8 / 6,
    hideAddBtn: true,

  };

  constructor (private image_service: InformationDatabaseService) { }

  ngOnInit() {

    this.image_service.browseImages('Assets', 'application').subscribe((result) => {

      // console.log(result.data);
      this.images = result.data.map(t => {

        console.log(t);
        const name = t.filename.split('/');
        // const raw_name = name.at(name.length - 1)?.split('.');
        return {

          filename: name.at(name.length - 1)!,
          base64: t.base64

        };
      });

      image_names.forEach((value) => {

        if (!this.images.find((data) => data.filename === value)) {

          this.images.push({

            filename: value,
            base64: ''

          });

        }

      });

    });
  }

}
