package com.github.frkr.finaudit.service.iroha;

import com.github.frkr.finaudit.docker.IrohaQuery;

public class QueryRequest extends BaseRequest {
    private IrohaQuery qry;

    public IrohaQuery getQry() {
        return qry;
    }

    public void setQry(IrohaQuery qry) {
        this.qry = qry;
    }
}
