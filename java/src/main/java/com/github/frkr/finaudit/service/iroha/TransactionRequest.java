package com.github.frkr.finaudit.service.iroha;

import com.github.frkr.finaudit.docker.IrohaTransaction;

public class TransactionRequest extends BaseRequest {
    private IrohaTransaction transaction;
    private String destination;
    private String asset;
    private String amount;
    private String precision;

    public IrohaTransaction getTransaction() {
        return transaction;
    }

    public void setTransaction(IrohaTransaction transaction) {
        this.transaction = transaction;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getAsset() {
        return asset;
    }

    public void setAsset(String asset) {
        this.asset = asset;
    }

    public String getPrecision() {
        return precision;
    }

    public void setPrecision(String precision) {
        this.precision = precision;
    }
}
