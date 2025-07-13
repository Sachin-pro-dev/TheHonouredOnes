
import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { CONTRACTS } from '@/lib/contracts';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Loader2 } from 'lucide-react';

export const CreditRequestForm = () => {
  const { address } = useAccount();
  const { toast } = useToast();
  const [selectedTier, setSelectedTier] = useState<string>('');

  // Contract write hook
  const { writeContract: writeRequestCredit, data: creditHash, isPending: isRequesting } = useWriteContract();
  const { isSuccess: isRequested } = useWaitForTransactionReceipt({
    hash: creditHash,
  });

  useEffect(() => {
    if (isRequested) {
      toast({
        title: "Credit Approved! 🎉",
        description: `Your Tier ${selectedTier} credit voucher has been created.`,
      });
      setSelectedTier('');
    }
  }, [isRequested, selectedTier, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier || !address) return;
    
    writeRequestCredit({
      address: CONTRACTS.LendingPool.address as `0x${string}`,
      abi: CONTRACTS.LendingPool.abi,
      functionName: 'requestCredit',
      args: [parseInt(selectedTier)],
    });
  };

  const tierOptions = [
    { value: '1', label: 'Tier 1 - Basic ($1,000)', limit: 1000 },
    { value: '2', label: 'Tier 2 - Standard ($5,000)', limit: 5000 },
    { value: '3', label: 'Tier 3 - Premium ($15,000)', limit: 15000 },
  ];

  return (
    <Card className="glass-strong">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5 text-clen-purple" />
          <span>Request Credit</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Select Credit Tier</Label>
            <Select value={selectedTier} onValueChange={setSelectedTier}>
              <SelectTrigger className="glass-input">
                <SelectValue placeholder="Choose your credit tier" />
              </SelectTrigger>
              <SelectContent className="glass border border-white/20">
                {tierOptions.map((tier) => (
                  <SelectItem key={tier.value} value={tier.value} className="text-white hover:bg-white/10">
                    {tier.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTier && (
            <div className="p-3 glass rounded-lg">
              <div className="text-sm text-muted-foreground">Credit Limit</div>
              <div className="text-lg font-semibold text-clen-green">
                ${tierOptions.find(t => t.value === selectedTier)?.limit.toLocaleString()}
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={isRequesting || !selectedTier}
            className="w-full bg-gradient-primary hover:opacity-90"
          >
            {isRequesting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Requesting Credit...
              </>
            ) : (
              'Request Credit Voucher'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
