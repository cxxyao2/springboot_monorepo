import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookResponse} from '../../services/models/book-response';
import {CommonModule} from '@angular/common';
import {RatingComponent} from '../rating/rating.component';


@Component({
  selector: 'app-book-card',
  imports: [
    CommonModule,
    RatingComponent,
  ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

  private _book: BookResponse = {};
  private _bookCover: string | undefined = undefined;
  private _manager: boolean = false;

  get book(): BookResponse {
    return this._book;
  }

  @Input()
  set book(value: BookResponse) {
    this._book = value;
  }


  get manager(): boolean {
    return this._manager;
  }

  @Input()
  set manager(value: boolean) {
    this._manager = value;
  }


  get bookCover(): string | undefined {
    if (this._book.cover) {
      return this.base64Image;  // 'data:image/png;base64,' +
    }
    return this.base64Image;
  }

  @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  onShowDetails() {
    this.details.emit(this._book);
  }

  onBorrow() {
    this.borrow.emit(this._book);
  }

  onAddToWaitingList() {
    this.addToWaitingList.emit(this._book);
  }

  onEdit() {
    this.edit.emit(this._book);
  }

  onShare() {
    this.share.emit(this._book);
  }

  onArchive() {

  }
}
