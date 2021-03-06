package com.github.frkr.finaudit.config;

import com.github.frkr.finaudit.service.iroha.IrohaService;
import org.apache.cxf.Bus;
import org.apache.cxf.bus.spring.SpringBus;
import org.apache.cxf.ext.logging.LoggingFeature;
import org.apache.cxf.jaxws.EndpointImpl;
import org.apache.cxf.transport.servlet.CXFServlet;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.xml.ws.Endpoint;

@Configuration
public class WebServiceConfig {

    @Bean()
    public ServletRegistrationBean servletRegistrationBean() {
        return new ServletRegistrationBean(new CXFServlet(), "/ws/*");
    }

    @Bean(name = Bus.DEFAULT_BUS_ID)
    public SpringBus springBus() {
        SpringBus springBus = new SpringBus();
        return springBus;
    }

    @Bean
    public Endpoint SenhaServiceEndpoint() {
        EndpointImpl endpoint = new EndpointImpl(springBus(), new IrohaService());
        endpoint.getFeatures().add(new LoggingFeature()); // FIXME Desenvolvimento
        endpoint.publish("/IrohaService");
        return endpoint;
    }

}
