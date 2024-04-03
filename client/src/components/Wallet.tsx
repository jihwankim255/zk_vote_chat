import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@demox-labs/aleo-wallet-adapter-reactui";
import {
    DecryptPermission,
    WalletAdapterNetwork,
  } from "@demox-labs/aleo-wallet-adapter-base";
import { useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";

const Wallet: React.FC =() => {
    const wallets = useMemo(
        () => [
          new LeoWalletAdapter({
            appName: "Leo Demo App",
          }),
        ],
        []
      );
    return <WalletProvider
    wallets={wallets}
    decryptPermission={DecryptPermission.UponRequest}
    network={WalletAdapterNetwork.Testnet}
    autoConnect={true}
  >
    <WalletModalProvider>
      <WalletMultiButton />
      <WalletToolBox />
    </WalletModalProvider>
  </WalletProvider>
}
const WalletToolBox = () => {
    const [hyperlink, setHyperlink] = useState<string | null>(null);
  
    return (
      <div className="mt-2 flex-column rounded border-2 p-4 bg-light shadow">
        {hyperlink && (
          <div className="mt-2">
            <p>Generated Hyperlink:</p>
            <a href={hyperlink} target="_blank" rel="noopener noreferrer">
              🔗
            </a>
            &nbsp; Link
          </div>
        )}
  
        <ToastContainer
          position="top-right"
          // autoClose={3000}
          hideProgressBar={false}
        />
      </div>
    );
  };
export default Wallet