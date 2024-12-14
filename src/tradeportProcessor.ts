import { kiosk_listings } from "./types/sui/0x33a9e4a3089d911c2a2bf16157a1d6a4a8cbd9a2106a98ecbaefe6ed370d7a25.js";
import { SuiContext } from "@sentio/sdk/sui"

export function initTradeportProcessor() {
  kiosk_listings.bind().onEventBuyEvent(async (event, ctx: SuiContext) => {
    ctx.eventLogger.emit("tradeport_buys", {
    listing_id: event.data_decoded.listing_id,
    seller: event.data_decoded.seller,
    seller_kiosk_id: event.data_decoded.seller_kiosk_id,
    buyer: event.data_decoded.buyer,
    buyer_kiosk_id: event.data_decoded.buyer_kiosk_id,
    nft_id: event.data_decoded.nft_id,
    price: event.data_decoded.price.toString()  ,
    commission: event.data_decoded.commission.toString(),
    beneficiary: event.data_decoded.beneficiary,
    })
  })
  .onEventListEvent(async (event, ctx: SuiContext) => {
    ctx.eventLogger.emit("tradeport_lists", {
      listing_id: event.data_decoded.listing_id,
      seller: event.data_decoded.seller,
      kiosk_id: event.data_decoded.kiosk_id,
      nft_id: event.data_decoded.nft_id,
      price: event.data_decoded.price.toString(),
      commission: event.data_decoded.commission.toString(),
      beneficiary: event.data_decoded.beneficiary
    })
  })
}
