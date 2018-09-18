package com.github.frkr.finaudit;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Teste {

    public final static String DOCKER_CMD1 = "docker";
    public final static String DOCKER_HOST = "-H 127.0.0.1:2375";
    public final static String DOCKER_CMD2 = "run --rm --network=iroha-network frkr/iroha-ex";
    public final static String ACCN = "admin@test";
    public final static String ACCN_PRIV = "f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70";
    public final static String ACCN_PUB = "313a07e6384776ed95447710d15e59148473ccfc052a681317a72a69f2a49910";
    public final static String ACCN_PASS = "";

    public static String getPipe() {
        return "\"2\\n9\\nadmin@test\\n1\\nirohad-zero\\n50051\\n\"";
    }

    public static void main(String[] args) throws Exception {
        boolean win = System.getProperty("os.name").toLowerCase().indexOf("win") != -1;

        StringBuilder cmd = new StringBuilder();
        cmd.append(DOCKER_CMD1);
        cmd.append(" ");
        if (!win) {
            cmd.append(DOCKER_HOST);
            cmd.append(" ");
        }
        cmd.append(DOCKER_CMD2);
        cmd.append(" ");
        cmd.append(ACCN);
        cmd.append(" ");
        cmd.append(ACCN_PRIV);
        cmd.append(" ");
        cmd.append(ACCN_PUB);
        cmd.append(" ");
        cmd.append(getPipe());
        if (ACCN_PASS != null && !"".equals(ACCN_PASS) && !"null".equals(ACCN_PASS)) {
            cmd.append(" ");
            cmd.append(ACCN_PASS);
        }

        System.out.println(cmd.toString());

        Process p = Runtime.getRuntime().exec(cmd.toString());
        BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));

        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(line);
        }
//        InputStream stderr = p.getErrorStream();
//        while ((read=stderr.read(b)) >= 0) {
//            System.out.write(b);
//        }
    }

}
