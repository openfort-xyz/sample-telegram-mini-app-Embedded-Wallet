import React, {useCallback, useState} from 'react';
import { openfortClient } from "@/app/client";

const MintNFTButton: React.FC<{
  handleSetMessage: (message: string) => void;
}> = ({handleSetMessage}) => {
  const [loading, setLoading] = useState(false);

  const mintNFT = useCallback(async (): Promise<string | null> => {
    const collectResponse = await fetch(`/api/mintNft`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openfortClient.getAccessToken()}`,
      },
    });

    if (!collectResponse.ok) {
      alert('Failed to mint NFT status: ' + collectResponse.status);
      return null;
    }
    const collectResponseJSON = await collectResponse.json();

    if (collectResponseJSON.data?.nextAction) {
      const response =
        await openfortClient.sendSignatureTransactionIntentRequest(
          collectResponseJSON.data.id,
          collectResponseJSON.data.nextAction.payload.userOperationHash
        );

        return response.response?.transactionHash ?? null;
    } else return null;
  }, []);

  const handleMintNFT = async () => {
    setLoading(true);
    const transactionHash = await mintNFT();
    setLoading(false);
    if (transactionHash) {
      handleSetMessage(`Minted NFT successfully: https://amoy.polygonscan.com/tx/${transactionHash}`);
    }
  };

  return (
    <div>
      <button
        onClick={handleMintNFT}
        disabled={loading}
        className={`mt-4 w-32 px-4 py-2 bg-sky-400	text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
      >
        {"Mint NFT"}
      </button>
    </div>
  );
};

export default MintNFTButton;
