import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Breed } from 'src/app/core/models';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  breed!: Breed;
  breedId!: string;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.breedId = params['id'];
      this.getBreedDetails(this.breedId);
    })
  }

  getBreedDetails(id: string) {
    this.http.getBreedDetails(id).subscribe((response: Breed) => {
      this.breed = response;
      console.log(this.breed)
    });
  }
}
