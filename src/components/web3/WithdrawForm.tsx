
import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CONTRACTS, parseUSDC, formatUSDC } from '@/lib/contracts';
import { useToast } from '@/hooks/use-toast';
import { ArrowUpFromLine, Loader2 } from 'lucide-react';

interface WithdrawFormProps {
  userDeposits: bigint;
}

const WithdrawForm = ({ userDeposits }: WithdrawFormProps) => {
  const { address } = useAccount();
  const { toast } = useToast();
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // Contract write hook
  const { writeContract: writeWithdraw, data: withdrawHash, isPending: isWithdrawing } = useWriteContract();
  const { isSuccess: isWithdrawn } = useWaitForTransactionReceipt({
    hash: withdrawHash,
  });

  useEffect(() => {
    if (isWithdrawn) {
      toast({
        title: "Withdrawal Successful! 💰",
        description: `Successfully withdrew $${withdrawAmount} USDC.`,
      });
      setWithdrawAmount('');
    }
  }, [isWithdrawn, withdrawAmount, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0 || !address) return;
    
    writeWithdraw({
      address: CONTRACTS.LendingPool.address as `0x${string}`,
      abi: CONTRACTS.LendingPool.abi,
      functionName: 'withdraw',
      args: [parseUSDC(withdrawAmount)],
    });
  };

  const handleMaxClick = () => {
    setWithdrawAmount(formatUSDC(userDeposits));
  };

  const formattedDeposits = formatUSDC(userDeposits);

  return (
    <Card className="glass-strong">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ArrowUpFromLine className="w-5 h-5 text-clen-blue" />
          <span>Withdraw USDC</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 glass rounded-lg">
          <div className="text-sm text-muted-foreground">Available to Withdraw</div>
          <div className="text-lg font-semibold text-clen-green">${formattedDeposits}</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="withdraw-amount" className="text-white">Amount (USDC)</Label>
            <div className="flex space-x-2">
              <Input
                id="withdraw-amount"
                type="number"
                step="0.01"
                min="0"
                max={formattedDeposits}
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="0.00"
                className="glass-input flex-1"
              />
              <Button
                type="button"
                onClick={handleMaxClick}
                variant="outline"
                className="glass-button"
              >
                Max
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isWithdrawing || !withdrawAmount}
            className="w-full bg-gradient-primary hover:opacity-90"
          >
            {isWithdrawing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Withdrawing...
              </>
            ) : (
              `Withdraw $${withdrawAmount || '0'}`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WithdrawForm;
