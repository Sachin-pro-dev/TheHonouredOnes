import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { Wallet, Shield, Zap, CheckCircle } from "lucide-react";

const ConnectWallet = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      // Redirect to onboarding after wallet connection
      navigate('/onboarding/identity');
    }
  }, [isConnected, navigate]);

  const benefits = [
    { icon: Shield, text: "Secure DeFi transactions", color: "text-green-500" },
    { icon: Zap, text: "Instant USDT transfers", color: "text-blue-500" },
    { icon: CheckCircle, text: "Decentralized credit scoring", color: "text-purple-500" }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto">
            <Wallet className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold">Connect Your Wallet</h1>
          <p className="text-muted-foreground">
            Connect your Web3 wallet to start building your credit score
          </p>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Connect Your Web3 Wallet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
                }) => {
                  const ready = mounted && authenticationStatus !== 'loading';
                  const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                      authenticationStatus === 'authenticated');

                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        'style': {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <Button
                              onClick={openConnectModal}
                              className="w-full h-16 bg-gradient-primary hover:opacity-90 text-lg font-semibold"
                            >
                              <Wallet className="w-6 h-6 mr-3" />
                              Connect Wallet
                            </Button>
                          );
                        }

                        if (chain.unsupported) {
                          return (
                            <Button
                              onClick={openChainModal}
                              variant="destructive"
                              className="w-full h-16"
                            >
                              Wrong Network
                            </Button>
                          );
                        }

                        return (
                          <div className="flex gap-3">
                            <Button
                              onClick={openChainModal}
                              variant="outline"
                              className="flex-1"
                            >
                              {chain.hasIcon && (
                                <div
                                  style={{
                                    background: chain.iconBackground,
                                    width: 12,
                                    height: 12,
                                    borderRadius: 999,
                                    overflow: 'hidden',
                                    marginRight: 4,
                                  }}
                                >
                                  {chain.iconUrl && (
                                    <img
                                      alt={chain.name ?? 'Chain icon'}
                                      src={chain.iconUrl}
                                      style={{ width: 12, height: 12 }}
                                    />
                                  )}
                                </div>
                              )}
                              {chain.name}
                            </Button>

                            <Button
                              onClick={openAccountModal}
                              variant="outline"
                              className="flex-1"
                            >
                              {account.displayName}
                              {account.displayBalance
                                ? ` (${account.displayBalance})`
                                : ''}
                            </Button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </div>

            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-2 text-sm text-muted-foreground">
          <p>Connect your wallet to access crypto-native credit services</p>
          <p>Supports MetaMask, WalletConnect, Coinbase Wallet, Rainbow, and more</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;