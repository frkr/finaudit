FROM frkr/iroha-ca
VOLUME /opt/block_store/
VOLUME /opt/iroha_data/
COPY node0.priv /opt/iroha_data/
COPY node0.pub /opt/iroha_data/
COPY admin@conta1.priv /opt/iroha_data/
COPY admin@conta1.pub /opt/iroha_data/
COPY admin@conta2.priv /opt/iroha_data/
COPY admin@conta2.pub /opt/iroha_data/
COPY usrfinan@conta1.priv /opt/iroha_data/
COPY usrfinan@conta1.pub /opt/iroha_data/
COPY config.json /opt/iroha_data/
COPY genesis.json /opt/iroha_data/
COPY irohad.sh /opt/iroha_data/
WORKDIR /opt/iroha_data/
ENTRYPOINT ["/bin/bash","/opt/iroha_data/irohad.sh"]
