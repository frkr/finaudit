package com.github.frkr.finaudit.docker;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class DockerCmd {

    //FIXME Deletar conteudos hardcoded
    public final static String DOCKER_CMD1 = "docker";
    public final static String DOCKER_HOST = "-H 127.0.0.1:2375";
    public final static String DOCKER_CMD2 = "run --rm --network=iroha-network frkr/iroha-ex";
    public final static String ACCN = "admin@test";
    public final static String ACCN_PRIV = "f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70";
    public final static String ACCN_PUB = "313a07e6384776ed95447710d15e59148473ccfc052a681317a72a69f2a49910";
    public final static String ACCN_PASS = "";
    public final static String SERVER = "irohad-zero";
    public final static String TORII = "50051";

    private String accn;
    private String accnPriv;
    private String accnPub;
    private String accnPass;
    private String server;
    private String torii;

    public DockerCmd(String accn, String accnPriv, String accnPub, String accnPass, String server, String torii) {
        this.accn = accn;
        this.accnPriv = accnPriv;
        this.accnPub = accnPub;
        this.accnPass = accnPass;
        this.server = server;
        this.torii = torii;
    }

    public String cmd(IrohaCommand cmd, StringCmd subcmd) throws Exception {
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
        shellcmd.append(getPipe(cmd,subcmd));
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
        return retorno.toString();
    }

    /**
     * @param cmd {@link IrohaCommand} 
     * @param subcmd {@link IrohaQuery}
     * @return docker output string
     */
    public String getPipe(IrohaCommand cmd, StringCmd subcmd) {
//        return "\"3\\n9\\nadmin@test\\n1\\nirohad-zero\\n50051\\n\"";

        StringBuilder retorno = new StringBuilder();
        retorno.append("\"");
        retorno.append(cmd.getCmd());
        retorno.append("\\n");
        retorno.append(subcmd);
        retorno.append("\\n");
        retorno.append(this.accn);
        retorno.append("\\n");
        retorno.append("1"); // Enviar para o servidor
        retorno.append("\\n");
        retorno.append(this.server);
        retorno.append("\\n");
        retorno.append(this.torii);
        retorno.append("\\n");
        retorno.append("\"");

        return retorno.toString();
    }

    public static void main(String[] args) throws Exception {
        DockerCmd cmd = new DockerCmd(ACCN, ACCN_PRIV, ACCN_PUB, ACCN_PASS, SERVER, TORII);
        System.out.println(
                cmd.cmd(IrohaCommand.QRY,IrohaQuery.get_acc)
        );

        System.out.println(
                IrohaQuery.valueOf("get_acc").getCmd()
        );
    }

}
