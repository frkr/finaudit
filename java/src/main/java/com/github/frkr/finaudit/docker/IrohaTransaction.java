package com.github.frkr.finaudit.docker;

public enum IrohaTransaction implements StringCmd {
    /**
     * Detach role from account (detach)
     **/
    detach("1"),
    /**
     * Add new role to account (apnd_role)
     **/
    apnd_role("2"),
    /**
     * Create new role (crt_role)
     **/
    crt_role("3"),
    /**
     * Set account key/value detail (set_acc_kv)
     **/
    set_acc_kv("4"),
    /**
     * Transfer Assets (tran_ast)
     **/
    tran_ast("5"),
    /**
     * Grant permission over your account (grant_perm)
     **/
    grant_perm("6"),
    /**
     * Subtract Assets Quantity from Account (sub_ast_qty)
     **/
    sub_ast_qty("7"),
    /**
     * Set Account Quorum (set_qrm)
     **/
    set_qrm("8"),
    /**
     * Remove Signatory (rem_sign)
     **/
    rem_sign("9"),
    /**
     * Create Domain (crt_dmn)
     **/
    crt_dmn("10"),
    /**
     * Revoke permission from account (revoke_perm)
     **/
    revoke_perm("11"),
    /**
     * Create Account (crt_acc)
     **/
    crt_acc("12"),
    /**
     * Add Signatory to Account (add_sign)
     **/
    add_sign("13"),
    /**
     * Create Asset (crt_ast)
     **/
    crt_ast("14"),
    /**
     * Add Peer to Iroha Network (add_peer)
     **/
    add_peer("15"),
    /**
     * Add Asset Quantity (add_ast_qty)
     **/
    add_ast_qty("16");

    private final String cmd;

    IrohaTransaction(String cmd) {
        this.cmd = cmd;
    }

    public String getCmd() {
        return this.cmd;
    }

}
