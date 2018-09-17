package com.github.frkr.finaudit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
// XXX (versionamento de banco) @EnableJpaRepositories(repositoryFactoryBeanClass = EnversRevisionRepositoryFactoryBean.class)
public class ReactBootApp {
    public static void main(String... a) {
        SpringApplication.run(ReactBootApp.class, a);
    }
}
