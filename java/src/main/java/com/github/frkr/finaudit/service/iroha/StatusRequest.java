package com.github.frkr.finaudit.service.iroha;

import com.github.frkr.finaudit.docker.IrohaStatus;

public class StatusRequest extends BaseRequest {
    private IrohaStatus status;
    private String hash;

    public IrohaStatus getStatus() {
        return status;
    }

    public void setStatus(IrohaStatus status) {
        this.status = status;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }
}
