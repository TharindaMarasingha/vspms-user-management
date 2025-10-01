package com.vspms.app.config;

import com.vspms.app.domain.Role;
import com.vspms.app.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationRunner {
  private final RoleRepository roleRepository;

  @Override
  public void run(ApplicationArguments args) {
    List<String> defaultRoles = List.of("ADMIN", "SUPPLIER", "CUSTOMER");
    for (String name : defaultRoles) {
      roleRepository.findByName(name).orElseGet(() -> {
        Role r = new Role();
        r.setName(name);
        return roleRepository.save(r);
      });
    }
  }
}


