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

# Tentar usar o KITEMATIC para usar volumes e reutilizar comandos
docker run -it --rm --network=iroha-network --entrypoint=/bin/bash irohad:local
iroha-cli -account_name admin@test


# nodejs wallet js
# SET NODE_IP=192.168.99.100:50051
```

##### config.json
- "pg_opt" POSTGRES settings

##### genisis.json
- For Genesis (initial) block
- ((FIXME)) private and public keys. Chaves privadas e publicas não estão sendo geradas e adicionadas no genisis. Isto é ruim para a produção. Precisa criar um bloco genisis genuino.  

##### Irohad node ZERO
- ((TODO)) Adicionar mais nós usando o Iroha publico.

#### Scripts da demonstração
```bash

```

# Run Interface
```bash
mvn spring-boot:run
```
[http://localhost](http://localhost)

##### REST API
- [http://localhost/swagger-ui.html](http://localhost/swagger-ui.html)
