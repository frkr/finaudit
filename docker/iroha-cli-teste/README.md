# Testes

```bash
docker run -it --rm --network=iroha-network frkr/iroha-cli admin@test f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70 313a07e6384776ed95447710d15e59148473ccfc052a681317a72a69f2a49910 \
param
```
- Params
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

## Native
```bash
docker run -it --rm --network=iroha-network --entrypoint=/bin/bash hyperledger/iroha
echo f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70 > admin@test.priv
echo 313a07e6384776ed95447710d15e59148473ccfc052a681317a72a69f2a49910 > admin@test.pub

iroha-cli -account_name admin@test --key_path ./

```
