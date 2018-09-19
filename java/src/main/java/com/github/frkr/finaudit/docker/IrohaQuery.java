package com.github.frkr.finaudit.docker;

public enum IrohaQuery implements StringCmd {
    /**
     * Get all permissions related to role
     **/
    get_role_perm("1"),

    /**
     * Get Transactions by transactions' hashes
     **/
    get_tx("2"),

    /**
     * Get information about asset
     **/
    get_ast_info("3"),

    /**
     * Get Account's Transactions
     **/
    get_acc_tx("4"),

    /**
     * Get Account's Asset Transactions
     **/
    get_acc_ast_tx("5"),

    /**
     * Get all current roles in the system
     **/
    get_roles("6"),

    /**
     * Get Account's Signatories
     **/
    get_acc_sign("7"),

    /**
     * Get Account's Assets
     **/
    get_acc_ast("8"),

    /**
     * Get Account Information
     **/
    get_acc("9");

    private final String cmd;

    IrohaQuery(String cmd) {
        this.cmd = cmd;
    }

    public String getCmd() {
        return this.cmd;
    }
}
