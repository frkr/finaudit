import React, {Component} from 'react';
import "purecss/build/pure.css"
import "./Cliente.css";
import {CONTEXT} from "./constants";

class Cliente extends Component {

    constructor() {
        super();
        this.headersDefault = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.criarAtivoDinheiro = this.criarAtivoDinheiro.bind(this);
        this.sendTrx = this.sendTrx.bind(this);
        this.sendQuery = this.sendQuery.bind(this);
        this.sendStatus = this.sendStatus.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
        this.checkTrx = this.checkTrx.bind(this);

        this.state = {
            server: "irohad-zero",
            torii: "50051",
            assetCliente: "conta80#cliente1",
            assetClienteConta: "usrfinan@cliente1",
            assetClienteSenha: "",
            assetClientePriv: "7e00405ece477bb6dd9b03a78eee4e708afc2f5bcdce399573a5958942f4a390",
            assetClientePub: "716fe505f69f18511a1b083915aa9ff73ef36e6688199f3959750db38b8f4bfc",
            assetClienteAmount: "100.00",
            assetClienteDestination: "admin@central",
            assetClienteTxt: "",
            assetClienteTxt2: "",
            getCentralTxConta: "admin@central",
            getCentralTxSenha: "",
            getCentralTxPriv: "f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70",
            getCentralTxPub: "313a07e6384776ed95447710d15e59148473ccfc052a681317a72a69f2a49910",
            getCentralTxTxt: "",
            getCentralTxTxt2: "",
            getCentralTxAmount: "97.00",
            getCentralTxDestination: "usrfinan@cliente1",
            getCentralTxAsset: "conta80#cliente1"
        };
    }

    resetarTela(e) {
        e.preventDefault();
        localStorage.clear();
        window.location = "/";
    }

    checkStatus(fnc, msg, hash, accn, accnPass, accnPriv, accnPub) {
        this.sendStatus(
            msg,
            hash,
            accn,
            accnPass,
            accnPriv,
            accnPub
        );

        let loopCountStatus = 1;
        let loopFncStatus = (status) => {
            if (loopCountStatus === 4) {
                alert("Erro: criarAtivoDinheiro. loopCount == 4 STATUS");
            } else {
                let idx = this.state[msg].indexOf("DETAIL:");
                if (idx === -1) {
                    idx = this.state[msg].indexOf("commit");
                    if (idx === -1) {

                        this.sendStatus(
                            msg,
                            status,
                            accn,
                            accnPass,
                            accnPriv,
                            accnPub
                        );

                        loopCountStatus++;
                        setTimeout(() => loopFncStatus(status), loopCountStatus * 5 * 1000);
                    } else {
                        fnc();
                    }
                } else {
                    this.setState({
                        [msg]: this.state[msg].substring(idx + 7).trim()
                    });
                }

            }
        };
        setTimeout(() => loopFncStatus(hash), 1000);
    }

    checkQuery(fnc, msg, qry, accn, accnPass, accnPriv, accnPub, role, asset) {
        this.sendQuery(
            msg,
            qry,
            accn,
            accnPass,
            accnPriv,
            accnPub,
            role,
            asset
        );

        setTimeout(() => fnc(), 1000);
    }

    liquidarAtivo(e) {
        e.preventDefault();
        const tgt = e.target;
        tgt.disabled = "disabled";

        this.setState({getCentralTxTxt2: ""});

        this.checkTrx(
            () => tgt.disabled = "",
            "getCentralTxTxt2",
            "tran_ast",
            this.state.getCentralTxConta,
            this.state.getCentralTxSenha,
            this.state.getCentralTxPriv,
            this.state.getCentralTxPub,
            this.state.getCentralTxDestination,
            this.state.getCentralTxAsset,
            this.state.getCentralTxAmount
        );
    }

    criarAtivoDinheiro(e) {
        e.preventDefault();
        const tgt = e.target;
        tgt.disabled = "disabled";

        // Criar asset: crt_ast
        // Verificar se esta ok
        // Adicionar dinheiro: add_ast_qty
        // Verificar se esta ok

        this.setState({assetClienteTxt: ""});
        const el = document.getElementById("assetClienteTxt");
        el.classList.remove("invisible");

        this.checkTrx(
            () => this.checkTrx(
                () => this.checkTrx(
                    () => this.checkQuery(
                        () => tgt.disabled = "",
                        "assetClienteTxt",
                        "get_acc_ast_tx",
                        this.state.assetClienteConta,
                        this.state.assetClienteSenha,
                        this.state.assetClientePriv,
                        this.state.assetClientePub,
                        "",
                        this.state.assetCliente
                    ),
                    "assetClienteTxt",
                    "tran_ast",
                    this.state.assetClienteConta,
                    this.state.assetClienteSenha,
                    this.state.assetClientePriv,
                    this.state.assetClientePub,
                    this.state.assetClienteDestination,
                    this.state.assetCliente,
                    this.state.assetClienteAmount
                ),
                "assetClienteTxt",
                "add_ast_qty",
                this.state.assetClienteConta,
                this.state.assetClienteSenha,
                this.state.assetClientePriv,
                this.state.assetClientePub,
                "",
                this.state.assetCliente,
                this.state.assetClienteAmount,
                ""
            ),
            "assetClienteTxt",
            "crt_ast",
            this.state.assetClienteConta,
            this.state.assetClienteSenha,
            this.state.assetClientePriv,
            this.state.assetClientePub,
            "",
            this.state.assetCliente,
            "",
            "2"
        );
    }

    popularAsset(e, dst, accn, accnPass, accnPriv, accnPub, asset) {
        e.preventDefault();
        const tgt = e.target;
        tgt.disabled = "disabled";

        this.setState({[dst]: ""});
        const el = document.getElementById(dst);
        el.classList.remove("invisible");

        this.checkQuery(
            () => tgt.disabled = "",
            dst,
            "get_acc_ast_tx",
            accn,
            accnPass,
            accnPriv,
            accnPub,
            "",
            asset
        );
    }

    popularAccountAsset(e, dst, accn, accnPass, accnPriv, accnPub) {
        e.preventDefault();
        const tgt = e.target;
        tgt.disabled = "disabled";

        this.setState({[dst]: ""});
        const el = document.getElementById(dst);
        el.classList.remove("invisible");

        this.checkQuery(
            () => tgt.disabled = "",
            dst,
            "get_acc_ast",
            accn,
            accnPass,
            accnPriv,
            accnPub,
            ""
        );
    }

    checkTrx(fnc, msg, trx, accn, accnPass, accnPriv, accnPub, destination, asset, amount, precision) {
        this.sendTrx(
            msg,
            trx,
            accn,
            accnPass,
            accnPriv,
            accnPub,
            destination,
            asset,
            amount,
            precision
        );

        let loopCountTrx = 1;
        let loopFncTrx = () => {
            if (loopCountTrx === 4) {
                alert("Erro: criarAtivoDinheiro. loopCount == 4 Check TRX");
            } else {
                let idx = this.state[msg].indexOf("Its hash is ");
                if (idx === -1) {
                    loopCountTrx++;
                    setTimeout(loopFncTrx, loopCountTrx * 5 * 1000);
                } else {
                    let status = this.state[msg].substring(idx + 11).trim();
                    this.setState({
                        [msg]: status
                    });
                    this.checkStatus(
                        fnc,
                        msg,
                        status,
                        accn,
                        accnPass,
                        accnPriv,
                        accnPub
                    );
                }
            }
        };
        setTimeout(loopFncTrx, 1000);
    }

    sendStatus(msg, hash, accn, accnPass, accnPriv, accnPub) {
        fetch(CONTEXT + "/rs/status", {
            method: 'post',
            headers: this.headersDefault,
            body: JSON.stringify({
                accn: accn,
                accnPass: accnPass,
                accnPriv: accnPriv,
                accnPub: accnPub,
                server: this.state.server,
                torii: this.state.torii,
                send: "true",
                hash: hash,
                status: "get_tx_info"
            })
        }).then(res => res.text()).then(status => this.setState({[msg]: status}));
    }

    sendQuery(msg, qry, accn, accnPass, accnPriv, accnPub, role, asset) {
        fetch(CONTEXT + "/rs/query", {
            method: 'post',
            headers: this.headersDefault,
            body: JSON.stringify({
                accn: accn,
                accnPass: accnPass,
                accnPriv: accnPriv,
                accnPub: accnPub,
                server: this.state.server,
                torii: this.state.torii,
                send: "true",
                query: qry,
                role: role,
                asset: asset
            })
        }).then(res => res.text()).then(resp => this.setState({[msg]: resp}));
    }

    sendTrx(msg, trx, accn, accnPass, accnPriv, accnPub, destination, asset, amount, precision) {
        fetch(CONTEXT + "/rs/trx", {
            method: 'post',
            headers: this.headersDefault,
            body: JSON.stringify({
                accn: accn,
                accnPass: accnPass,
                accnPriv: accnPriv,
                accnPub: accnPub,
                server: this.state.server,
                torii: this.state.torii,
                send: "true",
                transaction: trx,
                destination: destination,
                asset: asset,
                amount: amount,
                precision: precision
            })
        }).then(res => res.text()).then(resp => this.setState({[msg]: resp}));
    }

    componentWillMount() {
        if (localStorage.getItem('cliente')) {
            this.setState(JSON.parse(localStorage.getItem("cliente")));
        }
    }

    componentDidUpdate() {
        localStorage.setItem("cliente", JSON.stringify(this.state));
    }

    toggle(e, frm) {
        e.preventDefault();
        const el = document.getElementById(frm);
        if (el.classList.contains("invisible")) {
            el.classList.remove("invisible");
            e.target.innerText = "-";
        } else {
            el.classList.toggle("invisible");
            e.target.innerText = "+";
        }
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
                <form className="pure-form pure-form-aligned">
                    <fieldset>
                        <legend>Configuração básica <button className="button-small-extra pure-button"
                                                            onClick={(e) => this.toggle(e, "frmCfg")}>+</button>
                        </legend>
                        <div className="invisible" id="frmCfg">
                            <div className="pure-control-group">
                                <label htmlFor="txtserver">Servidor Destino</label>
                                <input id="txtserver" type="text" placeholder="Servidor Destino" name="server"
                                       value={this.state.server}
                                       onChange={this.handleInputChange}/>
                            </div>

                            <div className="pure-control-group">
                                <label htmlFor="txttorii">Porta</label>
                                <input id="name" type="text" placeholder="Porta" name="torii"
                                       value={this.state.torii}
                                       onChange={this.handleInputChange}/>
                            </div>

                            <div className="pure-controls">
                                <button className="pure-button pure-button-primary"
                                        onClick={(e) => this.resetarTela(e)}>Resetar Tela
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </form>
                <form className="pure-form pure-form-aligned">
                    <fieldset>
                        <legend>A) Cliente: Criar ativo, adicionar valor e transferir <button
                            className="button-small-extra pure-button"
                            onClick={(e) => this.toggle(e, "frmAssetMoney")}>+</button>
                        </legend>
                        <div className="invisible" id="frmAssetMoney">
                            <div className="pure-control-group">
                                <label htmlFor="txtcriarativoDestino">Conta destino</label>

                                <input id="txtcriarativoDestino" type="text" placeholder="Conta destino"
                                       name="assetClienteDestination"
                                       value={this.state.assetClienteDestination}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="txtcriarativodinheiroNome">Nome ativo</label>

                                <input id="txtcriarativodinheiroNome" type="text" placeholder="Nome ativo"
                                       name="assetCliente"
                                       value={this.state.assetCliente}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="txtcriarativodinheiroAmount">Valor</label>

                                <input id="txtcriarativodinheiroAmount" type="text" placeholder="Valor"
                                       name="assetClienteAmount"
                                       value={this.state.assetClienteAmount}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="txtcriarativoConta">Conta cliente</label>

                                <input id="txtcriarativoConta" type="text" placeholder="Conta cliente"
                                       name="assetClienteConta"
                                       value={this.state.assetClienteConta}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="txtcriarativoSenha">Senha</label>

                                <input id="txtcriarativoSenha" type="password" placeholder="Senha"
                                       name="assetClienteSenha"
                                       value={this.state.assetClienteSenha}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="txtcriarativoPriv">Chave privada</label>

                                <input id="txtcriarativoPriv" type="text" placeholder="Chave privada"
                                       name="assetClientePriv"
                                       value={this.state.assetClientePriv}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="txtcriarativoPublic">Chave publica</label>

                                <input id="txtcriarativoPublic" type="text" placeholder="Chave publica"
                                       name="assetClientePub"
                                       value={this.state.assetClientePub}
                                       onChange={this.handleInputChange}/>
                            </div>

                            <div className="pure-controls">
                                <button className="pure-button pure-button-primary"
                                        onClick={(e) => this.criarAtivoDinheiro(e)}>Criar ativo com dinheiro
                                </button>
                            </div>
                            <div className="pure-controls">
                                <button className="pure-button pure-button-primary"
                                        onClick={(e) => this.popularAsset(
                                            e,
                                            "assetClienteTxt",
                                            this.state.assetClienteConta,
                                            this.state.assetClienteSenha,
                                            this.state.assetClientePriv,
                                            this.state.assetClientePub,
                                            this.state.assetCliente
                                        )}>Listar Transações
                                </button>
                            </div>
                            <pre className="invisible" id="assetClienteTxt">{this.state.assetClienteTxt}</pre>
                        </div>
                    </fieldset>
                </form>
                <form className="pure-form pure-form-aligned">
                    <fieldset>
                        <legend>B) Fornecedor: Listar contas a pagar
                            <button
                                className="button-small-extra pure-button"
                                onClick={(e) => this.toggle(e, "frmGetCentralTx")}>+
                            </button>
                        </legend>
                        <div className="invisible" id="frmGetCentralTx">
                            <div className="pure-control-group">
                                <label htmlFor="txtfrmGetCentralTxConta">Conta fornecedor</label>

                                <input id="txtfrmGetCentralTxConta" type="text" placeholder="Conta fornecedor"
                                       name="getCentralTxConta"
                                       value={this.state.getCentralTxConta}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="txtfrmGetCentralTxSenha">Senha</label>

                                <input id="txtfrmGetCentralTxSenha" type="password" placeholder="Senha"
                                       name="getCentralTxSenha"
                                       value={this.state.getCentralTxSenha}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="txtfrmGetCentralTxPriv">Chave privada</label>

                                <input id="txtfrmGetCentralTxPriv" type="text" placeholder="Chave privada"
                                       name="getCentralTxPriv"
                                       value={this.state.getCentralTxPriv}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="txtfrmGetCentralTxPub">Chave publica</label>

                                <input id="txtfrmGetCentralTxPub" type="text" placeholder="Chave publica"
                                       name="getCentralTxPub"
                                       value={this.state.getCentralTxPub}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-controls">
                                <button className="pure-button pure-button-primary"
                                        onClick={(e) =>
                                            this.popularAccountAsset(
                                                e,
                                                "getCentralTxTxt",
                                                this.state.getCentralTxConta,
                                                this.state.getCentralTxSenha,
                                                this.state.getCentralTxPriv,
                                                this.state.getCentralTxPub
                                            )
                                        }>Listar Transações
                                </button>
                            </div>
                            <pre className="invisible" id="getCentralTxTxt">{this.state.getCentralTxTxt}</pre>
                        </div>
                    </fieldset>
                </form>
                <form className="pure-form pure-form-aligned">
                    <fieldset>
                        <legend>C) Fornecedor: Liquidar
                            <button
                                className="button-small-extra pure-button"
                                onClick={(e) => this.toggle(e, "frmCentralLiq")}>+
                            </button>
                        </legend>
                        <div className="invisible" id="frmCentralLiq">
                            <div className="pure-control-group">
                                <label htmlFor="txtfrmCentralLiqDestino">Conta destino</label>

                                <input id="txtfrmCentralLiqDestino" type="text" placeholder="Conta destino"
                                       name="getCentralTxDestination"
                                       value={this.state.getCentralTxDestination}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="txtfrmCentralLiqdinheiroNome">Nome ativo</label>

                                <input id="txtfrmCentralLiqdinheiroNome" type="text" placeholder="Nome ativo"
                                       name="getCentralTxAsset"
                                       value={this.state.getCentralTxAsset}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="txtfrmCentralLiqdinheiroAmount">Valor</label>

                                <input id="txtfrmCentralLiqdinheiroAmount" type="text" placeholder="Valor"
                                       name="getCentralTxAmount"
                                       value={this.state.getCentralTxAmount}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="txtfrmCentralLiqConta">Conta fornecedor</label>

                                <input id="txtfrmCentralLiqConta" type="text" placeholder="Conta fornecedor"
                                       name="getCentralTxConta"
                                       value={this.state.getCentralTxConta}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="txtfrmCentralLiqSenha">Senha</label>

                                <input id="txtfrmCentralLiqSenha" type="password" placeholder="Senha"
                                       name="getCentralTxSenha"
                                       value={this.state.getCentralTxSenha}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="txtfrmCentralLiqPriv">Chave privada</label>

                                <input id="txtfrmCentralLiqPriv" type="text" placeholder="Chave privada"
                                       name="getCentralTxPriv"
                                       value={this.state.getCentralTxPriv}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="txtfrmCentralLiqPub">Chave publica</label>

                                <input id="txtfrmCentralLiqPub" type="text" placeholder="Chave publica"
                                       name="getCentralTxPub"
                                       value={this.state.getCentralTxPub}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-controls">
                                <button className="pure-button pure-button-primary"
                                        onClick={(e) => this.liquidarAtivo(e)}>Liquidar Ativo
                                </button>
                            </div>
                            <div className="pure-controls">
                                <button className="pure-button pure-button-primary"
                                        onClick={(e) =>
                                            this.popularAsset(
                                                e,
                                                "getCentralTxTxt2",
                                                this.state.getCentralTxConta,
                                                this.state.getCentralTxSenha,
                                                this.state.getCentralTxPriv,
                                                this.state.getCentralTxPub,
                                                this.state.getCentralTxAsset
                                            )
                                        }>Listar Transações
                                </button>
                            </div>
                            <pre className="invisible" id="getCentralTxTxt2">{this.state.getCentralTxTxt2}</pre>
                        </div>
                    </fieldset>
                </form>
                <form className="pure-form pure-form-aligned">
                    <fieldset>
                        <legend>D) Cliente: Listar Contas <button
                            className="button-small-extra pure-button"
                            onClick={(e) => this.toggle(e, "frmCliAsset")}>+</button>
                        </legend>
                        <div className="invisible" id="frmCliAsset">
                            <div className="pure-control-group">
                                <label htmlFor="txtfrmCliAssetConta">Conta cliente</label>

                                <input id="txtfrmCliAssetConta" type="text" placeholder="Conta cliente"
                                       name="assetClienteConta"
                                       value={this.state.assetClienteConta}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="txtfrmCliAssetSenha">Senha</label>

                                <input id="txtfrmCliAssetSenha" type="password" placeholder="Senha"
                                       name="assetClienteSenha"
                                       value={this.state.assetClienteSenha}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="txtfrmCliAssetPriv">Chave privada</label>

                                <input id="txtfrmCliAssetPriv" type="text" placeholder="Chave privada"
                                       name="assetClientePriv"
                                       value={this.state.assetClientePriv}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="txtfrmCliAssetPublic">Chave publica</label>

                                <input id="txtfrmCliAssetPublic" type="text" placeholder="Chave publica"
                                       name="assetClientePub"
                                       value={this.state.assetClientePub}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="pure-controls">
                                <button className="pure-button pure-button-primary"
                                        onClick={(e) => this.popularAccountAsset(
                                            e,
                                            "assetClienteTxt2",
                                            this.state.assetClienteConta,
                                            this.state.assetClienteSenha,
                                            this.state.assetClientePriv,
                                            this.state.assetClientePub
                                        )}>Listar Transações
                                </button>
                            </div>
                            <pre id="assetClienteTxt2">{this.state.assetClienteTxt2}</pre>
                        </div>
                    </fieldset>
                </form>

            </div>
        )
    }
}

export default Cliente;
