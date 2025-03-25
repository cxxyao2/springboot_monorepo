package com.jane.booknetworkapi.feedback;

import com.jane.booknetworkapi.book.Book;
import com.jane.booknetworkapi.book.BookRepository;
import com.jane.booknetworkapi.common.PageResponse;
import com.jane.booknetworkapi.exception.OperationNotPermittedException;
import com.jane.booknetworkapi.user.User;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    private final BookRepository bookRepository;
    private final FeedbackMapper feedbackMapper;
    private final FeedbackRepository feedbackRepository;

    public Integer save(@Valid FeedbackRequest request, Authentication connectedUser) {
        Book book = bookRepository.findById(request.bookId())
                .orElseThrow(() -> new EntityNotFoundException("Book not found with ID: " + request.bookId()));
        if(book.isArchived() || !book.isShareable()) {
            throw new OperationNotPermittedException("You cannot update shareable status of books owned by others");
        }

        User user = ((User) connectedUser.getPrincipal());
        if(Objects.equals(book.getOwner().getId(), user.getId())) {
            throw  new OperationNotPermittedException("You cannot give a feedback to your own book");
        }
        Feedback feedback = feedbackMapper.toFeedBack(request);
        return feedbackRepository.save(feedback).getId();
    }

    public PageResponse<FeedbackResponse> findAllFeedbacksByBook(Integer bookId, int page, int size, Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page, size);
        User user = ((User) connectedUser.getPrincipal());
        Page<Feedback> feedbacks = feedbackRepository.findAllByBookId(bookId, pageable);
        List<FeedbackResponse> feedbackResponses = feedbacks.stream()
                .map(f -> feedbackMapper.toFeedBackResponse(f, user.getId()))
                .toList();

        return new PageResponse<>(
                feedbackResponses,
                feedbacks.getNumber(),
                feedbacks.getSize(),
                feedbacks.getTotalElements(),
                feedbacks.getTotalPages(),
                feedbacks.isFirst(),
                feedbacks.isLast()
        );
    }
}

