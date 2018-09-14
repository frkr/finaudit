package com.github.frkr.finaudit.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

//https://www.vojtechruzicka.com/documenting-spring-boot-rest-api-swagger-springfox/
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
//                .paths(PathSelectors.any())
                .paths(PathSelectors.ant("/rs/**"))
                .build()
                .apiInfo(getApiInfo())
                ;
    }

    private ApiInfo getApiInfo() {
        return new ApiInfo( // FIXME
                "react-boot",
                "Booting React",
                "beta",
                "https://github.com/frkr/react-boot",
                new Contact("Davi Saranszky Mesquita", "https://github.com/frkr/react-boot", "davimesquita@gmail.com"),
                "IDK",
                "https://github.com/frkr/react-boot",
                Collections.emptyList()
        );
    }
}
