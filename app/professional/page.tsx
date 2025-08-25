"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Briefcase, AlertTriangle, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function ProfessionalPageContent() {
  const searchParams = useSearchParams();
  const [userInfo, setUserInfo] = useState({ name: '', age: '', role: '' });
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setUserInfo({
      name: searchParams.get('name') || 'Professional',
      age: searchParams.get('age') || '',
      role: searchParams.get('role') || 'professional'
    });
  }, [searchParams]);

  const quizQuestions = [
    {
      question: "What is the best practice for handling sensitive company data?",
      options: ["Email it freely", "Use encrypted communication", "Store on personal devices", "Share via social media"],
      correct: 1
    },
    {
      question: "If you suspect a phishing email at work, you should:",
      options: ["Click to verify", "Report to IT security", "Ignore it completely", "Forward to colleagues"],
      correct: 1
    },
    {
      question: "When working remotely, the most secure connection method is:",
      options: ["Public Wi-Fi", "Home Wi-Fi only", "Company VPN", "Mobile hotspot"],
      correct: 2
    }
  ];

  const handleQuizAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === quizQuestions[currentQuiz].correct) {
      setScore(score + 1);
    }
    
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {userInfo.name}!
          </h1>
          <p className="text-gray-600">
            {userInfo.age && `Age: ${userInfo.age} | `}Here's your personalized cyber safety guide for professionals.
          </p>
        </div>

        {/* Tips Section */}
        <section id="tips" className="mb-12">
          <div className="flex items-center mb-6">
            <Briefcase className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Tips for Professionals</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Data Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Always encrypt sensitive business data and use secure file sharing platforms. Never store confidential information on personal devices or unsecured cloud services.</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Email Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Verify sender identity before clicking links or downloading attachments. Use email encryption for sensitive communications and be wary of urgent requests.</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Remote Work Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Always use company VPN when accessing work resources remotely. Secure your home office and ensure your family members can't access work devices.</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Multi-Factor Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Enable MFA on all work accounts and applications. Use authenticator apps instead of SMS when possible for better security.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Scams Section */}
        <section id="scams" className="mb-12">
          <div className="flex items-center mb-6">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Common Scams for Professionals</h2>
          </div>
          
          <div className="grid gap-6">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Business Email Compromise (BEC)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Scammers impersonate executives requesting urgent wire transfers or sensitive information. Always verify requests through alternative communication channels.</p>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Fake LinkedIn Job Offers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Fraudulent recruiters offer high-paying remote positions requiring upfront payments or personal information. Research companies and verify recruiter identities.</p>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Invoice Fraud</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Scammers send fake invoices hoping for automatic payment. Always verify invoices with known vendor contacts and check purchase order numbers.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quiz Section */}
        <section id="quiz">
          <div className="flex items-center mb-6">
            <Brain className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Test Your Knowledge</h2>
          </div>
          
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Professional Cyber Safety Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              {!showResult ? (
                <div>
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">Question {currentQuiz + 1} of {quizQuestions.length}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-4">{quizQuestions[currentQuiz].question}</h3>
                  <div className="space-y-3">
                    {quizQuestions[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full text-left justify-start p-4"
                        onClick={() => handleQuizAnswer(index)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4">Quiz Complete!</h3>
                  <p className="text-lg mb-4">
                    You scored {score} out of {quizQuestions.length}
                  </p>
                  <p className="text-gray-600 mb-6">
                    {score === quizQuestions.length ? "Excellent! You understand professional cyber security well." :
                     score >= quizQuestions.length / 2 ? "Good foundation! Continue learning about workplace security." :
                     "Consider reviewing workplace security policies and best practices."}
                  </p>
                  <Button onClick={resetQuiz} className="bg-green-600 hover:bg-green-700">
                    Take Quiz Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default function ProfessionalPage() {
  return (
    <Suspense fallback={<div className="pt-16 flex justify-center items-center min-h-screen">Loading...</div>}>
      <ProfessionalPageContent />
    </Suspense>
  );
}