import Openfort from "@openfort/openfort-js";

const publishableKey = process.env.NEXT_PUBLIC_OPENFORT_PUBLISHABLE_KEY as string;
const shieldPublishableKey = process.env
  .NEXT_PUBLIC_OPENFORT_SHIELD_PUBLISHABLE_KEY as string;

if (!publishableKey) {
  throw new Error("No Publishable Key ID provided");
}

export const openfortClient = new Openfort({ 
  baseConfiguration: {publishableKey},
  shieldConfiguration: {shieldPublishableKey}
});
