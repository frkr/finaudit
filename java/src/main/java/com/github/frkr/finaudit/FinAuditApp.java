package com.github.frkr.finaudit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// XXX (versionamento de banco) @EnableJpaRepositories(repositoryFactoryBeanClass = EnversRevisionRepositoryFactoryBean.class)

@SpringBootApplication
public class FinAuditApp {
    public static void main(String[] args) {
        SpringApplication.run(FinAuditApp.class, args);
    }
}
