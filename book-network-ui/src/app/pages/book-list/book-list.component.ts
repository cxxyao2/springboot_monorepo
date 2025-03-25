import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BookService} from '../../services/services/book.service';
import {PageResponseBookResponse} from '../../services/models/page-response-book-response';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  page = 0;
  size = 5;

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
}
