FROM hyperledger/iroha:latest
VOLUME /opt/block_store/
VOLUME /opt/iroha_data/
COPY node0.priv /opt/iroha_data/
COPY node0.pub /opt/iroha_data/
COPY config.json /opt/iroha_data/
COPY genisis.json /opt/iroha_data/
COPY irohad.sh /opt/iroha_data/
WORKDIR /opt/iroha_data/
ENTRYPOINT ["/bin/bash","/opt/iroha_data/irohad.sh"]
