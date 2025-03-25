package com.jane.booknetworkapi.feedback;


import com.jane.booknetworkapi.book.Book;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class FeedbackMapper {
    public Feedback toFeedBack(FeedbackRequest request) {
        return Feedback.builder()
                .note(request.note())
                .comment(request.comment())
                .book(Book.builder()
                        .id(request.bookId())
                        .archived(false)  // Not required and has no impact, just to satisfy lombok
                        .shareable(false)
                        .build()
                )
                .build();
    }

    public FeedbackResponse toFeedBackResponse(Feedback feedback, Integer userId) {
        return FeedbackResponse.builder()
                .note(feedback.getNote())
                .comment(feedback.getComment())
                .ownFeedback(Objects.equals(feedback.getCreatedBy(), userId))
                .build();
    }
}
