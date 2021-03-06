package com.github.frkr.finaudit.service.iroha;

import io.swagger.annotations.ApiModelProperty;

public class BaseRequest {

    private String accn;
    private String accnPriv;
    private String accnPub;
    private String accnPass;
    private String server;
    private String torii;
    private String send;

    public String getAccn() {
        return accn;
    }

    public void setAccn(String accn) {
        this.accn = accn;
    }

    public String getAccnPriv() {
        return accnPriv;
    }

    public void setAccnPriv(String accnPriv) {
        this.accnPriv = accnPriv;
    }

    public String getAccnPub() {
        return accnPub;
    }

    public void setAccnPub(String accnPub) {
        this.accnPub = accnPub;
    }

    public String getAccnPass() {
        return accnPass;
    }

    public void setAccnPass(String accnPass) {
        this.accnPass = accnPass;
    }

    public String getServer() {
        return server;
    }

    public void setServer(String server) {
        this.server = server;
    }

    public String getTorii() {
        return torii;
    }

    public void setTorii(String torii) {
        this.torii = torii;
    }

    @ApiModelProperty("Não enviar para o servidor. Retorna um JSON assinado")
    public String getSend() {
        return send;
    }

    public void setSend(String send) {
        this.send = send;
    }
}
