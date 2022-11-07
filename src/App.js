import {provider} from "./walletconnect";
import {useEffect, useState} from "react";
import './App.css';

function App() {

  const [logs, setLogs] = useState([]);
  const addToLogs = (log) => setLogs(prev => [...prev, log])

  useEffect(() => {
    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
      const message = `accountsChanged event caught, \nreturned "account" value: ${accounts}`;
      console.log(message);
      addToLogs(message)
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      const message = `chainChanged event caught, \nreturned "chainId" value: ${chainId}`;
      console.log(message);
      addToLogs(message)
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      const message = `disconnect event caught, \nreturned "code" value: ${code} \nreturned "reason" value: ${reason}`;
      console.log(message);
      addToLogs(message)
    });
  }, [])

  const switchChainId = (hexChainId) =>
      provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexChainId }],
      })

  return (
    <section className="App">
      <div>
        <button onClick={() => provider.enable()}>
          connect
        </button>
        <button onClick={() => provider.disconnect()}>
          disconnect
        </button>
        <br />

        <button onClick={() => switchChainId('0x414E')}>
          switch to AMB
        </button>

        <br />

        <button onClick={() => switchChainId('0x1')}>
          switch to ETH
        </button>
      </div>
      <div>
        <h4>logs:</h4>
        {logs.map(log => (
          <p>{log}</p>
        ))}
      </div>
    </section>
  );
}

export default App;
