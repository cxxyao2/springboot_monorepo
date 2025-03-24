
package com.jane.booknetworkapi.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("demo")
public class DemoController {
    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> getDemo(Authentication authentication)  {
        String username=authentication.getName();
        String role=authentication.getAuthorities().toString();
        return new ResponseEntity<>("Get Demo!", HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> postDemo(){
        return new ResponseEntity<>("Post Demo", HttpStatus.OK);
    }
}
