export const checkRoute = (selectedAsset: string) => {
    let asset = selectedAsset.toLowerCase();

    let url = "";

    if (asset === "wbtc" || asset === "solvbtc" || asset == "ibtc" || asset === "wcbtc") {
        url = "/check-erc20";
    }
    else if (asset === "sepolia eth") {
        url = "/check-sepolia-eth";
    } else if (asset === "citrea") {
        url = "/check-citrea";
    } else if (asset === "testnet btc") {
        url = "/check-testnet-btc";
    } else {
        url = "/home";
    }

    return url;
}