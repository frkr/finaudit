package com.github.frkr.finaudit.service;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.jws.WebMethod;
import javax.jws.WebResult;
import javax.jws.WebService;

@RestController
@RequestMapping("rs")
@Api(description = "somente para testes")
@WebService
public class TesteService { // FIXME

    @WebMethod
    //@WebResult(name = "TesteResponse")
    @ApiOperation("retorna uma string hardcoded")
    @RequestMapping(value = "teste", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String teste(
            /* @WebParam(name = "TesteRequest") */
    ) throws Exception {
        return "Funciona BOOT";
    }
}
