if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]
then
    echo ""
    echo "#############"
    echo "# Usage: account privatekey publickey other_parameters "
    echo "#"
    echo "# Example: docker run --rm frkr/iroha-cli alice@ru daf22faea51f2d9bc7b43e20820f 7b43e2082a9457183b805a026f8758b16 -pass_phrase mysupersecretpassword"
    echo "#############"
else
    ACCN=$1
    echo ""
    echo "Account:" $ACCN

    FILE1=$1.priv
    FILE2=$1.pub

    echo $2 > $FILE1
    echo $3 > $FILE2

    shift
    shift
    shift

    iroha-cli -account_name $ACCN --key_path ./ $@

    echo "" > $FILE1
    echo "" > $FILE2
    rm $FILE1
    rm $FILE2
    echo "-END-"
fi
