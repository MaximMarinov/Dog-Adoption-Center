import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Breed } from 'src/app/core/models';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-dogs-list',
  templateUrl: './dogs-list.component.html',
  styleUrls: ['./dogs-list.component.css']
})
export class DogsListComponent implements OnInit {

  public breeds!: Array<Breed>;

  constructor(private http: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.http.getBreedsList().subscribe((breedList: Array<Breed>) => {
      this.breeds = breedList;
      console.log(this.breeds);
    });
  }

  openBreedDetails(id: string) {
    this.router.navigate(['details', id]);
  }

}
