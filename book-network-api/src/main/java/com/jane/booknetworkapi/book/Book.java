package com.jane.booknetworkapi.book;

import com.jane.booknetworkapi.common.BaseEntity;
import com.jane.booknetworkapi.feedback.Feedback;
import com.jane.booknetworkapi.history.BookTransactionHistory;
import com.jane.booknetworkapi.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Book extends BaseEntity {

    private String title;
    private String authorName;
    private String isbn;
    private String synopsis;
    private String bookCover;
    private boolean archived;
    private boolean shareable;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "book")
    private List<Feedback> feedbacks;


    @OneToMany(mappedBy = "book")
    private List<BookTransactionHistory > histories;



}
