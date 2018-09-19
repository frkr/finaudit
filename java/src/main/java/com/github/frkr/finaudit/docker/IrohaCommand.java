package com.github.frkr.finaudit.docker;

public enum IrohaCommand {

    /**
     * Transaction
     */
    TX("1"),
    /**
     * Query
     */
    QRY("2"),
    /**
     * Status
     */
    ST("3");

    private String cmd;

    IrohaCommand(String cmd) {
        this.cmd = cmd;
    }

    public String getCmd() {
        return this.cmd;
    }
}
