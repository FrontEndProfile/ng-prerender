import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiHandlerService } from '../shared/api-handler.service';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css'
})
export class CardDetailComponent {
    cardId: string;
    cardDetails: any;

    title: string = '';
    keywords: string = '';
  
    constructor(private route: ActivatedRoute,
       private cardService: ApiHandlerService,
       private meta: Meta,
    private titleService: Title
       ) {}
  
    ngOnInit(): void {
      this.cardId = this.route.snapshot.paramMap.get('name');
      this.cardService.getCardById(this.cardId).subscribe(data => {
        // console.log(data)
        this.cardDetails = data; // Assuming 'fields' is the key for card details in the API response
        this.updateSeo(data);
      });
    }

    updateSeo(data: any): void {
        this.title = data.card_name || 'Default Title'; // Replace 'seoTitle' with the actual field name
        this.keywords = data.card_name || 'default,keywords'; // Replace 'seoKeywords' with the actual field name
    
        this.titleService.setTitle(this.title);
        this.meta.updateTag({ name: 'description', content: data.seoDescription || 'Default Description' }); // Replace 'seoDescription' with the actual field name
        this.meta.updateTag({ name: 'keywords', content: this.keywords });
      }
}
