import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  createForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    image: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required)
  });

}
