package com.traveller.laos.config;

import com.traveller.laos.entity.Role;
import com.traveller.laos.entity.User;
import com.traveller.laos.repository.RoleRepository;
import com.traveller.laos.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Create roles
        Role userRole = null;
        Role adminRole = null;

        if (roleRepository.findByName("USER").isEmpty()) {
            userRole = new Role();
            userRole.setName("USER");
            userRole = roleRepository.save(userRole);
        } else {
            userRole = roleRepository.findByName("USER").get();
        }

        if (roleRepository.findByName("ADMIN").isEmpty()) {
            adminRole = new Role();
            adminRole.setName("ADMIN");
            adminRole = roleRepository.save(adminRole);
        } else {
            adminRole = roleRepository.findByName("ADMIN").get();
        }

        // Create default admin user
        if (userRepository.findByUsername("admin").isEmpty()) {
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setEmail("admin@example.com");
            adminUser.setPassword(passwordEncoder.encode("admin"));
            adminUser.setFullName("Administrator");
            adminUser.setRole(adminRole);
            userRepository.save(adminUser);
        }
    }
}
