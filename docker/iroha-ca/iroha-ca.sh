if [ -z "$1" ]
then
    iroha-cli --new_account --account_name tmp --key_path ./ > /dev/null
else
    iroha-cli --new_account --account_name tmp --pass_phrase $1 --key_path ./ > /dev/null
fi
cat tmp.priv
echo ""
echo "" > tmp.priv
rm tmp.priv
cat tmp.pub
echo "" > tmp.pub
rm tmp.pub
