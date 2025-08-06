package com.olx;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "OLX API", version = "1.0", description = "OLX API Documentation"))
public class OlxBackendApplication {

    public static void main(String[] args) {

        SpringApplication.run(OlxBackendApplication.class, args);
    }

}
