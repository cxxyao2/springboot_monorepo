package com.jane.booknetworkapi.user;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(length = 1000)
    private String token;


    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private LocalDateTime validatedAt;
    private boolean expired;

    @Enumerated(EnumType.STRING)
    private TokenType tokenType;

    @ManyToOne
    @JoinColumn(name = "user_Id", nullable = false)
    private User user;


}
