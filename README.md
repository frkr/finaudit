# Docs
- https://hyperledger.github.io/iroha-api/#entity-relationship-model
- https://iroha.readthedocs.io/en/latest/api/commands.html
- https://iroha.readthedocs.io/en/latest/getting_started/index.html
- https://iroha.readthedocs.io/en/latest/guides/deployment.html
- https://hyperledger.github.io/iroha-api/#create-genesis-block
- https://hyperledger.github.io/iroha-api/#command-line-interface

### Iroha
#### Network
```bash
docker network create iroha-network
docker network inspect iroha-network
```

#### Base
```bash
docker run --name postgres-audit -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 --network=iroha-network -d postgres:9.5

#docker rm iroha
docker run -it --name iroha -p 50051:50051 --network=iroha-network --entrypoint=/bin/bash hyperledger/iroha
docker start iroha
docker attach iroha
```

##### config.docker
```json
{
  "block_store_path" : "/var/block_store/",
  "torii_port" : 50051,
  "internal_port" : 10001,
  "pg_opt" : "host=postgres-audit port=5432 user=postgres password=mysecretpassword",
  "max_proposal_size" : 10,
  "proposal_delay" : 5000,
  "vote_delay" : 5000,
  "load_delay" : 5000,
  "mst_enable" : false
}
```

##### genisis.block
```json
{
   "payload":{
      "transactions":[
         {
            "payload":{
               "reducedPayload":{
                  "commands":[
                     {
                        "addPeer":{
                           "peer":{
                              "address":"0.0.0.0:10001",
                              "peerKey":"vd1YQE0TFeDrJ5AsXXyOsGAsFiOPAFdz30BrwZEwiSk="
                           }
                        }
                     },
                     {
                        "createRole":{
                           "roleName":"admin",
                           "permissions":[
                              "can_add_peer",
                              "can_add_signatory",
                              "can_create_account",
                              "can_create_domain",
                              "can_get_all_acc_ast",
                              "can_get_all_acc_ast_txs",
                              "can_get_all_acc_detail",
                              "can_get_all_acc_txs",
                              "can_get_all_accounts",
                              "can_get_all_signatories",
                              "can_get_all_txs",
                              "can_get_blocks",
                              "can_get_roles",
                              "can_read_assets",
                              "can_remove_signatory",
                              "can_set_quorum"
                           ]
                        }
                     },
                     {
                        "createRole":{
                           "roleName":"user",
                           "permissions":[
                              "can_add_signatory",
                              "can_get_my_acc_ast",
                              "can_get_my_acc_ast_txs",
                              "can_get_my_acc_detail",
                              "can_get_my_acc_txs",
                              "can_get_my_account",
                              "can_get_my_signatories",
                              "can_get_my_txs",
                              "can_grant_can_add_my_signatory",
                              "can_grant_can_remove_my_signatory",
                              "can_grant_can_set_my_account_detail",
                              "can_grant_can_set_my_quorum",
                              "can_grant_can_transfer_my_assets",
                              "can_receive",
                              "can_remove_signatory",
                              "can_set_quorum",
                              "can_transfer"
                           ]
                        }
                     },
                     {
                        "createRole":{
                           "roleName":"money_creator",
                           "permissions":[
                              "can_add_asset_qty",
                              "can_create_asset",
                              "can_receive",
                              "can_transfer"
                           ]
                        }
                     },
                     {
                        "createDomain":{
                           "domainId":"test",
                           "defaultRole":"user"
                        }
                     },
                     {
                        "createAsset":{
                           "assetName":"coin",
                           "domainId":"test",
                           "precision":2
                        }
                     },
                     {
                        "createAccount":{
                           "accountName":"admin",
                           "domainId":"test",
                           "mainPubkey":"MToH5jhHdu2VRHcQ0V5ZFIRzzPwFKmgTF6cqafKkmRA="
                        }
                     },
                     {
                        "createAccount":{
                           "accountName":"test",
                           "domainId":"test",
                           "mainPubkey":"cW/lBfafGFEaGwg5Faqf9z7zbmaIGZ85WXUNs4uPS/w="
                        }
                     },
                     {
                        "appendRole":{
                           "accountId":"admin@test",
                           "roleName":"admin"
                        }
                     },
                     {
                        "appendRole":{
                           "accountId":"admin@test",
                           "roleName":"money_creator"
                        }
                     }
                  ],
                  "quorum":1
               }
            }
         }
      ],
      "txNumber":1,
      "height":"1",
      "prevBlockHash":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
   }
}
```

# Run Interface
```bash
mvn spring-boot:run
```
[http://localhost](http://localhost)

##### REST API
- [http://localhost/swagger-ui.html](http://localhost/swagger-ui.html)
