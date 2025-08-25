"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Home, AlertTriangle, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function HomemakerPageContent() {
  const searchParams = useSearchParams();
  const [userInfo, setUserInfo] = useState({ name: '', age: '', role: '' });
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setUserInfo({
      name: searchParams.get('name') || 'Homemaker',
      age: searchParams.get('age') || '',
      role: searchParams.get('role') || 'homemaker'
    });
  }, [searchParams]);

  const quizQuestions = [
    {
      question: "When shopping online, what should you look for to ensure the site is secure?",
      options: ["Bright colors", "HTTPS and padlock icon", "Many advertisements", "Cheap prices"],
      correct: 1
    },
    {
      question: "If you receive a call claiming to be from your bank asking for your PIN, you should:",
      options: ["Provide it immediately", "Hang up and call the bank directly", "Ask for their name only", "Give partial information"],
      correct: 1
    },
    {
      question: "The safest way to pay for online purchases is:",
      options: ["Wire transfer", "Credit card or PayPal", "Cash on delivery only", "Debit card"],
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
            {userInfo.age && `Age: ${userInfo.age} | `}Here's your personalized cyber safety guide for homemakers.
          </p>
        </div>

        {/* Tips Section */}
        <section id="tips" className="mb-12">
          <div className="flex items-center mb-6">
            <Home className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Tips for Homemakers</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Online Shopping Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Shop only on secure websites with HTTPS encryption. Use credit cards or PayPal for better protection and avoid storing payment information on websites.</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Smart Home Device Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Change default passwords on smart devices and keep them updated. Set up a separate network for IoT devices to protect your main devices.</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Family Digital Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Set up parental controls and teach children about online safety. Monitor their internet usage and discuss the importance of not sharing personal information.</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Social Media Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Review privacy settings regularly and be cautious about sharing family photos and location information. Limit who can see your posts and personal details.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Scams Section */}
        <section id="scams" className="mb-12">
          <div className="flex items-center mb-6">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Common Scams for Homemakers</h2>
          </div>
          
          <div className="grid gap-6">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Online Shopping Scams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Fake online stores offering unrealistic deals or non-existent products. Always research sellers and look for reviews before making purchases.</p>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Utility Bill Scams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Scammers call claiming your utilities will be shut off unless you pay immediately. Always verify by calling your utility company directly using official numbers.</p>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Home Service Scams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Door-to-door sellers offering unnecessary home improvements or services. Never agree to immediate work and always get multiple quotes from verified contractors.</p>
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
              <CardTitle className="text-green-800">Homemaker Cyber Safety Quiz</CardTitle>
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
                    {score === quizQuestions.length ? "Perfect! You're well-equipped to keep your home safe online." :
                     score >= quizQuestions.length / 2 ? "Great job! Continue learning to protect your family online." :
                     "Review the safety tips to better protect your household from cyber threats."}
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

export default function HomemakerPage() {
  return (
    <Suspense fallback={<div className="pt-16 flex justify-center items-center min-h-screen">Loading...</div>}>
      <HomemakerPageContent />
    </Suspense>
  );
}