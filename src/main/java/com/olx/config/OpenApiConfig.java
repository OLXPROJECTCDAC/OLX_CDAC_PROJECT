// File: src/main/java/com/olx/config/OpenApiConfig.java
package com.olx.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {

    @Bean
    OpenAPI olxOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("OLX Backend API")
                .version("1.0")
                .description("API documentation for the OLX backend project"));
    }
}
