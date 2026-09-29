////package com.example.marketing.config;
////
////import com.example.marketing.entity.*;
////import com.example.marketing.repository.UserRepository;
////import lombok.RequiredArgsConstructor;
////import org.springframework.boot.CommandLineRunner;
////import org.springframework.security.crypto.password.PasswordEncoder;
////import org.springframework.stereotype.Component;
////
////@Component
////@RequiredArgsConstructor
////public class DataInitializer implements CommandLineRunner {
////
////    private final UserRepository userRepository;
////    private final PasswordEncoder encoder;
////
////    @Override
////    public void run(String... args) {
////        if (!userRepository.existsByEmail("admin@gmail.com")) {
////            userRepository.save(User.builder()
////                    .username("admin")
////                    .email("admin@gmail.com")
////                    .password(encoder.encode("admin123"))
////                    .fullName("Administrateur")
////                    .role(Role.ADMIN)
////                    .enabled(true)
////                    .build());
////        }
////    }
////}
//
//package com.example.marketing.config;
//
//import com.example.marketing.entity.*;
//import com.example.marketing.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//@Component
//@RequiredArgsConstructor
//public class DataInitializer implements CommandLineRunner {
//
//    private final UserRepository userRepository;
//    private final PasswordEncoder encoder;
//
//    @Override
//    public void run(String... args) {
//        System.out.println("🔍 Vérification de l'admin...");
//
//        boolean adminByEmail = userRepository.findByEmail("admin@gmail.com").isPresent();
//        boolean adminByUsername = userRepository.findByUsername("admin").isPresent();
//
//        System.out.println("   - existsByEmail(admin@gmail.com)  : " + adminByEmail);
//        System.out.println("   - existsByUsername(admin)         : " + adminByUsername);
//
//        if (adminByEmail || adminByUsername) {
//            System.out.println("ℹ️  Admin déjà présent, aucune création.");
//            return;
//        }
//
//        User admin = User.builder()
//                .username("admin")
//                .email("admin@gmail.com")
//                .password(encoder.encode("admin123"))
//                .fullName("Administrateur")
//                .role(Role.ADMIN)
//                .enabled(true)
//                .build();
//
//        userRepository.save(admin);
//        System.out.println("✅ Admin créé : admin@gmail.com / admin123");
//    }
//}

package com.example.marketing.config;

import com.example.marketing.entity.*;
import com.example.marketing.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    @Override
    public void run(String... args) {
        // ============================
        // 1️⃣ Créer l'ADMIN
        // ============================
        if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {
            userRepository.save(User.builder()
                    .username("admin")
                    .email("admin@gmail.com")
                    .password(encoder.encode("admin123"))
                    .fullName("Administrateur")
                    .role(Role.ADMIN)
                    .enabled(true)
                    .build());
            System.out.println("✅ ADMIN créé : admin@gmail.com / admin123");
        } else {
            System.out.println("ℹ️  ADMIN déjà présent.");
        }

        // ============================
        // 2️⃣ Créer un CLIENT de test
        // ============================
        if (userRepository.findByEmail("client1@gmail.com").isEmpty()) {
            User client = userRepository.save(User.builder()
                    .username("client1")
                    .email("client1@gmail.com")
                    .password(encoder.encode("client123"))
                    .fullName("Client Test")
                    .role(Role.CLIENT)
                    .enabled(true)
                    .build());
            System.out.println("✅ CLIENT créé : client1@gmail.com / client123 (ID = " + client.getId() + ")");
        } else {
            System.out.println("ℹ️  CLIENT déjà présent.");
        }

        // ============================
        // 3️⃣ Créer un CM (Community Manager) de test
        // ============================
        if (userRepository.findByEmail("cm@gmail.com").isEmpty()) {
            userRepository.save(User.builder()
                    .username("cm")
                    .email("cm@gmail.com")
                    .password(encoder.encode("cm123"))
                    .fullName("Community Manager")
                    .role(Role.CM)
                    .enabled(true)
                    .build());
            System.out.println("✅ CM créé : cm@gmail.com / cm123");
        } else {
            System.out.println("ℹ️  CM déjà présent.");
        }

        System.out.println("=== 📋 Utilisateurs en base ===");
        userRepository.findAll().forEach(u ->
                System.out.println("   ID=" + u.getId() + " | " + u.getEmail() + " | " + u.getRole())
        );
    }
}