"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Users, AlertTriangle, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function SeniorCitizenPageContent() {
  const searchParams = useSearchParams();
  const [userInfo, setUserInfo] = useState({ name: '', age: '', role: '' });
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setUserInfo({
      name: searchParams.get('name') || 'Senior Citizen',
      age: searchParams.get('age') || '',
      role: searchParams.get('role') || 'senior-citizen'
    });
  }, [searchParams]);

  const quizQuestions = [
    {
      question: "If someone calls claiming to be from Social Security asking for your SSN, you should:",
      options: ["Provide it to verify identity", "Hang up and call Social Security directly", "Ask for their badge number", "Give the last 4 digits only"],
      correct: 1
    },
    {
      question: "What is a common sign of a phone scam targeting seniors?",
      options: ["Polite conversation", "Urgent pressure to act immediately", "Asking about your health", "Offering free information"],
      correct: 1
    },
    {
      question: "When your computer shows a pop-up saying it's infected, you should:",
      options: ["Call the number provided", "Close the pop-up and run your own antivirus", "Click to scan immediately", "Restart and ignore it"],
      correct: 1
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
            {userInfo.age && `Age: ${userInfo.age} | `}Here's your personalized cyber safety guide for senior citizens.
          </p>
        </div>

        {/* Tips Section */}
        <section id="tips" className="mb-12">
          <div className="flex items-center mb-6">
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Tips for Senior Citizens</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Phone Call Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Never give personal information over the phone to unsolicited callers. Legitimate organizations won't ask for sensitive information this way. Hang up and call them back using official numbers.</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Email Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Be suspicious of urgent emails asking for personal information or payments. Check the sender's address carefully and look for spelling errors that indicate fake emails.</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Computer Pop-ups</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Ignore scary computer warnings that pop up suddenly. Real antivirus software doesn't work through pop-up ads. Close the pop-up and use your trusted antivirus software.</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Online Banking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Always type your bank's website address directly in the browser. Never click email links to access your bank account. Log out completely when finished.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Scams Section */}
        <section id="scams" className="mb-12">
          <div className="flex items-center mb-6">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Common Scams for Senior Citizens</h2>
          </div>
          
          <div className="grid gap-6">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Medicare/Social Security Scams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Scammers impersonate government agencies to steal your Medicare number or Social Security benefits. Government agencies will never call asking for this information.</p>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Grandparent Scams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Scammers call pretending to be a grandchild in trouble, asking for emergency money. Always verify by calling your grandchild directly or asking questions only they would know.</p>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Charity Scams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Fake charities exploit your generosity, especially after disasters. Research charities before donating and be wary of high-pressure tactics or requests for cash donations.</p>
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
              <CardTitle className="text-green-800">Senior Citizen Cyber Safety Quiz</CardTitle>
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
                    {score === quizQuestions.length ? "Excellent! You're well-protected against common scams." :
                     score >= quizQuestions.length / 2 ? "Good awareness! Keep learning to stay safe from scammers." :
                     "Consider reviewing the tips and discussing cyber safety with trusted family members."}
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

export default function SeniorCitizenPage() {
  return (
    <Suspense fallback={<div className="pt-16 flex justify-center items-center min-h-screen">Loading...</div>}>
      <SeniorCitizenPageContent />
    </Suspense>
  );
}