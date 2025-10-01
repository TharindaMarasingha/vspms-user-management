package com.vspms.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter; import lombok.Setter;
import java.util.*;

@Entity @Table(name="users") @Getter @Setter
public class User {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @Column(nullable=false) private String fullName;
  @Column(nullable=false, unique=true, length=191) private String email;
  @JsonIgnore
  @Column(nullable=false) private String passwordHash;
  private boolean isActive = true;

  @ManyToMany(fetch=FetchType.EAGER)
  @JoinTable(name="user_roles",
          joinColumns=@JoinColumn(name="user_id"),
          inverseJoinColumns=@JoinColumn(name="role_id"))
  private Set<Role> roles = new HashSet<>();
}
