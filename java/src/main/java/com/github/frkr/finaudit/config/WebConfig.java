package com.github.frkr.finaudit.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// XXX com o spring security, a configuração vai pra lá
//https://www.baeldung.com/spring-cors
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    // @CrossOrigin
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
    }
}
