import WalletConnectProvider from "@walletconnect/web3-provider";

//  Create WalletConnect Provider
export const provider = new WalletConnectProvider({
	rpc: {
		1: "https://mainnet.infura.io/v3/87cc26ee46204f55a6a19d212d6a557c",
		16718: "https://network.ambrosus.io/",
	},
});
