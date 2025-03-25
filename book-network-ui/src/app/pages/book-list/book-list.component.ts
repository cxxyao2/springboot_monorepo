import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BookService} from '../../services/services/book.service';
import {PageResponseBookResponse} from '../../services/models/page-response-book-response';
import {CommonModule} from '@angular/common';
import {BookCardComponent} from '../book-card/book-card.component';
import {BookResponse} from '../../services/models/book-response';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  page = 0;
  size = 3;
  message: string = '';
  level: string = 'success';


  constructor(
    private bookService: BookService,
    private router: Router) {
  }

  ngOnInit() {
    this.findAllBooks();
  }


  private findAllBooks() {
    this.bookService.getAllBooks({
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

  borrowBook(book: BookResponse) {
    this.message = '';
    this.bookService.borrowBook({
      bookId: book.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = "Book successfully added to your list";
      },
      error: err => {
        this.level = 'error';
        this.message = JSON.stringify( err.error?.error  || err);
      }
    });


  }
}
