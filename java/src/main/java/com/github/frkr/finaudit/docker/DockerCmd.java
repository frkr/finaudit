package com.github.frkr.finaudit.docker;

import com.github.frkr.finaudit.service.iroha.BaseRequest;
import com.github.frkr.finaudit.service.iroha.QueryRequest;
import com.github.frkr.finaudit.service.iroha.StatusRequest;
import com.github.frkr.finaudit.service.iroha.TransactionRequest;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class DockerCmd {

    public final static String DOCKER_CMD1 = "docker";
    public final static String DOCKER_HOST = "-H 127.0.0.1:2375";
    public final static String DOCKER_CMD2 = "run --rm --network=iroha-network frkr/iroha-ex";
    public final static String ACCN = "usrfinan@cliente1";

    //region FIXME Deletar conteudos hardcoded
    public final static String ACCN_PRIV = "7e00405ece477bb6dd9b03a78eee4e708afc2f5bcdce399573a5958942f4a390";
    public final static String ACCN_PUB = "716fe505f69f18511a1b083915aa9ff73ef36e6688199f3959750db38b8f4bfc";
    public final static String ACCN_PASS = "";
    public final static String SERVER = "irohad-zero";
    public final static String TORII = "50051";
    //endregion

    private String accn;
    private String accnPriv;
    private String accnPub;
    private String accnPass;
    private String server;
    private String torii;

    public DockerCmd(BaseRequest request) {
        this.accn = request.getAccn();
        this.accnPriv = request.getAccnPriv();
        this.accnPub = request.getAccnPub();
        this.accnPass = request.getAccnPass();
        this.server = request.getServer();
        this.torii = request.getTorii();
    }

    public String cmd(BaseRequest request) throws Exception {
        boolean win = System.getProperty("os.name").toLowerCase().indexOf("win") != -1;

        StringBuilder retorno = new StringBuilder();
        StringBuilder shellcmd = new StringBuilder();
        shellcmd.append(DOCKER_CMD1);
        shellcmd.append(" ");
        if (!win) {
            shellcmd.append(DOCKER_HOST);
            shellcmd.append(" ");
        }
        shellcmd.append(DOCKER_CMD2);
        shellcmd.append(" ");
        shellcmd.append(accn);
        shellcmd.append(" ");
        shellcmd.append(accnPriv);
        shellcmd.append(" ");
        shellcmd.append(accnPub);
        shellcmd.append(" ");
        shellcmd.append(getPipe(request, win));
        if (accnPass != null && !"".equals(accnPass) && !"null".equals(accnPass)) {
            shellcmd.append(" ");
            shellcmd.append(accnPass);
        }

        Process p = Runtime.getRuntime().exec(shellcmd.toString());
        BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));

        String line;
        while ((line = reader.readLine()) != null) {
            retorno.append(line);
            retorno.append("\n");
        }
//        InputStream stderr = p.getErrorStream();
//        while ((read=stderr.read(b)) >= 0) {
//            System.out.write(b);
//        }

        // FIXME retirar sout
        System.out.println(retorno.toString());
        System.out.println();
        System.out.println();

        try {
            String retornoStr = retorno.toString().split(".50051.: ")[1].split("--------------------")[0]
                    .replaceAll("\\[.*info\\] QueryResponseHandler ", "");

            return retornoStr;
        } catch (Exception e) {
            // FIXME Erro retorno
        }
        return retorno.toString();
    }

    /**
     * @param request {@link BaseRequest}
     * @return docker output string
     */
    public static String getPipe(BaseRequest request, boolean win) throws Exception {
//        return "\"3\\n9\\nadmin@test\\n1\\nirohad-zero\\n50051\\n\"";

        StringBuilder retorno = new StringBuilder();
        if (win) {
            retorno.append("\"");
        }
        if (request instanceof TransactionRequest) {
            retorno.append(IrohaCommand.TX.getCmd());
            retorno.append("\\n");

            TransactionRequest cmd = (TransactionRequest) request;
            retorno.append(cmd.getTransaction().getCmd());
            retorno.append("\\n");

            if (cmd.getTransaction().equals(IrohaTransaction.detach)
                    || cmd.getTransaction().equals(IrohaTransaction.apnd_role)
                    || cmd.getTransaction().equals(IrohaTransaction.crt_role)
                    || cmd.getTransaction().equals(IrohaTransaction.set_acc_kv)
                    || cmd.getTransaction().equals(IrohaTransaction.grant_perm)
                    || cmd.getTransaction().equals(IrohaTransaction.sub_ast_qty)
                    || cmd.getTransaction().equals(IrohaTransaction.set_qrm)
                    || cmd.getTransaction().equals(IrohaTransaction.rem_sign)
                    || cmd.getTransaction().equals(IrohaTransaction.crt_dmn)
                    || cmd.getTransaction().equals(IrohaTransaction.revoke_perm)
                    || cmd.getTransaction().equals(IrohaTransaction.crt_acc)
                    || cmd.getTransaction().equals(IrohaTransaction.add_sign)
                    || cmd.getTransaction().equals(IrohaTransaction.add_peer)
            ) {
                throw new Exception("not implemented " + cmd.getTransaction());
            } else if (cmd.getTransaction().equals(IrohaTransaction.tran_ast)) {
                retorno.append(cmd.getAccn());
                retorno.append("\\n");
                retorno.append(cmd.getDestination());
                retorno.append("\\n");
                retorno.append(cmd.getAsset());
                retorno.append("\\n");
                retorno.append(cmd.getAmount());
            } else if (cmd.getTransaction().equals(IrohaTransaction.crt_ast)) {
                retorno.append(cmd.getAsset().split("#")[0]);
                retorno.append("\\n");
                retorno.append(cmd.getAsset().split("#")[1]);
                retorno.append("\\n");
                retorno.append(cmd.getPrecision());
            } else if (cmd.getTransaction().equals(IrohaTransaction.add_ast_qty)) {
                // XXX esta bugado no iroha mesmo
                retorno.append(cmd.getAsset());
                retorno.append("\\n");
                retorno.append(cmd.getAmount());
                retorno.append("\\n");
                retorno.append(cmd.getAmount());
            }
        } else if (request instanceof QueryRequest) {
            retorno.append(IrohaCommand.QRY.getCmd());
            retorno.append("\\n");

            QueryRequest cmd = (QueryRequest) request;
            retorno.append(cmd.getQuery().getCmd());
            retorno.append("\\n");

            if (cmd.getQuery().equals(IrohaQuery.get_role_perm)) {
                retorno.append(cmd.getRole());
            } else if (cmd.getQuery().equals(IrohaQuery.get_tx)) {
                throw new Exception("not implemented get_tx");
            } else if (cmd.getQuery().equals(IrohaQuery.get_ast_info)) {
                retorno.append(cmd.getAsset());
            } else if (cmd.getQuery().equals(IrohaQuery.get_acc_ast_tx) || cmd.getQuery().equals(IrohaQuery.get_acc_ast)) {
                retorno.append(cmd.getAccn());
                retorno.append("\\n");
                retorno.append(cmd.getAsset());
            } else if (cmd.getQuery().equals(IrohaQuery.get_roles)) {
                // XXX nothing
            } else {
                retorno.append(cmd.getAccn());
            }
        } else if (request instanceof StatusRequest) {
            retorno.append(IrohaCommand.ST.getCmd());
            retorno.append("\\n");

            StatusRequest cmd = (StatusRequest) request;
            retorno.append(cmd.getStatus().getCmd());
            retorno.append("\\n");
            retorno.append(cmd.getHash());
        } else {
            // FIXME Comando nao existe
        }

        retorno.append("\\n");
        if (request instanceof TransactionRequest) {
            if ("false".equals(request.getSend())) {
                retorno.append("4"); // Salvar em JSON
            } else {
                retorno.append("2"); // Enviar para o servidor
            }
        } else {
            if ("false".equals(request.getSend())) {
                retorno.append("2"); // Salvar em JSON
            } else {
                retorno.append("1"); // Enviar para o servidor
            }
        }
        retorno.append("\\n");
        if ("false".equals(request.getSend())) {
            retorno.append("teste.json");
        } else {
            retorno.append(request.getServer());
            retorno.append("\\n");
            retorno.append(request.getTorii());
        }
        retorno.append("\\n");
        if (win) {
            retorno.append("\"");
        }

        return retorno.toString();
    }

    public static void main(String[] args) throws Exception {
        QueryRequest request = new QueryRequest();
//        TransactionRequest request = new TransactionRequest();
        request.setAccn(ACCN);
        request.setAccnPriv(ACCN_PRIV);
        request.setAccnPub(ACCN_PUB);
        request.setAccnPass(ACCN_PASS);
        request.setServer(SERVER);
        request.setTorii(TORII);

//        request.setSend("false");

        request.setQuery(IrohaQuery.get_acc_tx);
        request.setRole("admin");
        request.setAsset("coin#test");

//        request.setTransaction(IrohaTransaction.add_ast_qty);
//        request.setDestination("admin@central");
//        request.setAsset("conta80#cliente1");
//        request.setAmount("100.00");
//        request.setPrecision("2");

        System.out.println(
                new DockerCmd(request).cmd(request)
        );

//        StatusRequest status = new StatusRequest();
//        status.setAccn(ACCN);
//        status.setAccnPriv(ACCN_PRIV);
//        status.setAccnPub(ACCN_PUB);
//        status.setAccnPass(ACCN_PASS);
//        status.setServer(SERVER);
//        status.setTorii(TORII);
//
//        status.setStatus(IrohaStatus.get_tx_info);
//        status.setHash("16e2d9d14b243f5e60e7de6c2e5403a203b7eb0a67111121454c45c2463e2cb6");
//
//        System.out.println(
//                new DockerCmd(status).cmd(status)
//        );
    }

}
