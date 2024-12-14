import { events, egg } from "./types/sui/0x484932c474bf09f002b82e4a57206a6658a0ca6dbdb15896808dcd1929c77820.js";
import { SuiContext, SuiObjectTypeProcessor } from "@sentio/sdk/sui"

export function initAfEggProcessor() {
  events.bind().onEventMintedEggs(async (event, ctx: SuiContext) => {
    ctx.eventLogger.emit("AFEggs_minted", {
      amount: event.data_decoded.amount.toString()
    })
  })
  .onEventCompletedWhitelistPurchase(async (event, ctx: SuiContext) => {
    ctx.eventLogger.emit("AFEggs_whitelist_purchase", {
      buyer: event.data_decoded.buyer
    })
  })
  .onEventCompletedPublicSalePurchase(async (event, ctx: SuiContext) => {
    ctx.eventLogger.emit("AFEggs_public_sale_purchase", {
      buyer: event.data_decoded.buyer
    })
  })
  .onEventAddedToWhitelist(async (event, ctx: SuiContext) => {
    ctx.eventLogger.emit("AFEggs_whitelist_add", {
      added_address: event.data_decoded.added_address
    })
  }).onEventRemovedFromWhitelist(async (event, ctx: SuiContext) => {
    ctx.eventLogger.emit("AFEggs_whitelist_remove", {
      removed_address: event.data_decoded.removed_address
    })
  });

  // get all egg ids
  SuiObjectTypeProcessor.bind({
    objectType: egg.AfEgg.type(),
    startCheckpoint: 6684000n
  })
  .onTimeInterval(async (self, _, ctx) => {
    if (!self) { return }
    ctx.eventLogger.emit("AFEggs_ids", {
      id: self.data_decoded.id
    })
  })
}
