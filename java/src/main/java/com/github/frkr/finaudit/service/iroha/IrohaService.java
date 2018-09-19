package com.github.frkr.finaudit.service.iroha;

import com.github.frkr.finaudit.docker.DockerCmd;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

@RestController
@RequestMapping("rs")
@Api(description = "Interface direta com o servidor")
@WebService
@CrossOrigin
public class IrohaService {

    @WebMethod
    //@WebResult(name = "TesteResponse")
    @ApiOperation(value = "Consultas ao blockchain", position = 2)
    @RequestMapping(value = "query", method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public String query(@WebParam(name = "QueryRequest") @RequestBody QueryRequest queryRequest) throws Exception {
        return new DockerCmd(queryRequest).cmd(queryRequest);
    }

    @WebMethod
    //@WebResult(name = "TesteResponse")
    @ApiOperation(value = "Envio de transações", position = 1)
    @RequestMapping(value = "trx", method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public String trx(@WebParam(name = "TransactionRequest") @RequestBody TransactionRequest transactionRequest) throws Exception {
        return new DockerCmd(transactionRequest).cmd(transactionRequest);
    }

    @WebMethod
    //@WebResult(name = "TesteResponse")
    @ApiOperation(value = "Status de transações", position = 2)
    @RequestMapping(value = "status", method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public String status(@WebParam(name = "StatusRequest") @RequestBody StatusRequest statusRequest) throws Exception {
        return new DockerCmd(statusRequest).cmd(statusRequest);
    }

}
