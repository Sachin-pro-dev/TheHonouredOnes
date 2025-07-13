
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Shield, Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const IdentityVerification = () => {
  const [step, setStep] = useState(1);
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [shareCode, setShareCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [error, setError] = useState("");

  const steps = [
    { id: 1, title: "Upload Aadhaar XML", icon: Upload },
    { id: 2, title: "Verification Processing", icon: FileText },
    { id: 3, title: "Verification Complete", icon: CheckCircle }
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAadhaarFile(file);
      setError("");
    }
  };

  const handleAadhaarSubmit = async () => {
    if (!aadhaarFile || !shareCode) {
      setError("Please select a file and enter the share code");
      return;
    }

    if (shareCode.length !== 4 || !/^\d{4}$/.test(shareCode)) {
      setError("Share code must be exactly 4 digits");
      return;
    }

    setIsVerifying(true);
    setError("");
    setStep(2);

    const formData = new FormData();
    formData.append('aadhaarFile', aadhaarFile);
    formData.append('shareCode', shareCode);

    try {
      // Call the actual Python Flask backend
      const response = await fetch('http://localhost:5000/verify-aadhaar', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setVerificationResult(result);
        setStep(3);
      } else {
        setError(result.error || 'Verification failed. Please check your file and share code.');
        setStep(1);
      }
    } catch (err) {
      console.error('Backend connection error:', err);
      setError('Failed to connect to verification server. Please ensure the Python backend is running on localhost:5000');
      setStep(1);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Aadhaar ZK Verification</h1>
          <p className="text-gray-400">
            Verify your identity securely using zero-knowledge proofs
          </p>
          <Progress value={(step / steps.length) * 100} className="w-full" />
        </div>

        {/* Steps */}
        <div className="flex justify-center space-x-4 mb-8">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.id} className={`flex flex-col items-center space-y-2 ${
                step >= s.id ? 'text-clen-green' : 'text-gray-500'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step >= s.id ? 'border-clen-green bg-clen-green/20' : 'border-gray-600'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-center">{s.title}</span>
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <Card className="glass-card border border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <Shield className="w-5 h-5 text-clen-green" />
              <span>Aadhaar Offline e-KYC Verification</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-blue-900/30 border border-blue-500/30 space-y-2">
                  <h4 className="font-medium text-sm text-blue-300">📋 How to get your Aadhaar XML:</h4>
                  <ol className="text-xs text-blue-200 space-y-1 ml-4">
                    <li>1. Visit <a href="https://myaadhaar.uidai.gov.in/offline-ekyc" target="_blank" rel="noopener noreferrer" className="underline text-blue-300">myaadhaar.uidai.gov.in/offline-ekyc</a></li>
                    <li>2. Login with your Aadhaar/VID and OTP</li>
                    <li>3. Create a 4-digit Share Code (remember this!)</li>
                    <li>4. Download the ZIP file</li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="aadhaarFile" className="text-white">Upload Aadhaar XML ZIP File</Label>
                    <Input
                      id="aadhaarFile"
                      type="file"
                      accept=".zip"
                      onChange={handleFileChange}
                      className="bg-white/10 border-white/20 text-white cursor-pointer"
                    />
                    {aadhaarFile && (
                      <p className="text-sm text-clen-green">✓ File selected: {aadhaarFile.name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="shareCode" className="text-white">4-digit Share Code (Password)</Label>
                    <Input
                      id="shareCode"
                      type="text"
                      placeholder="Enter 4-digit code"
                      value={shareCode}
                      onChange={(e) => setShareCode(e.target.value)}
                      maxLength={4}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center space-x-2 text-red-400 text-sm bg-red-900/30 border border-red-500/30 p-3 rounded-lg">
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-600/30 space-y-2">
                  <h4 className="font-medium text-sm text-white">🔒 Privacy Guaranteed</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Your Aadhaar data is processed locally</li>
                    <li>• Zero-knowledge proofs protect your identity</li>
                    <li>• Only age (18+) and state are verified</li>
                    <li>• No sensitive data is stored on our servers</li>
                    <li>• Compliant with data protection laws</li>
                  </ul>
                </div>

                <Button 
                  className="w-full bg-gradient-primary text-black font-semibold" 
                  onClick={handleAadhaarSubmit}
                  disabled={!aadhaarFile || !shareCode || shareCode.length !== 4}
                >
                  Verify with ZK Proof
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-gradient-primary/20 border border-clen-green/30 flex items-center justify-center mx-auto animate-pulse">
                  <FileText className="w-12 h-12 text-clen-green" />
                </div>
                <h3 className="text-lg font-semibold text-white">Processing Aadhaar Data...</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-300">Extracting XML data from ZIP file</p>
                  <p className="text-sm text-gray-300">Validating digital signatures</p>
                  <p className="text-sm text-gray-300">Generating zero-knowledge proofs</p>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-primary h-2 rounded-full animate-pulse w-3/4"></div>
                </div>
              </div>
            )}

            {step === 3 && verificationResult && (
              <div className="text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-clen-green/20 border border-clen-green/50 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-12 h-12 text-clen-green" />
                </div>
                <h3 className="text-lg font-semibold text-clen-green">Verification Successful!</h3>
                
                {verificationResult.photo && (
                  <div className="flex justify-center">
                    <img 
                      src={`data:image/jpeg;base64,${verificationResult.photo}`}
                      alt="User Photo"
                      className="w-32 h-32 rounded-full border-4 border-clen-green object-cover"
                    />
                  </div>
                )}

                <div className="space-y-3 text-left max-w-md mx-auto bg-white/5 border border-white/20 rounded-lg p-4">
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="font-medium text-gray-300">Name:</span>
                    <span className="text-white">{verificationResult.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="font-medium text-gray-300">Date of Birth:</span>
                    <span className="text-white">{verificationResult.dob}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="font-medium text-gray-300">Gender:</span>
                    <span className="text-white">{verificationResult.gender === 'M' ? 'Male' : verificationResult.gender === 'F' ? 'Female' : verificationResult.gender}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="font-medium text-gray-300">Address:</span>
                    <span className="text-white text-right">{verificationResult.address}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-gray-300">Reference ID:</span>
                    <span className="text-xs font-mono text-white">{verificationResult.referenceId}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-clen-green/20 text-clen-green border-clen-green/30">
                    ✓ Age verified (18+)
                  </Badge>
                  <Badge variant="secondary" className="bg-clen-green/20 text-clen-green border-clen-green/30">
                    ✓ Identity uniqueness confirmed
                  </Badge>
                  <Badge variant="secondary" className="bg-clen-green/20 text-clen-green border-clen-green/30">
                    ✓ Residence state verified
                  </Badge>
                </div>

                <div className="text-xs text-gray-400 bg-gray-800/30 border border-gray-600/30 p-3 rounded-lg">
                  <p><strong>Note:</strong> For privacy protection, your complete address and full Aadhaar number are not displayed. Only verification proofs are generated.</p>
                </div>

                <Button className="w-full bg-gradient-primary text-black font-semibold" asChild>
                  <Link to="/onboarding/did">Continue to DID Setup</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/auth/connect" className="text-sm text-gray-400 hover:text-white">
            ← Back to Wallet Connection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IdentityVerification;
