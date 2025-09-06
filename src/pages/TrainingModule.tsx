import React, { useState } from 'react';
import { BookOpen, Play, CheckCircle, Award, ArrowRight, Globe, Volume2 } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNotifications } from '../context/NotificationContext';

const TrainingModule: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [language, setLanguage] = useState('english');
  const { updateGreenCoins } = useUser();
  const { addNotification } = useNotifications();

  const trainingModules = [
    {
      id: 1,
      title: 'Waste Segregation Basics',
      description: 'Learn the fundamentals of proper waste separation',
      duration: '15 min',
      level: 'Beginner',
      coins: 20,
      completed: true,
      content: [
        'Understanding different types of waste',
        'Color coding for waste bins',
        'Common mistakes to avoid',
        'Environmental impact of proper segregation'
      ]
    },
    {
      id: 2,
      title: 'Recyclable Materials Guide',
      description: 'Identify what can and cannot be recycled',
      duration: '20 min',
      level: 'Intermediate',
      coins: 25,
      completed: false,
      content: [
        'Types of recyclable plastics',
        'Paper and cardboard recycling',
        'Metal recycling guidelines',
        'Glass disposal best practices'
      ]
    },
    {
      id: 3,
      title: 'E-Waste Management',
      description: 'Safe disposal of electronic devices',
      duration: '12 min',
      level: 'Advanced',
      coins: 30,
      completed: false,
      content: [
        'What constitutes e-waste',
        'Data security before disposal',
        'Certified e-waste collection centers',
        'Environmental hazards of improper disposal'
      ]
    },
    {
      id: 4,
      title: 'Composting at Home',
      description: 'Turn organic waste into valuable compost',
      duration: '18 min',
      level: 'Intermediate',
      coins: 25,
      completed: false,
      content: [
        'Setting up a home compost system',
        'What to compost and what to avoid',
        'Maintaining optimal conditions',
        'Using finished compost in gardening'
      ]
    }
  ];

  const quizQuestions = [
    {
      question: 'Which bin should plastic bottles go in?',
      options: ['Green Bin', 'Blue Bin', 'Yellow Bin', 'Red Bin'],
      correct: 1,
      explanation: 'Plastic bottles are recyclable and should go in the Blue Bin designated for recyclable materials.'
    },
    {
      question: 'What should you do before disposing of an electronic device?',
      options: ['Break it apart', 'Remove personal data', 'Paint it black', 'Nothing special'],
      correct: 1,
      explanation: 'Always remove or securely wipe personal data from electronic devices before disposal.'
    },
    {
      question: 'Which of these can be composted?',
      options: ['Plastic bags', 'Food scraps', 'Metal cans', 'Glass bottles'],
      correct: 1,
      explanation: 'Food scraps are organic waste that can be composted to create nutrient-rich soil.'
    }
  ];

  const languages = [
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'spanish', name: 'Español', flag: '🇪🇸' },
    { code: 'french', name: 'Français', flag: '🇫🇷' }
  ];

  const startModule = (module: any) => {
    setSelectedModule(module);
    setCurrentQuiz(null);
  };

  const startQuiz = () => {
    setCurrentQuiz({
      questions: quizQuestions,
      currentQuestion: 0,
      score: 0
    });
    setSelectedAnswer(null);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === currentQuiz.questions[currentQuiz.currentQuestion].correct;
    const newScore = isCorrect ? currentQuiz.score + 1 : currentQuiz.score;
    
    if (currentQuiz.currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuiz({
        ...currentQuiz,
        currentQuestion: currentQuiz.currentQuestion + 1,
        score: newScore
      });
      setSelectedAnswer(null);
    } else {
      // Quiz completed
      const coins = Math.round((newScore / currentQuiz.questions.length) * selectedModule.coins);
      updateGreenCoins(coins);
      addNotification(`Quiz completed! Earned ${coins} Green Coins`, 'success');
      setQuizScore(newScore);
    }
  };

  const restartTraining = () => {
    setSelectedModule(null);
    setCurrentQuiz(null);
    setQuizScore(0);
    setSelectedAnswer(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Training Center</h1>
          <p className="text-gray-600">Master waste management through interactive learning</p>
        </div>

        {/* Language Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Globe className="w-6 h-6 text-gray-600" />
            <h2 className="text-lg font-semibold">Choose Your Language</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                  language === lang.code
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>

        {!selectedModule ? (
          /* Module Selection */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingModules.map((module) => (
              <div
                key={module.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{module.title}</h3>
                      <p className="text-gray-600 mb-4">{module.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {module.level}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {module.duration}
                        </span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                          {module.coins} coins
                        </span>
                      </div>
                    </div>
                    {module.completed && (
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    )}
                  </div>

                  <div className="space-y-2 mb-6">
                    {module.content.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <ArrowRight className="w-4 h-4" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => startModule(module)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>{module.completed ? 'Review Module' : 'Start Learning'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : currentQuiz ? (
          /* Quiz Section */
          <div className="bg-white rounded-xl shadow-lg p-8">
            {quizScore > 0 || currentQuiz.currentQuestion >= currentQuiz.questions.length ? (
              /* Quiz Results */
              <div className="text-center">
                <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
                <p className="text-gray-600 mb-6">
                  You scored {quizScore} out of {currentQuiz.questions.length} questions correctly
                </p>
                
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-6 mb-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-orange-800 mb-2">Coins Earned</h3>
                    <div className="text-3xl font-bold text-orange-600">
                      +{Math.round((quizScore / currentQuiz.questions.length) * selectedModule.coins)}
                    </div>
                  </div>
                </div>

                <button
                  onClick={restartTraining}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-colors"
                >
                  Back to Training
                </button>
              </div>
            ) : (
              /* Current Question */
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Quiz Time!</h2>
                  <span className="text-sm text-gray-500">
                    Question {currentQuiz.currentQuestion + 1} of {currentQuiz.questions.length}
                  </span>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {currentQuiz.questions[currentQuiz.currentQuestion].question}
                  </h3>
                  
                  <div className="space-y-3">
                    {currentQuiz.questions[currentQuiz.currentQuestion].options.map((option: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedAnswer(index)}
                        className={`w-full text-left p-4 rounded-lg border transition-colors ${
                          selectedAnswer === index
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={submitAnswer}
                  disabled={selectedAnswer === null}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Answer
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Module Content */
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{selectedModule.title}</h2>
              <button
                onClick={restartTraining}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Back
              </button>
            </div>

            <div className="prose max-w-none mb-8">
              <p className="text-gray-600 text-lg mb-6">{selectedModule.description}</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">What you'll learn:</h3>
                <ul className="space-y-2">
                  {selectedModule.content.map((item: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Simulated content */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Introduction</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Proper waste management is crucial for environmental sustainability. This module will guide you through 
                    the essential principles and practical applications of waste segregation, helping you make informed 
                    decisions about disposal methods.
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Volume2 className="w-5 h-5 text-yellow-600 mt-1" />
                    <div>
                      <h5 className="font-medium text-yellow-800">Audio Support Available</h5>
                      <p className="text-yellow-700 text-sm">Listen to this content in your preferred language</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Duration: {selectedModule.duration} • Reward: {selectedModule.coins} coins
              </div>
              <button
                onClick={startQuiz}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-colors flex items-center space-x-2"
              >
                <span>Take Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingModule;