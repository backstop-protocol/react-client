rsync -avr --exclude='vesta-app' build/ build/vesta-app
cd build
mkdir vesta-app && cp index.html vesta-app