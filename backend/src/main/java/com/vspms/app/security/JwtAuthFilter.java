package com.vspms.app.security;

import com.vspms.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.*; import jakarta.servlet.http.*;
import java.io.IOException;

@Component @RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
  private final JwtService jwtService;
  private final UserRepository userRepo;

  @Override
  protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
      throws ServletException, IOException {
    String header = req.getHeader("Authorization");
    if (header != null && header.startsWith("Bearer ")) {
      String token = header.substring(7);
      try {
        var jws = jwtService.parse(token);
        Long userId = Long.valueOf(jws.getBody().getSubject());
        var user = userRepo.findById(userId).orElse(null);
        if (user != null && user.isActive()) {
          var roles = user.getRoles().stream()
                          .map(r -> new SimpleGrantedAuthority("ROLE_" + r.getName()))
                          .toList();
          var auth = new UsernamePasswordAuthenticationToken(user.getEmail(), null, roles);
          SecurityContextHolder.getContext().setAuthentication(auth);
        }
      } catch (Exception ignored) {}
    }
    chain.doFilter(req, res);
  }
}
