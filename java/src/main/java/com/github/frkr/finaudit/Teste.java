package com.github.frkr.finaudit;

import java.io.*;

public class Teste {

    public final static String WIN_GITBASH = "cmd.exe /c c:/progra~1/git/bin/sh.exe --login -i -c \"/usr/bin/winpty";
    public final static String DOCKER_CMD1 = "docker";
    public final static String DOCKER_HOST = "-H 127.0.0.1:2375";
    public final static String DOCKER_CMD2 = "run -i --rm --network=iroha-network frkr/iroha-cli";
    public final static String ACCN = "admin@test";
    public final static String ACCN_PRIV = "f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70";
    public final static String ACCN_PUB = "313a07e6384776ed95447710d15e59148473ccfc052a681317a72a69f2a49910";

    public static void main(String[] args) throws Exception {
        boolean win = System.getProperty("os.name").toLowerCase().indexOf("win") != -1;

        StringBuilder cmd = new StringBuilder();
        if (win) {
            cmd.append(WIN_GITBASH);
            cmd.append(" ");
        }
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
        cmd.append("-peer_ip");
        cmd.append(" ");
        cmd.append("irohad-zero");
        cmd.append(" ");
        cmd.append("-torii_port");
        cmd.append(" ");
        cmd.append("50051");
        if (win) {
            cmd.append("\"");
        }

        System.out.println(cmd.toString());

        Process p = Runtime.getRuntime().exec(cmd.toString());
        PrintWriter stdin = new PrintWriter(p.getOutputStream());

        InputStream stdout = p.getInputStream();
        byte[] b = new byte[1];
        int read;
        while ((read=stdout.read(b)) >= 0) {
            System.out.write(b);
            stdin.println("1");
        }
        InputStream stderr = p.getErrorStream();
        while ((read=stderr.read(b)) >= 0) {
            System.out.write(b);
        }
    }

}
