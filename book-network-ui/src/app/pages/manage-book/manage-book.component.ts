import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookResponse} from '../../services/models/book-response';
import {BookCreateRequest} from '../../services/models/book-create-request'
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {BookService} from '../../services/services';

@Component({
  selector: 'app-manage-book',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent implements OnInit {
  base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

  bookService = inject(BookService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  bookRequest:BookCreateRequest = {
    authorName: '',
    isbn: '',
    shareable: true,
    synopsis: '',
    title: ''
  };
  errorMsg: string[]=[];
  selectedBookCover: any;
  selectedPicture: string | undefined = undefined;

  ngOnInit(): void {
    
   const bookId = this.activatedRoute.snapshot.params["bookId"];  
   if(bookId){
    this.bookService.getBookById({bookId}).subscribe(
      {
        next:(book: BookResponse)=>{
          this.bookRequest = {
            title: book.title as string, 
            authorName: book.authorName as string,
            isbn: book.isbn as string,
            synopsis: book.synopsis as string,
            shareable: book.shareable
          };
          if(book.cover){
            this.selectedPicture = 'data:image/jpg;base64,' + book.cover;
          }
        },
        error:(err)=>{}
      }
    );
   }
  }


  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];
    console.log(this.selectedBookCover);
    if(this.selectedBookCover){
      const reader:FileReader = new FileReader();
      reader.onload = (event: any) => {
        this.selectedPicture = reader.result as string;
      }
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  saveBook() {
    this.bookService.addNewBook({
      body: this.bookRequest
    }).subscribe({
      next:(bookId => {
        this.bookService.uploadBookCoverPicture({
          bookId: bookId,
          body: {
            file: this.selectedBookCover
          }
        }).subscribe({
          next:(bookId) =>{
            this.router.navigate(['/my-books']);
          }
        });
      }),
      error: (err) => {
        console.log(err); //validationErrors:[102]
      }
    });
  }
}
