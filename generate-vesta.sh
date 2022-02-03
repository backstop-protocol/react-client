rsync -avr --exclude='vesta-app' build/ build/vesta-app
cd build/vesta-app
mkdir vesta-app && cp index.html vesta-app