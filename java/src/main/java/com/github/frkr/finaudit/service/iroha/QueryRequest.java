package com.github.frkr.finaudit.service.iroha;

import com.github.frkr.finaudit.docker.IrohaQuery;

public class QueryRequest extends BaseRequest {
    private IrohaQuery query;
    private String role;
    private String asset;

    public IrohaQuery getQuery() {
        return query;
    }

    public void setQuery(IrohaQuery query) {
        this.query = query;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getAsset() {
        return asset;
    }

    public void setAsset(String asset) {
        this.asset = asset;
    }
}
