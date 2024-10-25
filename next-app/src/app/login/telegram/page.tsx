"use client";

import { openfortClient } from "@/app/client";
import { AuthPlayerResponse, ShieldAuthType, ThirdPartyOAuthProvider, TokenType } from "@openfort/openfort-js"
import { useCallback, useEffect, useRef, useState } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { Logo } from "@/components/Logo";
import MintNFTButton from "@/components/MintNFTButton";

export default function TelegramLogin() {
  const { initDataRaw } = retrieveLaunchParams();
  const [user, setUser] = useState<AuthPlayerResponse>();

  const [message, setMessage] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [message]);

  const handleSetMessage = (message: string) => {
    const newMessage = `> ${message} \n\n`;
    setMessage((prev) => prev + newMessage);
  };

  useEffect(() => {
    (async () => {
      if(!initDataRaw) return;

      try{
        const res = await openfortClient.authenticateWithThirdPartyProvider({
          provider: ThirdPartyOAuthProvider.TELEGRAM_MINI_APP,
          token: initDataRaw as string,
          tokenType: TokenType.CUSTOM_TOKEN,
        });

        const shieldAuth = {
          auth: ShieldAuthType.OPENFORT,
          token: initDataRaw as string,
          authProvider: ThirdPartyOAuthProvider.TELEGRAM_MINI_APP,
          tokenType: "idToken",
          encryptionSession: await getEncryptionSession(),
        };
        await openfortClient.configureEmbeddedSigner(
          +(process.env.NEXT_PUBLIC_OPENFORT_CHAIN_ID as string),
          shieldAuth
        );

        setUser(res);
        handleSetMessage(JSON.stringify(res, null, 2));
      }catch(e){
        console.error(e);
      }
    })();
  }, [initDataRaw]);

  const getEncryptionSession = useCallback(async (): Promise<string> => {
    try{
      const response = await fetch(
        "/api/createEncryptionSession",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      const data = await response.json();
      return data.session;
    } catch (error) {
        throw new Error('Failed to create encryption session');
    }
  },[]);

  return (
    <div className="w-screen h-screen">
      <div className="h-2/3">
        <header className="flex justify-center h-[50px] items-center">
          <Logo className="block h-8 w-auto" />
        </header>
        <main className="justify-center px-2">
          <p className="">Welcome, {user?.id}!</p>

          <MintNFTButton handleSetMessage={handleSetMessage} />
        </main>
      </div>

      <div className="h-1/3 w-full">
        <textarea
          ref={textareaRef}
          className="no-scrollbar h-full w-full rounded-lg border-0 bg-gray-100 p-4 font-mono text-xs text-black"
          value={message}
          readOnly
        />
      </div>
    </div>
  );
}