indexFile=./index

# Проверяем, существует ли файл индекса
if [ ! -e "$indexFile" ]; then
    echo "1" > $indexFile
    echo "Index file created."
fi

# Генерируем ключи
read -p "Введите имя конфигурации (должно быть уникальным): " name
wg genkey | tee /etc/wireguard/${name}_privatekey | wg pubkey | tee /etc/wireguard/${name}_publickey

# Вычисляем значения
index=$(< $indexFile)
nextIndex=$((index + 1))
suffix=$((1 + $nextIndex))
publicKey=$(cat /etc/wireguard/${name}_publickey)
privateKey=$(cat /etc/wireguard/${name}_privatekey)
serverPubKey=$(cat /etc/wireguard/publickey)

# Добавляем нового пира в файл
wgConf="/etc/wireguard/wg0.conf"
echo "" >> $wgConf
echo "[Peer]" >> $wgConf
echo "PublicKey = $publicKey" >> $wgConf
echo "AllowedIPs = 10.0.0.$suffix/32" >> $wgConf

# Сохраняем обновленный индекс
echo $nextIndex > $indexFile

# Перезапускаем WireGuard
systemctl restart wg-quick@wg0

# Создаем конфиг для клиента
clientConf="/etc/wireguard/${name}_client.conf"
echo "[Interface]" >> $clientConf
echo "PrivateKey = $privateKey" >> $clientConf
echo "Address = 10.0.0.$suffix/32" >> $clientConf
echo "DNS = 8.8.8.8" >> $clientConf
echo "" >> $clientConf
echo "[Peer]" >> $clientConf
echo "PublicKey = $serverPubKey" >> $clientConf
echo "Endpoint = 77.246.103.183:51830" >> $clientConf
echo "AllowedIPs = 0.0.0.0/0" >> $clientConf
echo "PersistentKeepalive = 20" >> $clientConf