
import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CONTRACTS, parseUSDC } from '@/lib/contracts';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, Loader2 } from 'lucide-react';

export const DepositForm = () => {
  const { address, chain } = useAccount();
  const { toast } = useToast();
  const [depositAmount, setDepositAmount] = useState('');

  // Check USDC allowance
  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: CONTRACTS.MockUSDC.address as `0x${string}`,
    abi: CONTRACTS.MockUSDC.abi,
    functionName: 'allowance',
    args: [address, CONTRACTS.LendingPool.address],
    query: {
      enabled: !!address,
    }
  });

  const needsApproval = allowanceData && depositAmount ? 
    (allowanceData as bigint) < parseUSDC(depositAmount) : true;

  // Contract write hooks
  const { writeContract: writeApprove, data: approveHash, isPending: isApproving } = useWriteContract();
  const { isSuccess: isApproved } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  const { writeContract: writeDeposit, data: depositHash, isPending: isDepositing } = useWriteContract();
  const { isSuccess: isDeposited } = useWaitForTransactionReceipt({
    hash: depositHash,
  });

  useEffect(() => {
    if (isApproved) {
      toast({
        title: "USDC Approved! ✅",
        description: "You can now deposit your USDC.",
      });
      refetchAllowance();
    }
  }, [isApproved, toast, refetchAllowance]);

  useEffect(() => {
    if (isDeposited) {
      toast({
        title: "Deposit Successful! 🎉",
        description: `Successfully deposited $${depositAmount} USDC.`,
      });
      setDepositAmount('');
    }
  }, [isDeposited, depositAmount, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositAmount || parseFloat(depositAmount) <= 0 || !address || !chain) return;

    if (needsApproval) {
      writeApprove({
        address: CONTRACTS.MockUSDC.address as `0x${string}`,
        abi: CONTRACTS.MockUSDC.abi,
        functionName: 'approve',
        args: [CONTRACTS.LendingPool.address, parseUSDC(depositAmount)],
        chain,
        account: address,
      });
    } else {
      writeDeposit({
        address: CONTRACTS.LendingPool.address as `0x${string}`,
        abi: CONTRACTS.LendingPool.abi,
        functionName: 'deposit',
        args: [parseUSDC(depositAmount)],
        chain,
        account: address,
      });
    }
  };

  return (
    <Card className="glass-strong">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-clen-green" />
          <span>Deposit USDC</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="deposit-amount" className="text-white">Amount (USDC)</Label>
            <Input
              id="deposit-amount"
              type="number"
              step="0.01"
              min="0"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="0.00"
              className="glass-input"
            />
          </div>

          {needsApproval ? (
            <Button
              type="submit"
              disabled={isApproving || !depositAmount}
              className="w-full glass-button"
            >
              {isApproving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Approving...
                </>
              ) : (
                'Approve USDC'
              )}
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isDepositing || !depositAmount}
              className="w-full bg-gradient-primary hover:opacity-90"
            >
              {isDepositing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Depositing...
                </>
              ) : (
                `Deposit $${depositAmount || '0'}`
              )}
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};
