# Docs
- https://iroha.readthedocs.io/en/latest/getting_started/index.html
- https://hyperledger.github.io/iroha-api/?protobuf#add-asset-quantity

### Iroha
#### Network
```bash
docker network create iroha-network
docker network inspect iroha-network
```

#### Base
##### POSTGRES
```bash
docker run -d --name postgres-audit -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 --network=iroha-network postgres:9.5
```

##### Iroha CA
```bash
docker run --rm frkr/iroha-ca alice@ru mysupersecretpassword
```

##### Irohad node ZERO
```bash
irohad-local/build.bat

docker run -d --name irohad-zero -p 50051:50051 --network=iroha-network irohad:local
docker logs -f irohad-zero
```

##### Iroha CLI
- Usage: account privatekey publickey other_parameters
- Example: docker run -it --rm --network=iroha-network frkr/iroha-cli alice@ru daf22faea51f2d9bc7b43e20820f 7b43e2082a9457183b805a026f8758b16 -pass_phrase mysupersecretpassword
```
    -account_name (Name of the account. Must be unique in iroha network)
      type: string default: ""
    -genesis_block (Generate genesis block for new Iroha network) type: bool
      default: false
    -genesis_transaction (File with transaction in json format for the genesis
      block) type: string default: ""
    -interactive (Run iroha-cli in interactive mode) type: bool default: true
    -json_query (Query in json format) type: string default: ""
    -json_transaction (Transaction in json format) type: string default: ""
    -key_path (Path to user keys) type: string default: "."
    -new_account (Generate and save locally new public/private keys) type: bool
      default: false
    -pass_phrase (Account pass-phrase) type: string default: ""
    -peer_ip (Address of the Iroha node) type: string default: "0.0.0.0"
    -peers_address (File with peers address for new Iroha network) type: string
      default: ""
    -torii_port (Port of Iroha's Torii) type: int32 default: 50051
```

##### config.json
- "pg_opt" POSTGRES settings

##### genesis.json
- For Genesis (initial) block
- ((FIXME)) private and public keys. Chaves privadas e publicas não estão sendo geradas e adicionadas no Genesis. Isto é ruim para a produção. Precisa criar um bloco genisis genuino.  

##### Irohad node ZERO
- ((TODO)) Adicionar mais nós usando o Iroha publico.

# Run Interface
```bash
mvn spring-boot:run
```
[http://localhost](http://localhost)

##### REST API
- Json Swagger [http://localhost/v2/api-docs](http://localhost/v2/api-docs)
- UI [http://localhost/swagger-ui.html](http://localhost/swagger-ui.html)

##### SOAP API
- [http://localhost/ws/](http://localhost/ws/)
