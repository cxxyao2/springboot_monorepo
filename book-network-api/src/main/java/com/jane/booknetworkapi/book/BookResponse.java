package com.jane.booknetworkapi.book;


import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookResponse {
    private Integer id;
    private String title;
    private String authorName;
    private String isbn;
    private String synopsis;
    private String owner;

    private byte[] cover;
    private double rate;
    private boolean archived;
    private boolean shareable;

}
