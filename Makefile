rebuildAll:
	npm i
	curl https://gateway.pinata.cloud/ipns/precon-lite.rmrk.link > data.json
produceXml:
	node Main.js
deleteAll:
	rm -rf ./excellDcouments/*.xlsx