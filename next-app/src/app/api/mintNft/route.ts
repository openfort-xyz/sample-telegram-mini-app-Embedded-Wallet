import openfort from "@/app/admin-client";
import { cors, runMiddleware } from "@/utils/cors";
import { NextRequest } from "next/server";

const contract_id = process.env.NEXT_PUBLIC_OPENFORT_CONTRACT_ID;
const optimistic = true;
const policy_id = process.env.NEXT_PUBLIC_OPENFORT_POLICY_ID;
const chainId = Number(process.env.NEXT_PUBLIC_OPENFORT_CHAIN_ID);

export async function POST(request: NextRequest) {
    // Run the middleware
    await runMiddleware(request, cors);

    const accessToken = request.headers.get("authorization")?.split(" ")[1];
    if (!accessToken) {
        return new Response(
            JSON.stringify({
            error:
                "You must be signed in to view the protected content on this page.",
            }),
            { status: 401, headers: { "Content-Type": "application/json" } }
        );
    }

    try {
        const response = await openfort.iam.verifyOAuthToken({
            provider: "telegramMiniApp",
            token: accessToken,
            tokenType: "customToken",
        });

      if (!response?.id) {
        return new Response(
          JSON.stringify({ error: "Invalid token or unable to verify user." }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
      }

      const playerId = response.id;
      const interaction_mint = {
        contract: contract_id,
        functionName: "mint",
        functionArgs: [playerId],
      };

      const transactionIntent = await openfort.transactionIntents.create({
        player: playerId,
        policy: policy_id,
        chainId,
        optimistic,
        interactions: [interaction_mint],
      });

      return new Response(
        JSON.stringify({
          data: transactionIntent,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (e) {
      console.error(e);
      return new Response(JSON.stringify(e), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
}
