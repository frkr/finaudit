//package com.github.frkr.finaudit;
//
//import io.grpc.ManagedChannel;
//import io.grpc.ManagedChannelBuilder;
//import iroha.protocol.*;
//
////https://www.baeldung.com/grpc-introduction
////https://codelabs.developers.google.com/codelabs/cloud-grpc-java/index.html?index=..%2F..%2Findex#2
//public class Teste {
//
//    public static void main(String[] args) {
//        final String IROHA_URL = "192.168.99.100:50051";
//        final ManagedChannel channel = ManagedChannelBuilder.forTarget(IROHA_URL).usePlaintext(true).build();
//
////        final QueryServiceGrpc.QueryServiceBlockingStub stub = QueryServiceGrpc.newBlockingStub(channel);
////        stub.fetchCommits(Queries.BlocksQuery.newBuilder()
////                .set
////                .build());
////        stub.find(Queries.Query.newBuilder().build());
//
////        final CommandServiceGrpc.CommandServiceBlockingStub stub = CommandServiceGrpc.newBlockingStub(channel);
//
//
////        HelloResponse helloResponse = stub.hello(HelloRequest.newBuilder()
////                .setFirstName("Baeldung")
////                .setLastName("gRPC")
////                .build());
//
//        channel.shutdown();
//
//    }
//
//}
