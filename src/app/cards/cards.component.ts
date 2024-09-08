import { Component } from '@angular/core';
import { ApiHandlerService } from '../shared/api-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
    cards: any[] = [];

    constructor(private cardService: ApiHandlerService, private router: Router) {}
  
    ngOnInit(): void {
      this.cardService.getAllCards().subscribe((data) => {
        this.cards = data;
        console.log(this.cards)
      });
    }
}
