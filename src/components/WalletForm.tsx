"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { assets } from "@/utils/constants";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { checkRoute } from "@/utils/checkRoute";
import { Wallet } from "@/utils/types";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const WalletForm = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [selectedAsset, setSelectedAsset] = useState("");
    const [chain, setChain] = useState("");
    const [balance, setBalance] = useState<string>("");

    const splitToken = (asset: string) => {
        return asset.split("-")[0].trim();
    }

    const handleAssetChange = (asset: string) => {
        const selected = assets.find((a) => a.name === splitToken(asset));
        if (selected) {
            setChain(selected.chain);
        }
    };

    const getBalance = async () => {
        try {
            let asset = splitToken(selectedAsset);

            let url = checkRoute(asset);

            const wallet: Wallet = { address: walletAddress, token: asset };

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, wallet, {
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (response.status !== 200) {
                throw new Error("Cannot fetch balance.");
                return;
            }

            const data = await response.data;

            setBalance(data);

        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Wallet Balance Checker</CardTitle>
                <CardDescription>Check your wallet balance by selecting the respective asset.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="asset">Select Asset</Label>
                            <Select
                                name="asset"
                                value={selectedAsset}
                                onValueChange={(value) => {
                                    setSelectedAsset(value);
                                    handleAssetChange(value);
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Asset" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {assets.map((asset, index) => (
                                        <SelectItem key={index} value={`${asset.name} - ${asset.chain}`}>
                                            {asset.name} - {asset.chain}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="walletAddress">Wallet Address</Label>
                            <Input
                                id="walletAddress"
                                placeholder="Enter Wallet Address"
                                value={walletAddress}
                                onChange={(e) => setWalletAddress(e.target.value)}
                            />
                        </div>
                        <h1 className="mt-2">Selected Chain: {chain}</h1>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button
                    onClick={getBalance}
                >
                    Get Balance
                </Button>
            </CardFooter>
            {balance.length !== 0 && (
                <Alert style={{ display: 'flex', justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <AlertTitle>Your Balance</AlertTitle>
                    <AlertDescription>
                        {balance} {selectedAsset}
                    </AlertDescription>
                </Alert>
            )}
        </Card>
    );
};

export default WalletForm;
