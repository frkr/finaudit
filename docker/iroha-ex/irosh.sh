if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ] || [ -z "$4" ]
then
    echo "Usage: account privatekey publickey PIPED_IN pass_phrase"
else
    echo "Account:" $1
    echo "PIPE:" $4

    echo $2 > $1.priv
    echo $3 > $1.pub

    printf $4 > in.txt

    if [ -z "$5" ]
    then
        iroha-cli -account_name $1 --key_path ./ < in.txt
    else
        iroha-cli -account_name $1 -pass_phrase $5 --key_path ./ < in.txt
    fi

    echo "" > $1.priv
    echo "" > $1.pub
    echo "" > in.txt
    rm $1.priv
    rm $1.pub
    rm in.txt
    echo "-END-"
fi
