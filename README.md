# Bitfinex Auto-Stop (Node JS)

One of the deficiencies of Bitfinex (as of Mar 2018) is the inability to place a stop order at the same time as an entry order. 

This Node JS script executes a long/short order when a trigger price is reached, then automatically places a stop order to protect your position from loss.

To use it:

1. Download nodeJS: [https://nodejs.org/en/download/](https://nodejs.org/en/download/) and install it
2. Download [Bitfinex’s nodeJS library](https://github.com/bitfinexcom/bitfinex-api-node/) and place it somewhere on your computer.
3. Open your Terminal app, `cd` to the directory you placed it and then execute `npm i bitfinex-api-node` to install the nodeJS library
4. Copy the ‘[entryWithStop.js](https://raw.githubusercontent.com/cryptomius/Bitfinex-Auto-Stop/master/entryWithStop.js)’ file into the same directory, then open it with a text editor (I use Sublime Text)
5. Enter in your Bitfinex API keys, trading pair, entry price, stop price, direction (long/short), etc. 
6. Execute `node entryWithStop` and you’re in action.

IMPORTANT: Your computer must be left running and connected to the internet for the stop to be placed by this script.

[Example video of script in use](https://www.dropbox.com/s/2g5igwemyf7axnq/entry%20with%20stop%20%28short%29%20-%20profit.mp4?dl=1)

[More Crypto Tools by @cryptomius](https://github.com/cryptomius/Cryptomius-Crypto-Tools-Overview)

---
*Like this? Feel free to send me a tip! :-)*

**BTC**: 1GdpCvpiK6e5N5u89Dq21jJcqfzJ48zAy2  
**ETH & ERC20**: 0x13098ad7ac788e0bcd3ed38f04003c0df90ebbc9  
**ETC**: 0xb0b4efe2ad6d0ddc0d8bd030525e32580e85f0cd  
**LTC**: LdEu42hZUUSxxZboXGdes1snQfwrR7VWt3  
**DASH**: XnU3c743iqpros4YQgfsn9Nxq6T9bguH8e  
**ZEC**: t1gLKiEZP9RyKtHthvYi2Vo97fvJXL7YcMd  
**BCH**: 1H9dSN6nsoGDCG4GvPgCWRjP765kqJSXYN
