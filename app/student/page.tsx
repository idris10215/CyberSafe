"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BookOpen, AlertTriangle, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function StudentPageContent() {
  const searchParams = useSearchParams();
  const [userInfo, setUserInfo] = useState({ name: '', age: '', role: '' });
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setUserInfo({
      name: searchParams.get('name') || 'Student',
      age: searchParams.get('age') || '',
      role: searchParams.get('role') || 'student'
    });
  }, [searchParams]);

  const quizQuestions = [
    {
      question: "What should you do if you receive a suspicious email from an unknown sender?",
      options: ["Open it immediately", "Delete it without opening", "Forward it to friends", "Reply asking for more info"],
      correct: 1
    },
    {
      question: "When using public Wi-Fi, you should:",
      options: ["Access banking websites freely", "Avoid sensitive activities", "Share your password", "Download any software"],
      correct: 1
    },
    {
      question: "A strong password should contain:",
      options: ["Only letters", "Your birth date", "Mix of letters, numbers & symbols", "Your name"],
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
            {userInfo.age && `Age: ${userInfo.age} | `}Here's your personalized cyber safety guide for students.
          </p>
        </div>

        {/* Tips Section */}
        <section id="tips" className="mb-12">
          <div className="flex items-center mb-6">
            <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Tips for Students</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Social Media Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Keep your profiles private and think twice before sharing personal information. Never meet strangers you've only talked to online.</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Password Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Use unique, strong passwords for each account. Consider using a password manager to keep track of all your credentials securely.</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Public Wi-Fi Caution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Avoid accessing sensitive information on public Wi-Fi. Use your mobile data or a VPN when possible for better security.</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Download Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Only download apps and software from official stores and websites. Be wary of free downloads that seem too good to be true.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Scams Section */}
        <section id="scams" className="mb-12">
          <div className="flex items-center mb-6">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Common Scams for Students</h2>
          </div>
          
          <div className="grid gap-6">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Student Loan Forgiveness Scams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Scammers promise immediate loan forgiveness for an upfront fee. Legitimate forgiveness programs are free and take time to process.</p>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Fake Job Offers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Be cautious of job offers that require upfront payments or seem too good to be true. Research companies thoroughly before providing personal information.</p>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Romance Scams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Online relationships that quickly turn to requests for money are red flags. Never send money to someone you've never met in person.</p>
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
              <CardTitle className="text-green-800">Student Cyber Safety Quiz</CardTitle>
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
                    {score === quizQuestions.length ? "Perfect score! You're well-prepared for cyber safety." :
                     score >= quizQuestions.length / 2 ? "Good job! Keep learning to improve your cyber safety knowledge." :
                     "Consider reviewing the tips above to strengthen your cyber safety knowledge."}
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

export default function StudentPage() {
  return (
    <Suspense fallback={<div className="pt-16 flex justify-center items-center min-h-screen">Loading...</div>}>
      <StudentPageContent />
    </Suspense>
  );
}