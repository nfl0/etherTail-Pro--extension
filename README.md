# etherTail-extension
Watch and track Ethereum wallet total valuation

This extension allows you to track the total USD value of Ethereum (ETH), BTC wallet...

### Supported crypto currencies

* Bitcoin/BTC, `'bitcoin'` or `'BTC'`
https://api.blockcypher.com/v1/btc/main/addrs/16ftSEQ4ctQFDtVZiUBusQUjRrGhM3JYwe/balance
 limit 600/hr

* BitcoinCash/BCH, `'bitcoincash'` or `'BCH'`
https://rest.bitcoin.com/v2/address/details/1NNAdw8phoJcQYJVvNKuD3QebGhdpWqNiW
limit none

* Dash, `'dash'` or `'DASH'`
 //https://api.blockcypher.com/v1/dash/main/addrs/XuFndxnFaaUvGavxp5QPS6YKymvmCy5iqm/balance
 limit 200/hr

* Dogecoin/DOGE, `'dogecoin'` or `'DOGE'`
https://dogechain.info/api/v1/address/balance/DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L
  limit none

* Ethereum/ETH, `'ethereum'` or `'ETH'`
https://api.ethplorer.io/
  limit 200/hr

* Litecoin/LTC, `'litecoin'` or `'LTC'`
https://ltc-chain.api.btc.com/v3/address/LZ43jcFdxNVpJWJ6o3neYEsnqEGxQTsP9M
  limit none

* NEO/NEO, `'NEO'` or `'NEO'`
https://api.neoscan.io/api/main_net/v1/get_balance/Ae2d6qj91YL3LVUMkza7WQsaTYjzjHm4z1
  limit none (testing)

* Zcash/ZEC, `'zcash'` or `'ZEC'`
https://api.zcha.in/v2/mainnet/accounts/t1N26vuBpBG9oTZ3ixtHxrhbhDWA24NPaji
  limit none

- To-do:
 - popup script sends message
 * [ ] browser.runtime.sendMessage({action : "refresh"});
 * [ ] browser.runtime.sendMessage({action : "add", currency : address};
 - background script
 * [ ] chrome.runtime.onMessage.addListener(handleMessage);
