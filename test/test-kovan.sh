trap "exit" INT TERM ERR
trap "kill 0" EXIT

./ganache-kovan.sh &
./someProcessB &

wait