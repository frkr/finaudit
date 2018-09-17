echo ""
echo "#############"
echo "# VOLUME /opt/block_store/"
echo "# VOLUME /opt/iroha_data/"
echo "pwd:" `pwd`
echo "ls:" `ls`
echo "#############"
irohad --config config.json --genesis_block genesis.json --keypair_name node0
