
import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CONTRACTS, parseUSDC, formatUSDC } from '@/lib/contracts';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, Loader2 } from 'lucide-react';

export const DepositForm = () => {
  const { address } = useAccount();
  const { toast } = useToast();
  const [depositAmount, setDepositAmount] = useState('');

  // Check USDC allowance
  const { data: allowanceData, refetch: refetchAllowance } = useContractRead({
    address: CONTRACTS.MockUSDC.address as `0x${string}`,
    abi: CONTRACTS.MockUSDC.abi,
    functionName: 'allowance',
    args: [address, CONTRACTS.LendingPool.address],
    enabled: !!address,
    watch: true,
  });

  const needsApproval = allowanceData && depositAmount ? 
    (allowanceData as bigint) < parseUSDC(depositAmount) : true;

  // Prepare approve transaction
  const { config: approveConfig } = usePrepareContractWrite({
    address: CONTRACTS.MockUSDC.address as `0x${string}`,
    abi: CONTRACTS.MockUSDC.abi,
    functionName: 'approve',
    args: [CONTRACTS.LendingPool.address, parseUSDC(depositAmount || '0')],
    enabled: needsApproval && !!depositAmount && parseFloat(depositAmount) > 0,
  });

  const { write: writeApprove, data: approveData } = useContractWrite(approveConfig);
  const { isLoading: isApproving, isSuccess: isApproved } = useWaitForTransaction({
    hash: approveData?.hash,
  });

  // Prepare deposit transaction
  const { config: depositConfig } = usePrepareContractWrite({
    address: CONTRACTS.LendingPool.address as `0x${string}`,
    abi: CONTRACTS.LendingPool.abi,
    functionName: 'deposit',
    args: [parseUSDC(depositAmount || '0')],
    enabled: !needsApproval && !!depositAmount && parseFloat(depositAmount) > 0,
  });

  const { write: writeDeposit, data: depositData } = useContractWrite(depositConfig);
  const { isLoading: isDepositing, isSuccess: isDeposited } = useWaitForTransaction({
    hash: depositData?.hash,
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
    if (!depositAmount || parseFloat(depositAmount) <= 0) return;

    if (needsApproval) {
      writeApprove?.();
    } else {
      writeDeposit?.();
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
              disabled={!writeApprove || isApproving || !depositAmount}
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
              disabled={!writeDeposit || isDepositing || !depositAmount}
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
