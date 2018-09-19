package com.github.frkr.finaudit.docker;

public enum IrohaStatus implements StringCmd {

    /**
     * Get status of transaction
     **/
    get_tx_info("1");

    private final String cmd;

    IrohaStatus(String cmd) {
        this.cmd = cmd;
    }

    public String getCmd() {
        return this.cmd;
    }

}
