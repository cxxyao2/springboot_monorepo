package com.jane.booknetworkapi.auth;

import com.jane.booknetworkapi.user.Token;
import com.jane.booknetworkapi.user.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@AllArgsConstructor
public class CustomLogoutHandler implements LogoutHandler {
    private final TokenRepository tokenRepository;

    @Override
    public void logout(HttpServletRequest request,
                       HttpServletResponse response,
                       Authentication authentication) {
       String authHeader = request.getHeader("Authorization");
       if (authHeader == null || !authHeader.startsWith("Bearer ")) {
           return;
       }
       String token = authHeader.replace("Bearer ", "");

       Token storedToken = tokenRepository.findByToken(token).orElse(null);
       if (storedToken != null) {
           storedToken.setExpired(true);
           storedToken.setExpiresAt(LocalDateTime.now().plusDays(-1));
           tokenRepository.save(storedToken);
       }



    }
}
