package com.jane.booknetworkapi.history;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BookTransactionHistoryRepository extends JpaRepository<BookTransactionHistory, Integer> {

    @Query("""
    SELECT history FROM BookTransactionHistory history
    WHERE history.user.id = :userId
    """)
    Page<BookTransactionHistory> findBorrowedBooks(Pageable pageable, Integer userId);

    @Query("""
    SELECT history FROM BookTransactionHistory history
    WHERE history.book.owner.id = :userId
    """)
    Page<BookTransactionHistory> findReturnedBooks(Pageable pageable, Integer userId);


    @Query("""
    SELECT (COUNT(*) > 0) AS isBorrowed FROM BookTransactionHistory history
    WHERE history.user.id = :userId
    AND history.book.id = :bookId
    AND history.returnApproved = false
    """)
    boolean isAlreadyBorrowedByUser(Integer bookId, Integer userId);


    @Query("""
    SELECT history FROM BookTransactionHistory history
    WHERE history.user.id = :userId
    AND history.book.id = :bookId
    AND history.returnApproved = false
    AND history.returned = false
    """)
    Optional<BookTransactionHistory> findByBookIdAndUserId(Integer bookId, Integer userId);

    @Query("""
    SELECT history FROM BookTransactionHistory history
    WHERE history.book.owner.id = :ownerId
    AND history.book.id = :bookId
    AND history.returnApproved = false
    AND history.returned = true
    """)
    Optional<BookTransactionHistory> findByBookIdAndOwnerId(Integer bookId, Integer ownerId);
}
