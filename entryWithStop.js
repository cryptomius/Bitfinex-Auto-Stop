// This script places an order and once filled, places a stop
// v1 Shannon Murdoch @cryptomius 22 March 2018

// SETUP
const bitfinexAPIKey			= ''
const bitfinexAPISecret		= ''

const tradingPair					= 'BTCUSD'
const tradeAmount					= 0.1			// amount to buy/sell
const entryPrice					= 8000		// entry price
const stopPrice						= 7900		// stop price
const entryDirection			= 'long'	// 'long' (entry buy) or 'short' (entry sell)
const margin							= true		// true for MARGIN, false for EXCHANGE
const market							= true		// true for MARKET buy/sell, false for LIMIT buy/sell
// END SETUP

// run using `node entryWithStop` 

////////////////////////////////////

const BFX = require('bitfinex-api-node')

const { Order } = require('./lib/models')

const bfx = new BFX({
	apiKey: bitfinexAPIKey,
	apiSecret: bitfinexAPISecret,

	ws: {
		autoReconnect: true,
		seqAudit: false,
		packetWDDelay: 10 * 1000
	}
})


const ws = bfx.ws()

const orderType = (!margin?"EXCHANGE_":"") + (market?"STOP":"STOP_LIMIT")

ws.on('error', (err) => console.log(err))
ws.on('open', ws.auth.bind(ws))

ws.once('auth', () => {
	const o = new Order({
		cid: Date.now(),
		symbol: 't' + tradingPair,
		price: entryPrice,
		amount: (entryDirection=='long')?tradeAmount:-tradeAmount,
		type: Order.type[orderType],
		priceAuxLimit: entryPrice
	}, ws)

	// Enable automatic updates
	o.registerListeners()

	o.on('update', () => {
		console.log(`order updated: ${o.serialize()}`)
	})

	o.on('close', () => {
		console.log(`order status: ${o.status}`)

		if (o.status != 'CANCELED') {
			console.log(`submitting stop order`)

			const o2 = new Order({
				cid: Date.now(),
				symbol: 't' + tradingPair,
				price: stopPrice,
				amount: (entryDirection=='long')?-tradeAmount:tradeAmount,
				type: Order.type[orderType],
				priceAuxLimit: stopPrice
			}, ws)


			o2.submit().then(() => {
				console.log(`submitted stop order (${orderType}) ${o2.id}`)
			}).catch((err) => {
				console.error(err)
				ws.close()
				process.exitCode = 1
			})
		} else {
			ws.close()
			process.exitCode = 1
		}
	})

	o.submit().then(() => {
		console.log(`submitted entry order (${orderType}) ${o.id}`)
	}).catch((err) => {
		console.error(err)
		
	})
})

ws.open()