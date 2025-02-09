package lt.techin.lsf;

import lt.techin.lsf.persistance.UserRepository;
import lt.techin.lsf.persistance.modal.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class LietuvosSpaudosFotografijaApplication {
    public static void main(String[] args) {
        SpringApplication.run(LietuvosSpaudosFotografijaApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(UserRepository userRepository) {
        return runner -> {

            boolean isSaving = false;
//            boolean isSaving = true;

            User participant = User.builder()
                    .name("Mindaugas")
                    .surname("Karalius")
                    .birthYear(1999)
                    .email("mindaugas@karalius.lt")
                    .password("qwerty")
                    .phoneNumber("+37060000000")
                    .mediaName("15min")
                    .build();
            if (isSaving) {
                userRepository.save(participant);
            }

            User moderator = User.builder()
                    .name("Birute")
                    .surname("Bora")
                    .birthYear(1967)
                    .email("birute@bora.lt")
                    .password("qwerty")
                    .phoneNumber("+37060000000")
                    .mediaName(null)
                    .build();
            if (isSaving) {
                userRepository.save(moderator);
            }

            User jury = User.builder()
                    .name("Barbora")
                    .surname("Radvilaite")
                    .email("barbora@radvilaite.lt")
                    .password("qwerty")
                    .build();
            if (isSaving) {
                userRepository.save(jury);
            }

            User admin = User.builder()
                    .name("Zygimantas")
                    .surname("Augustas")
                    .email("zygimantas@augustas.lt")
                    .password("qwerty")
                    .build();
            if (isSaving) {
                userRepository.save(admin);
            }
        };
    }
}