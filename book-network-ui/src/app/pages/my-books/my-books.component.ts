import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {BookService} from '../../services/services/book.service';
import {PageResponseBookResponse} from '../../services/models/page-response-book-response';
import {CommonModule} from '@angular/common';
import {BookCardComponent} from '../book-card/book-card.component';
import {BookResponse} from '../../services/models/book-response';

@Component({
  selector: 'app-my-books',
  imports: [
    BookCardComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  page = 0;
  size = 3;
  message: string = '';


  constructor(
    private bookService: BookService,
    private router: Router) {
  }

  ngOnInit() {
    this.findAllBooks();
  }


  private findAllBooks() {
    this.bookService.getAllBooksByOwner({
      page: this.page,
      size: this.size
    }).subscribe({
      next: books => {
        console.log("get book")
        console.log(books);
        this.bookResponse = books;
      },
      error: err => {
        console.log("error getting book");
        console.log(err);
      }
    })
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  goPreviousPage() {
    this.page--;
    this.findAllBooks();
  }

  gotoPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  goNextPage() {
    this.page++;
    this.findAllBooks();
  }

  goLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooks();
  }

  get isLastPage(): boolean {
    return this.page === this.bookResponse.totalPages as number - 1;
  }

  archiveBook(book: BookResponse){

  }

  shareBook(book: BookResponse){

  }

  editBook(book: BookResponse){
    alert("Edit Book");
    this.router.navigate(['/manage', book.id]);

  }
}


