package org.example.proiectps;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

//@SpringBootApplication
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class ProiectPsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProiectPsApplication.class, args);
    }

}
