if [ -z "$1" ]
then
    echo ""
    echo "#############"
    echo "# Usage: account password"
    echo "#"
    echo "# Example: docker run --rm frkr/iroha-ca alice@ru mysupersecretpassword"
    echo "#############"
else
    iroha-cli --new_account --account_name $1 --pass_phrase $2 --key_path ./
    echo ""
    echo "Account:" $1
    echo "PRIV ############# PRIV ############# PRIV"
    cat $1.priv
    echo ""
    echo "" > $1.priv
    rm $1.priv
    echo "PRIV ############# PRIV ############# PRIV"
    echo "PUB ############# PUB ############# PUB"
    cat $1.pub
    echo ""
    echo "" > $1.pub
    rm $1.pub
    echo "PUB ############# PUB ############# PUB"
fi
