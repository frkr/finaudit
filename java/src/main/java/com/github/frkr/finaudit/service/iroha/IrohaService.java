package com.github.frkr.finaudit.service.iroha;

import com.github.frkr.finaudit.docker.DockerCmd;
import com.github.frkr.finaudit.docker.IrohaCommand;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

@RestController
@RequestMapping("rs")
@Api(description = "Interface direta com o servidor")
@WebService
public class IrohaService {

    @WebMethod
    //@WebResult(name = "TesteResponse")
    @ApiOperation("Consultas ao blockchain")
    @RequestMapping(value = "query", method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public String query(@WebParam(name = "QueryRequest") @RequestBody QueryRequest queryRequest) throws Exception {
        return new DockerCmd(queryRequest.getAccn(), queryRequest.getAccnPriv(), queryRequest.getAccnPub(), queryRequest.getAccnPass(), queryRequest.getServer(), queryRequest.getTorii())
                .cmd(IrohaCommand.QRY, queryRequest.getQry());
    }
}
