package com.github.frkr.finaudit.service;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("rs")
@Api(description = "somente para testes")
public class Teste { // FIXME

    @ApiOperation("retorna uma string hardcoded")
    @RequestMapping(value = "teste", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String teste() throws Exception {
        return "Funciona";
    }
}
