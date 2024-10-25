import openfort from "@/app/admin-client";

export async function POST() {
    const session = await openfort.registerRecoverySession(
      process.env.NEXT_PUBLIC_OPENFORT_SHIELD_PUBLISHABLE_KEY as string,
      process.env.OPENFORT_SHIELD_SECRET_KEY as string,
      process.env.OPENFORT_SHIELD_ENCRYPTION_SHARE as string
    );  

    return new Response(
        JSON.stringify({ session }),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}