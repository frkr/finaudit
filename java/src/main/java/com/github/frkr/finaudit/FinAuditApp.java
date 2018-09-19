package com.github.frkr.finaudit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// XXX (versionamento de banco) @EnableJpaRepositories(repositoryFactoryBeanClass = EnversRevisionRepositoryFactoryBean.class)

@SpringBootApplication
public class FinAuditApp implements WebMvcConfigurer {
    public static void main(String[] args) {
        SpringApplication.run(FinAuditApp.class, args);
    }
}
