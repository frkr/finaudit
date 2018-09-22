import React, {Component} from 'react';
import {CONTEXT} from './constants';
import "./Painel.css";

class Painel extends Component {

    constructor() {
        super();
        this.headersDefault = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };

        this.sendTrx = this.sendTrx.bind(this);
        this.sendQuery = this.sendQuery.bind(this);
        this.sendStatus = this.sendStatus.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            texto: "",
            accn: "admin@cliente1",
            accnPass: "",
            accnPriv: "f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70",
            accnPub:  "313a07e6384776ed95447710d15e59148473ccfc052a681317a72a69f2a49910",
            hash: "fdd85f506a57000471c159dabe5deba4338b1bc5f83c90c77fb875bef963f7a7",
            server: "irohad-zero",
            torii: "50051",
            status: "",
            role: "admin",
            asset: "conta1#cliente1",
            get_role_perm: "",
            get_ast_info: "",
            get_acc_tx: "",
            get_acc_ast_tx: "",
            get_roles: "",
            get_acc_sign: "",
            get_acc_ast: "",
            get_acc: "",
            amount: "100.0",
            destination: "admin@cliente2",
            precision: "2",
            tran_ast: "",
            crt_ast: "",
            add_ast_qty: ""
        };
    }

    componentWillMount() {
        if (localStorage.getItem('painel')) {
            this.setState(JSON.parse(localStorage.getItem("painel")));
        }
    }

    componentDidUpdate() {
        localStorage.setItem("painel", JSON.stringify(this.state));
    }

    sendStatus() {
        this.setState({status: ""});
        fetch(CONTEXT + "/rs/status", {
            method: 'post',
            headers: this.headersDefault,
            body: JSON.stringify({
                accn: this.state.accn,
                accnPass: this.state.accnPass,
                accnPriv: this.state.accnPriv,
                accnPub: this.state.accnPub,
                server: this.state.server,
                torii: this.state.torii,
                hash: this.state.hash,
                status: "get_tx_info"
            })
        }).then(res => res.text()).then(status => this.setState({status}));
    }

    sendQuery(bt) {
        const qry = bt.target.name;
        this.setState({[qry]: ""})
        fetch(CONTEXT + "/rs/query", {
            method: 'post',
            headers: this.headersDefault,
            body: JSON.stringify({
                accn: this.state.accn,
                accnPass: this.state.accnPass,
                accnPriv: this.state.accnPriv,
                accnPub: this.state.accnPub,
                server: this.state.server,
                torii: this.state.torii,
                query: qry,
                role: this.state.role,
                asset: this.state.asset
            })
        }).then(res => res.text()).then(resp => this.setState({[qry]: resp}));
    }

    sendTrx(bt) {
        const trx = bt.target.name;
        this.setState({[trx]: ""});
        fetch(CONTEXT + "/rs/trx", {
            method: 'post',
            headers: this.headersDefault,
            body: JSON.stringify({
                accn: this.state.accn,
                accnPass: this.state.accnPass,
                accnPriv: this.state.accnPriv,
                accnPub: this.state.accnPub,
                server: this.state.server,
                torii: this.state.torii,
                transaction: trx,
                destination: this.state.destination,
                asset: this.state.asset,
                amount: this.state.amount,
                precision: this.state.precision
            })
        }).then(res => res.text()).then(resp => this.setState({[trx]: resp}));
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <h3>Painel</h3>
                <h3>Base</h3>
                <table cellPadding="5" cellSpacing="0" border="1">
                    <tbody>
                    <tr>
                        <td>Usuario</td>
                        <td>Senha</td>
                        <td>Chave Privada</td>
                        <td>Chave Publica</td>
                        <td>Servidor</td>
                        <td>Porta</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="accn" value={this.state.accn} onChange={this.handleInputChange}/>
                        </td>
                        <td><input type="text" name="accnPass" value={this.state.accnPass}
                                   onChange={this.handleInputChange}/></td>
                        <td><input type="text" name="accnPriv" value={this.state.accnPriv}
                                   onChange={this.handleInputChange}/></td>
                        <td><input type="text" name="accnPub" value={this.state.accnPub}
                                   onChange={this.handleInputChange}/></td>
                        <td><input type="text" name="server" value={this.state.server}
                                   onChange={this.handleInputChange}/></td>
                        <td><input type="text" name="torii" value={this.state.torii} onChange={this.handleInputChange}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3>Status</h3>
                <table cellPadding="5" cellSpacing="0" border="1">
                    <tbody>
                    <tr>
                        <td>HASH Transa&ccedil;&atilde;o</td>
                        <td>
                            <button onClick={this.sendStatus}>Get Status</button>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="text" name="hash" value={this.state.hash} onChange={this.handleInputChange}/>
                        </td>
                        <td>
                            <pre>{this.state.status}</pre>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3>Transa&ccedil;&atilde;o</h3>
                <table cellPadding="5" cellSpacing="0" border="1">
                    <tbody>
                    <tr>
                        <td>Destino</td>
                        <td>Boleta</td>
                        <td>Valor</td>
                        <td>Precisao</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="destination" value={this.state.destination}
                                   onChange={this.handleInputChange}/></td>
                        <td><input type="text" name="asset" value={this.state.asset} onChange={this.handleInputChange}/>
                        </td>
                        <td><input type="text" name="amount" value={this.state.amount}
                                   onChange={this.handleInputChange}/></td>
                        <td><input type="text" name="precision" value={this.state.precision}
                                   onChange={this.handleInputChange}/></td>
                    </tr>
                    </tbody>
                </table>
                <table cellPadding="5" cellSpacing="0" border="1">
                    <tbody>
                    <tr>
                        <td className="small">1x Detach role from account (detach)
                            <br/>2x Add new role to account (apnd_role)
                            <br/>3x Create new role (crt_role)
                            <br/>4x Set account key/value detail (set_acc_kv)
                        </td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <button name="tran_ast" onClick={(button) => this.sendTrx(button)}>5. Transfer Assets
                                (tran_ast)
                            </button>
                        </td>
                        <td>
                            <pre>{this.state.tran_ast}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="small">6x Grant permission over your account (grant_perm)
                            <br/>7x Subtract Assets Quantity from Account (sub_ast_qty)
                            <br/>8x Set Account Quorum (set_qrm)
                            <br/>9x Remove Signatory (rem_sign)
                            <br/>10x Create Domain (crt_dmn)
                            <br/>11x Revoke permission from account (revoke_perm)
                            <br/>12x Create Account (crt_acc)
                            <br/>13x Add Signatory to Account (add_sign)
                        </td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <button name="crt_ast" onClick={(button) => this.sendTrx(button)}>14. Create Asset
                                (crt_ast)
                            </button>
                        </td>
                        <td>
                            <pre>{this.state.crt_ast}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="small">15x Add Peer to Iroha Network (add_peer)</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <button name="add_ast_qty" onClick={(button) => this.sendTrx(button)}>16. Add Asset Quantity
                                (add_ast_qty)
                            </button>
                        </td>
                        <td>
                            <pre>{this.state.add_ast_qty}</pre>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3>Query</h3>
                <table cellPadding="5" cellSpacing="0" border="1">
                    <tbody>
                    <tr>
                        <td>Role</td>
                        <td>Boleta</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="role" value={this.state.role} onChange={this.handleInputChange}/>
                        </td>
                        <td><input type="text" name="asset" value={this.state.asset} onChange={this.handleInputChange}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table cellPadding="5" cellSpacing="0" border="1">
                    <tbody>
                    <tr>
                        <td>
                            <button name="get_role_perm" onClick={(button) => this.sendQuery(button)}>1. Get all
                                permissions related to role (get_role_perm)
                            </button>
                        </td>
                        <td>
                            <pre>{this.state.get_role_perm}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="small">2x Get Transactions by transactions' hashes (get_tx)</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <button name="get_ast_info" onClick={(button) => this.sendQuery(button)}>3. Get information
                                about asset (get_ast_info)
                            </button>
                        </td>
                        <td>
                            <pre>{this.state.get_ast_info}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button name="get_acc_tx" onClick={(button) => this.sendQuery(button)}>4. Get Account's
                                Transactions (get_acc_tx)
                            </button>
                        </td>
                        <td>
                            <pre>{this.state.get_acc_tx}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button name="get_acc_ast_tx" onClick={(button) => this.sendQuery(button)}>5. Get Account's
                                Asset Transactions (get_acc_ast_tx)
                            </button>
                        </td>
                        <td>
                            <pre>{this.state.get_acc_ast_tx}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button name="get_roles" onClick={(button) => this.sendQuery(button)}>6. Get all current
                                roles in the system (get_roles)
                            </button>
                        </td>
                        <td>
                            <pre>{this.state.get_roles}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button name="get_acc_sign" onClick={(button) => this.sendQuery(button)}>7. Get Account's
                                Signatories (get_acc_sign)
                            </button>
                        </td>
                        <td>
                            <pre>{this.state.get_acc_sign}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button name="get_acc_ast" onClick={(button) => this.sendQuery(button)}>8. Get Account's
                                Assets (get_acc_ast)
                            </button>
                        </td>
                        <td>
                            <pre>{this.state.get_acc_ast}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button name="get_acc" onClick={(button) => this.sendQuery(button)}>9. Get Account
                                Information (get_acc)
                            </button>
                        </td>
                        <td>
                            <pre>{this.state.get_acc}</pre>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Painel;
