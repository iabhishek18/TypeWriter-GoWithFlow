"use client"


import React from "react"


import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Inter, Roboto_Mono, JetBrains_Mono, Fira_Code, Press_Start_2P, Orbitron, Exo_2 } from "next/font/google"
// import confetti from "canvas-confetti"


// UI Fonts
const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-press-start" })
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" })
const exo2 = Exo_2({ subsets: ["latin"], variable: "--font-exo2" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })


// Typing Fonts
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" })
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" })


// Replace the font options array with font size options
const fontOptions = [
  {
    name: "Small",
    value: "text-sm",
    symbol: "A",
    symbolClass: "text-sm",
    variable: "--font-size-small",
  },
  {
    name: "Medium",
    value: "text-base",
    symbol: "A",
    symbolClass: "text-base",
    variable: "--font-size-medium",
  },
  {
    name: "Large",
    value: "text-lg",
    symbol: "A",
    symbolClass: "text-xl",
    variable: "--font-size-large",
  },
]



// Sample texts for typing tests by difficulty
const sampleTexts = {
  easy: [
    "the quick brown fox jumps over the lazy dog pack my box with five dozen liquor jugs how vexingly quick daft zebras jump",
    "all that glitters is not gold actions speak louder than words a journey of a thousand miles begins with a single step",
    "early bird catches the worm time and tide wait for no man better late than never practice makes perfect slow and steady",
    "look before you leap birds of a feather flock together two wrongs do not make a right the pen is mightier than the sword",
    "when in rome do as the romans do the early bird catches the worm a picture is worth a thousand words all good things",
  ],
  medium: [
    "programming is the art of telling another human what one wants the computer to do good code is its own best documentation",
    "the best way to predict the future is to invent it computer science is no more about computers than astronomy is about telescopes",
    "simplicity is prerequisite for reliability any fool can write code that a computer can understand good programmers write code",
    "the most disastrous thing that you can ever learn is your first programming language the function of good software is to make",
    "software is like entropy it is difficult to grasp weighs nothing and obeys the second law of thermodynamics it always increases",
  ],
  hard: [
    "the quick brown fox jumps over the lazy dog pack my box with five dozen liquor jugs how vexingly quick daft zebras jump amazingly few discotheques provide jukeboxes sphinx of black quartz judge my vow",
    "programming today is a race between software engineers striving to build bigger and better idiot proof programs and the universe trying to produce bigger and better idiots so far the universe is winning",
    "any sufficiently advanced technology is indistinguishable from magic we build our computer systems the way we build our cities over time without a plan on top of ruins they are not designed to last forever",
    "the trouble with programmers is that you can never tell what a programmer is doing until it is too late the computer programmer is a creator of universes for which he alone is the lawgiver no playwright",
    "the most important property of a program is whether it accomplishes the intention of its user the difference between theory and practice is that in theory there is no difference between theory and practice",
  ],
}


// Famous programming quotes
const quotes = [
  "First, solve the problem. Then, write the code. - John Johnson",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
  "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
  "Programming isn't about what you know; it's about what you can figure out. - Chris Pine",
  "The only way to learn a new programming language is by writing programs in it. - Dennis Ritchie",
  "The best error message is the one that never shows up. - Thomas Fuchs",
  "Don't worry if it doesn't work right. If everything did, you'd be out of a job. - Mosher's Law of Software Engineering",
  "The most disastrous thing that you can ever learn is your first programming language. - Alan Kay",
  "Simplicity is the soul of efficiency. - Austin Freeman",
  "Before software can be reusable it first has to be usable. - Ralph Johnson",
]


// Difficulty settings
const difficultySettings = {
  easy: {
    name: "Easy",
    color: "!text-emerald-400",
    bgColor: "!bg-emerald-400/20",
    borderColor: "!border-emerald-400/30",
    minWpm: 20,
    minAccuracy: 80,
  },
  medium: {
    name: "Medium",
    color: "!text-blue-400",
    bgColor: "!bg-blue-400/20",
    borderColor: "!border-blue-400/30",
    minWpm: 40,
    minAccuracy: 85,
  },
  hard: {
    name: "Hard",
    color: "text-rose-400",
    bgColor: "bg-rose-400/20",
    borderColor: "border-rose-400/30",
    minWpm: 60,
    minAccuracy: 90,
  },
}


// Theme settings
const themeSettings = {
  purple: {
    name: "Purple",
    icon: "🎨",
    bgGradient: "radial-gradient(circle, hsl(260, 70%, 15%) 0%, hsl(260, 70%, 5%) 100%)",
    primary: "from-violet-400 to-pink-500",
    titleGradient: "from-violet-300 via-fuchsia-400 to-pink-400",
    accent: "violet",
    border: "border-violet-500/20",
    shadow: "shadow-[0_0_15px_rgba(139,92,246,0.15)]",
    highlight: "bg-violet-700/50",
    buttonBg: "bg-violet-600",
    buttonHover: "hover:bg-violet-700",
    caretColor: "bg-violet-500",
    dotColor: "bg-violet-500",
    successGradient: "from-violet-400 to-fuchsia-500",
    failGradient: "from-rose-500 to-pink-600",
  },
  blue: {
    name: "Blue",
    icon: "🎨",
    bgGradient: "radial-gradient(circle, hsl(210, 70%, 15%) 0%, hsl(210, 70%, 5%) 100%)",
    primary: "from-blue-400 to-cyan-500",
    titleGradient: "from-blue-300 via-sky-400 to-cyan-400",
    accent: "blue",
    border: "border-blue-500/20",
    shadow: "shadow-[0_0_15px_rgba(59,130,246,0.15)]",
    highlight: "bg-blue-700/50",
    buttonBg: "bg-blue-600",
    buttonHover: "hover:bg-blue-700",
    caretColor: "bg-blue-500",
    dotColor: "bg-blue-500",
    successGradient: "from-blue-400 to-cyan-500",
    failGradient: "from-rose-500 to-pink-600",
  },
  green: {
    name: "Green",
    icon: "🎨",
    bgGradient: "radial-gradient(circle, hsl(160, 70%, 15%) 0%, hsl(160, 70%, 5%) 100%)",
    primary: "from-emerald-400 to-teal-500",
    titleGradient: "from-emerald-300 via-teal-400 to-cyan-400",
    accent: "emerald",
    border: "border-emerald-500/20",
    shadow: "shadow-[0_0_15px_rgba(16,185,129,0.15)]",
    highlight: "bg-emerald-700/50",
    buttonBg: "bg-emerald-600",
    buttonHover: "hover:bg-emerald-700",
    caretColor: "bg-emerald-500",
    dotColor: "bg-emerald-500",
    successGradient: "from-emerald-400 to-teal-500",
    failGradient: "from-rose-500 to-pink-600",
  },
  dark: {
    name: "Dark",
    icon: "🎨",
    bgGradient: "radial-gradient(circle, hsl(220, 20%, 12%) 0%, hsl(220, 20%, 4%) 100%)",
    primary: "from-neutral-400 to-neutral-600",
    titleGradient: "from-neutral-300 via-neutral-400 to-neutral-500",
    accent: "neutral",
    border: "border-neutral-500/20",
    shadow: "shadow-[0_0_15px_rgba(115,115,115,0.15)]",
    highlight: "bg-neutral-700/50",
    buttonBg: "bg-neutral-600",
    buttonHover: "hover:bg-neutral-700",
    caretColor: "bg-neutral-500",
    dotColor: "bg-neutral-500",
    successGradient: "from-neutral-400 to-neutral-600",
    failGradient: "from-rose-500 to-pink-600",
  },
  monkeytype: {
    name: "Monkey",
    icon: "🎨",
    bgGradient: "radial-gradient(circle, hsl(220, 13%, 18%) 0%, hsl(220, 13%, 10%) 100%)",
    primary: "from-yellow-500 to-yellow-600",
    titleGradient: "from-yellow-300 via-amber-400 to-yellow-500",
    accent: "yellow",
    border: "border-yellow-500/20",
    shadow: "shadow-[0_0_15px_rgba(234,179,8,0.15)]",
    highlight: "bg-yellow-700/30",
    buttonBg: "bg-yellow-500",
    buttonHover: "hover:bg-yellow-600",
    caretColor: "bg-yellow-500",
    dotColor: "bg-yellow-500",
    successGradient: "from-yellow-400 to-amber-500",
    failGradient: "from-rose-500 to-pink-600",
  },
}


// Test modes
const testModes = {
  time: { name: "Time", icon: "⏱️", description: "Type as many words as you can in the given time" },
  words: { name: "Words", icon: "📝", description: "Type the given number of words as fast as you can" },
  quote: { name: "Quote", icon: "💬", description: "Type a random programming quote" },
}


// Test durations/lengths
const testLengths = {
  time: [15, 30, 60, 120],
  words: [10, 25, 50, 100],
}


// Performance feedback messages
const performanceFeedback = {
  excellent: [
    "Outstanding performance! Your fingers are on fire! 🔥",
    "Incredible typing speed! You're a keyboard virtuoso! 🎹",
    "Phenomenal accuracy and speed! You're in the typing elite! 🏆",
    "Wow! That was impressive! Your typing skills are top-notch! ⚡",
    "Amazing work! You're a typing wizard! ✨",
  ],
  good: [
    "Great job! Your typing skills are impressive! 👏",
    "Well done! You're becoming a typing master! 🌟",
    "Solid performance! Keep up the good work! 👍",
    "Nice typing! You're making excellent progress! 📈",
    "Good work! Your practice is paying off! 💪",
  ],
  average: [
    "Good effort! Keep practicing to improve your speed! 🚀",
    "Not bad! Regular practice will help you get faster! ⌨️",
    "You're on the right track! Keep going! 🏃",
    "Decent job! With more practice, you'll see improvement! 📝",
    "You're making progress! Keep at it! 🌱",
  ],
  needsWork: [
    "Keep practicing! Your speed will improve with time! 🕒",
    "Don't give up! Consistent practice leads to improvement! 💯",
    "Focus on accuracy first, then speed will follow! 🎯",
    "Everyone starts somewhere! Keep practicing! 🌈",
    "Practice makes perfect! You'll get there! 🌟",
  ],
}


type Difficulty = "easy" | "medium" | "hard"
type Theme = "purple" | "blue" | "green" | "dark" | "monkeytype"
type TestMode = "time" | "words" | "quote"
type PerformanceLevel = "excellent" | "good" | "average" | "needsWork"


// Background particle component
const Particles = ({ count = 50, theme }: { count?: number; theme: Theme }) => {
  const [isClient, setIsClient] = useState(false)


  useEffect(() => {
    setIsClient(true)
  }, [])


  const particles = useMemo(() => {
    if (!isClient) return []


    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5, // Smaller particles
      speed: Math.random() * 0.5 + 0.1,
    }))
  }, [count, isClient])


  // Determine particle color based on theme
  const getParticleColor = () => {
    switch (theme) {
      case "purple":
        return "bg-violet-500/20"
      case "blue":
        return "bg-blue-500/20"
      case "green":
        return "bg-emerald-500/20"
      case "dark":
        return "bg-neutral-500/20"
      case "monkeytype":
        return "bg-yellow-500/20"
      default:
        return "bg-violet-500/20"
    }
  }


  if (!isClient) return null


  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full ${getParticleColor()} animate-float`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${10 / particle.speed}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  )
}


export default function Home() {
  // States to track UI state and input value
  const [isStarted, setIsStarted] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [showInput, setShowInput] = useState(false)


  // Refs
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)


  // State
  const [text, setText] = useState("")
  const [input, setInput] = useState("")
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [errors, setErrors] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [difficulty, setDifficulty] = useState<Difficulty>("medium")
  // Update the state variable name to reflect its new purpose
  const [selectedFontSize, setSelectedFontSize] = useState(fontOptions[1])
  const [currentTheme, setCurrentTheme] = useState<Theme>("monkeytype")
  const [testMode, setTestMode] = useState<TestMode>("time")
  const [testLength, setTestLength] = useState<number>(30) // Default 30 seconds or 25 words
  const [timeLeft, setTimeLeft] = useState<number>(30)
  const [wordsLeft, setWordsLeft] = useState<number>(25)
  const [caretPosition, setCaretPosition] = useState({ top: 0, left: 0 })
  const [show_Caret, setShow_Caret] = useState(true)
  const [streak, setStreak] = useState(0) // Typing streak for animations
  const [isMobile, setIsMobile] = useState(false) // For responsive design
  const [isSmallScreen, setIsSmallScreen] = useState(false) // For very small screens
  const [wordHistory, setWordHistory] = useState<string[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [rawKeystrokes, setRawKeystrokes] = useState(0)
  const [incorrectKeystrokes, setIncorrectKeystrokes] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [testResults, setTestResults] = useState({
    wpm: 0,
    accuracy: 0,
    correctChars: 0,
    incorrectChars: 0,
    duration: 0,
    rawWpm: 0,
    correctWords: 0,
    totalWords: 0,
    passed: false,
    performanceLevel: "average" as PerformanceLevel,
    feedbackMessage: "",
  })
  const [viewportHeight, setViewportHeight] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [buttonState, setButtonState] = useState<"start" | "startTyping" | "reset">("start")


  // Handle the start button click
  const handleStart = () => {
    setIsStarted(true)


    // Focus the input after a short delay to allow for animation
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 300)
  }


  // Handle the reset button click
  const handleReset = () => {
    setInputValue("")
    setHasInteracted(false)


    // Focus the input after reset
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }


  // Handle input changes
  const handleInputChangeBasic = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (!hasInteracted) {
      setHasInteracted(true)
    }
  }


  // Handle input focus
  const handleInputFocusBasic = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
    }
  }


  // Handle the start button click
  const handleButtonClick = () => {
    if (buttonState === "start") {
      // Change to "Start Typing" state and show input
      setButtonState("startTyping")
      setShowInput(true)


      // Focus the input after a short delay to allow for animation
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 300)
    } else if (buttonState === "startTyping" || buttonState === "reset") {
      // Reset functionality
      setInputValue("")
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }


  // Handle input changes
  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    // Change to "Reset" state when user starts typing
    if (buttonState === "startTyping") {
      setButtonState("reset")
    }
  }


  // Handle input focus
  const handleInputFocus2 = () => {
    // Change to "Reset" state when user focuses on input
    if (buttonState === "startTyping") {
      setButtonState("reset")
    }
  }


  // Get button text based on state
  const getButtonText = () => {
    switch (buttonState) {
      case "start":
        return "Type to Start"
      case "startTyping":
        return "Start Typing"
      case "reset":
        return "Reset"
    }
  }


  // Get button color based on state
  const getButtonColor = () => {
    switch (buttonState) {
      case "start":
        return "bg-blue-600 hover:bg-blue-700"
      case "startTyping":
        return "bg-green-600 hover:bg-green-700"
      case "reset":
        return "bg-amber-600 hover:bg-amber-700"
    }
  }


  // Check if device is mobile and update viewport height
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsSmallScreen(window.innerWidth < 480)
      setViewportHeight(window.innerHeight)
    }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])


  // Initialize with a random text based on test mode and difficulty
  useEffect(() => {
    resetTest()
  }, [difficulty, testMode, testLength])


  // Timer effect for time mode
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null


    if (isActive && startTime && !endTime) {
      if (testMode === "time") {
        interval = setInterval(() => {
          const now = Date.now()
          const elapsed = Math.floor((now - startTime) / 1000)
          setTimeElapsed(elapsed)
          const remaining = testLength - elapsed
          setTimeLeft(remaining >= 0 ? remaining : 0)


          // Calculate current WPM
          const minutes = elapsed / 60
          const words = currentIndex / 5 // Approximate words by characters / 5
          if (minutes > 0) {
            setWpm(Math.round(words / minutes))
          }


          // End test if time is up
          if (remaining <= 0) {
            finishTest()
          }
        }, 200)
      } else {
        // For words and quote modes
        interval = setInterval(() => {
          const now = Date.now()
          setTimeElapsed(Math.floor((now - startTime) / 1000))


          // Calculate current WPM
          const minutes = (now - startTime) / 60000
          const words = currentIndex / 5 // Approximate words by characters / 5
          if (minutes > 0) {
            setWpm(Math.round(words / minutes))
          }
        }, 200)
      }
    }


    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, startTime, endTime, currentIndex, testMode, testLength])


  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab + Enter to restart test
      if (e.key === "Enter" && e.getModifierState("Tab")) {
        e.preventDefault()
        resetTest()
      }


      // Ctrl+Shift+P to change theme
      if (e.key === "p" && e.ctrlKey && e.shiftKey) {
        e.preventDefault()
        changeTheme()
      }


      // Escape to close popup
      if (e.key === "Escape" && showPopup) {
        e.preventDefault()
        setShowPopup(false)
      }
    }


    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [showPopup])


  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node) && showPopup) {
        setShowPopup(false)
      }
    }


    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showPopup])


  // Focus input on container click
  const focusInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])


  // Generate text based on test mode
  const generateText = useCallback(() => {
    let newText = ""


    if (testMode === "quote") {
      // Random quote
      newText = quotes[Math.floor(Math.random() * quotes.length)]
    } else if (testMode === "words") {
      // Generate text with specific number of words
      const texts = sampleTexts[difficulty]
      const randomText = texts[Math.floor(Math.random() * texts.length)]
      const words = randomText.split(" ")


      // Ensure we have enough words, repeat if necessary
      let allWords: string[] = []
      while (allWords.length < testLength) {
        allWords = [...allWords, ...words]
      }


      newText = allWords.slice(0, testLength).join(" ")
      setWordsLeft(testLength)
    } else {
      // Time mode - use regular text
      const texts = sampleTexts[difficulty]
      newText = texts[Math.floor(Math.random() * texts.length)]
    }


    setText(newText)


    // Process text into words for display
    const words = newText.split(" ")
    setWordHistory(words)
    setCurrentWordIndex(0)
  }, [difficulty, testMode, testLength])


  // Reset the test
  const resetTest = useCallback(() => {
    generateText()
    setInput("")
    setInputValue("")
    setStartTime(null)
    setEndTime(null)
    setCurrentIndex(0)
    setErrors(0)
    setIsFinished(false)
    setWpm(0)
    setAccuracy(100)
    setTimeElapsed(0)
    setTimeLeft(testMode === "time" ? testLength : 0)
    setIsActive(false)
    setStreak(0)
    setShow_Caret(true)
    setRawKeystrokes(0)
    setIncorrectKeystrokes(0)
    setShowResults(false)
    setShowPopup(false)
    setHasStarted(false) // Reset the hasStarted state
    setHasInteracted(false)
    setIsStarted(false)
    setShowInput(false)
    setButtonState("start")


    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [difficulty, testMode, testLength, generateText])


  // Determine performance level based on WPM and accuracy
  const getPerformanceLevel = (wpm: number, accuracy: number): PerformanceLevel => {
    const difficultyThresholds = difficultySettings[difficulty]


    if (wpm >= difficultyThresholds.minWpm * 1.5 && accuracy >= 95) {
      return "excellent"
    } else if (wpm >= difficultyThresholds.minWpm * 1.2 && accuracy >= 90) {
      return "good"
    } else if (wpm >= difficultyThresholds.minWpm && accuracy >= difficultyThresholds.minAccuracy) {
      return "average"
    } else {
      return "needsWork"
    }
  }


  // Get random feedback message based on performance level
  const getFeedbackMessage = (level: PerformanceLevel): string => {
    const messages = performanceFeedback[level]
    return messages[Math.floor(Math.random() * messages.length)]
  }


  // Finish the test and calculate results
  const finishTest = useCallback(() => {
    if (isActive) {
      const now = Date.now()
      setEndTime(now)
      setIsActive(false)
      setIsFinished(true)


      // Calculate final results
      const duration = startTime ? (now - startTime) / 1000 : 0
      const minutes = duration / 60
      const words = currentIndex / 5
      const finalWpm = minutes > 0 ? Math.round(words / minutes) : 0
      const correctChars = currentIndex - errors
      const rawWpm = minutes > 0 ? Math.round(rawKeystrokes / 5 / minutes) : 0


      // Calculate correctly typed words
      const typedText = input.trim()
      const typedWords = typedText.split(" ")
      const originalWords = text.split(" ")
      let correctWords = 0


      for (let i = 0; i < typedWords.length; i++) {
        if (i < originalWords.length && typedWords[i] === originalWords[i]) {
          correctWords++
        }
      }


      // Determine if the test was passed
      const difficultyThresholds = difficultySettings[difficulty]
      const passed = finalWpm >= difficultyThresholds.minWpm && accuracy >= difficultyThresholds.minAccuracy


      // Get performance level and feedback
      const performanceLevel = getPerformanceLevel(finalWpm, accuracy)
      const feedbackMessage = getFeedbackMessage(performanceLevel)


      setTestResults({
        wpm: finalWpm,
        accuracy,
        correctChars,
        incorrectChars: errors,
        duration,
        rawWpm,
        correctWords,
        totalWords: typedWords.length,
        passed,
        performanceLevel,
        feedbackMessage,
      })


      setShowResults(true)
      setShowPopup(true)


      // Trigger confetti for passing the test
      // if (passed && containerRef.current) {
      //   const rect = containerRef.current.getBoundingClientRect()
      //   const x = (rect.left + rect.right) / 2 / window.innerWidth
      //   const y = (rect.top + rect.bottom) / 2 / window.innerHeight


      //   // First burst
      //   confetti({
      //     particleCount: 150,
      //     spread: 90,
      //     origin: { x, y },
      //     colors: ["#c084fc", "#f472b6", "#34d399", "#60a5fa", "#fcd34d"],
      //   })


      //   // Second burst after a delay
      //   setTimeout(() => {
      //     confetti({
      //       particleCount: 80,
      //       angle: 60,
      //       spread: 70,
      //       origin: { x: x - 0.2, y },
      //       colors: ["#c084fc", "#f472b6", "#34d399", "#60a5fa", "#fcd34d"],
      //     })
      //     confetti({
      //       particleCount: 80,
      //       angle: 120,
      //       spread: 70,
      //       origin: { x: x + 0.2, y },
      //       colors: ["#c084fc", "#f472b6", "#34d399", "#60a5fa", "#fcd34d"],
      //     })
      //   }, 300)


      //   // Final burst
      //   setTimeout(() => {
      //     confetti({
      //       particleCount: 100,
      //       startVelocity: 30,
      //       spread: 360,
      //       origin: { x, y },
      //       gravity: 0.8,
      //       colors: ["#c084fc", "#f472b6", "#34d399", "#60a5fa", "#fcd34d"],
      //     })
      //   }, 600)
      // }
    }
  }, [isActive, startTime, currentIndex, errors, accuracy, input, text, difficulty])


  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value


      // Set hasStarted to true on first interaction
      if (!hasStarted && value.length > 0) {
        setHasStarted(true)
      }


      // Start the timer on first input
      if (!startTime && value.length === 1) {
        setStartTime(Date.now())
        setIsActive(true)
      }


      // Check if the input matches the text
      if (value.length <= text.length) {
        const prevLength = input.length
        setInput(value)
        setInputValue(value)


        // Count errors
        let errorCount = 0
        let currentStreak = streak


        // If we added a character (not deleted)
        if (value.length > prevLength) {
          setRawKeystrokes((prev) => prev + 1)


          const lastCharIndex = value.length - 1
          const isCorrect = value[lastCharIndex] === text[lastCharIndex]


          if (isCorrect) {
            currentStreak += 1
            // We're removing the mini-confetti for streaks to avoid distractions during typing
          } else {
            currentStreak = 0
            setIncorrectKeystrokes((prev) => prev + 1)
          }
          setStreak(currentStreak)


          // Update current word index for words mode
          if (testMode === "words" && value[lastCharIndex] === " ") {
            const wordCount = value.trim().split(" ").length
            setCurrentWordIndex(wordCount)
            setWordsLeft(testLength - wordCount)


            // Check if we've completed all words
            if (wordCount >= testLength) {
              finishTest()
            }
          }
        }


        for (let i = 0; i < value.length; i++) {
          if (value[i] !== text[i]) {
            errorCount++
          }
        }


        setErrors(errorCount)
        setCurrentIndex(value.length)


        // Calculate accuracy
        if (value.length > 0) {
          setAccuracy(Math.round(((value.length - errorCount) / value.length) * 100))
        } else {
          setAccuracy(100)
        }


        // Check if test is complete
        if (value.length === text.length) {
          finishTest()
        }
      }
    },
    [startTime, text, input, streak, testMode, testLength, finishTest, hasStarted],
  )


  // Change difficulty
  const changeDifficulty = useCallback((newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty)
  }, [])


  // Update the changeFont function to change font size
  const changeFont = useCallback((fontSizeOption: (typeof fontOptions)[0]) => {
    setSelectedFontSize(fontSizeOption)
  }, [])


  // Change theme
  const changeTheme = useCallback(() => {
    setCurrentTheme((prev) => {
      const themes: Theme[] = ["purple", "blue", "green", "dark", "monkeytype"]
      const currentIndex = themes.indexOf(prev)
      const nextIndex = (currentIndex + 1) % themes.length
      return themes[nextIndex]
    })
  }, [])


  // Change test mode
  const changeTestMode = useCallback((mode: TestMode) => {
    setTestMode(mode)


    // Set default test length based on mode
    if (mode === "time") {
      setTestLength(30)
      setTimeLeft(30)
    } else if (mode === "words") {
      setTestLength(25)
      setWordsLeft(25)
    }
  }, [])


  // Change test length
  const changeTestLength = useCallback(
    (length: number) => {
      setTestLength(length)
      if (testMode === "time") {
        setTimeLeft(length)
      } else if (testMode === "words") {
        setWordsLeft(length)
      }
    },
    [testMode],
  )


  // Render the text with highlighting for typed characters (monkeytype style)
  const renderWords = useMemo(() => {
    if (!text) return null


    const words = text.split(" ")
    let charIndex = 0


    return (
      <div className="flex flex-wrap gap-2">
        {words.map((word, wordIndex) => {
          const wordElement = (
            <div key={wordIndex} className="relative">
              {word.split("").map((char, i) => {
                const currentCharIndex = charIndex
                charIndex++


                let className = ""


                if (currentCharIndex < input.length) {
                  // Character has been typed
                  className =
                    input[currentCharIndex] === char
                      ? "text-neutral-200" // Correct
                      : "text-rose-500" // Incorrect
                } else if (currentCharIndex === input.length) {
                  // Current character to type
                  className = "text-neutral-400"


                  // Position caret
                  if (show_Caret && isActive) {
                    setTimeout(() => {
                      const charElement = document.getElementById(`char-${currentCharIndex}`)
                      if (charElement) {
                        const rect = charElement.getBoundingClientRect()
                        setCaretPosition({
                          top: rect.top,
                          left: rect.left,
                        })
                      }
                    }, 0)
                  }
                } else {
                  // Not yet typed
                  className = "text-neutral-600"
                }


                return (
                  <span key={i} id={`char-${currentCharIndex}`} className={className}>
                    {char}
                  </span>
                )
              })}
            </div>
          )


          // Add space after each word except the last one
          if (wordIndex < words.length - 1) {
            charIndex++ // Count the space
            return (
              <React.Fragment key={wordIndex}>
                {wordElement}
                <span
                  id={`char-${charIndex - 1}`}
                  className={
                    charIndex - 1 < input.length
                      ? input[charIndex - 1] === " "
                        ? "text-neutral-200" // Correct space
                        : "text-rose-500" // Incorrect space
                      : charIndex - 1 === input.length
                        ? "text-neutral-400" // Current space
                        : "text-neutral-600" // Future space
                  }
                >
                  {" "}
                </span>
              </React.Fragment>
            )
          }


          return wordElement
        })}
      </div>
    )
  }, [text, input, show_Caret, isActive])


  // All font variables combined
  const fontVariables = [
    pressStart2P.variable,
    orbitron.variable,
    exo2.variable,
    inter.variable,
    ...fontOptions.map((font) => font.variable),
  ].join(" ")


  // Progress percentage
  const progressPercentage = text.length > 0 ? (currentIndex / text.length) * 100 : 0


  // Common button styles
  const buttonBaseStyle = "transition-all duration-200 rounded-md border border-neutral-700/50"
  const iconButtonStyle = `${buttonBaseStyle} w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 text-neutral-300`
  const activeIconButtonStyle = `${buttonBaseStyle} w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-neutral-700 text-yellow-400 border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.2)]`
  const modeButtonStyle = `${buttonBaseStyle} px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm bg-neutral-800 hover:bg-neutral-700 text-neutral-400`
  const activeModeButtonStyle = `${buttonBaseStyle} px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm bg-neutral-700 text-yellow-400 border-yellow-500/30`
  const lengthButtonStyle = `${buttonBaseStyle} px-2 py-0.5 sm:px-3 sm:py-1 text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-400`
  const activeLengthButtonStyle = `${buttonBaseStyle} px-2 py-0.5 sm:px-3 sm:py-1 text-xs bg-neutral-700 text-yellow-400 border-yellow-500/30`
  const difficultyButtonStyle = `${buttonBaseStyle} px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm bg-neutral-800 hover:bg-neutral-700 text-neutral-300`


  // Common card styles
  const cardStyle = "bg-neutral-800/50 rounded-md border border-neutral-700 transition-transform hover:scale-[1.02]"
  const cardHeaderStyle = "text-neutral-400 text-xs uppercase tracking-wider"
  const cardValueStyle = "text-base sm:text-xl font-bold"


  // Calculate container height based on viewport
  const containerHeight = isMobile ? `max-h-[${viewportHeight - 20}px]` : "auto"


  // Add this useEffect near the other useEffect hooks
  useEffect(() => {
    if (isActive && show_Caret && input.length > 0) {
      const charElement = document.getElementById(`char-${input.length}`)
      if (charElement) {
        const rect = charElement.getBoundingClientRect()
        setCaretPosition({
          top: rect.top,
          left: rect.left,
        })
      }
    }
  }, [isActive, show_Caret, input.length])


  return (
    <div
      className={`min-h-screen overflow-hidden text-neutral-200 flex flex-col items-center justify-center p-2 sm:p-4 ${fontVariables}`}
    >
      {/* Dynamic Background */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 -z-20 transition-colors duration-1000"
        style={{
          background: themeSettings[currentTheme].bgGradient,
        }}
      />


      {/* Animated Particles */}
      <Particles count={isMobile ? 15 : 25} theme={currentTheme} />


      {/* Grid Lines */}
      <div className="fixed inset-0 -z-10 bg-grid-pattern opacity-10"></div>


      {/* Caret */}
      {show_Caret && isActive && !isFinished && (
        <div
          className={`fixed w-0.5 h-5 ${themeSettings[currentTheme].caretColor} animate-blink pointer-events-none z-50`}
          style={{
            top: `${caretPosition.top}px`,
            left: `${caretPosition.left}px`,
          }}
        />
      )}


      <div
        ref={containerRef}
        className={`w-full max-w-3xl flex flex-col items-center gap-3 sm:gap-4 p-3 sm:p-5 rounded-lg bg-neutral-800/50 backdrop-blur-sm border ${themeSettings[currentTheme].border} ${themeSettings[currentTheme].shadow} transition-all duration-300 animate-fadeIn overflow-y-auto`}
        style={{ maxHeight: `calc(100vh - 16px)` }}
        onClick={focusInput}
      >
        {/* Header */}
        <div className="w-full flex justify-between items-center">
          <h1
            className={`text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${themeSettings[currentTheme].titleGradient} animate-pulse-slow font-orbitron`}
          >
            GoWithFlow
          </h1>


          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                changeTheme()
              }}
              className={`${iconButtonStyle} group relative`}
              title={`Change Theme (Current: ${themeSettings[currentTheme].name})`}
            >
              <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform">🎨</span>
              <span
                className={`absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full ${themeSettings[currentTheme].dotColor}`}
              ></span>
            </button>
          </div>
        </div>


        {/* Top Controls Row - Combined Mode and Length */}
        <div className="w-full flex flex-col sm:flex-row justify-center gap-2">
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {(Object.keys(testModes) as TestMode[]).map((mode) => (
              <button
                key={mode}
                onClick={(e) => {
                  e.stopPropagation()
                  changeTestMode(mode)
                }}
                className={testMode === mode ? activeModeButtonStyle : modeButtonStyle}
              >
                <span className="mr-1">{testModes[mode].icon}</span>
                {mode}
              </button>
            ))}
          </div>


          {testMode !== "quote" && (
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
              {testLengths[testMode === "time" ? "time" : "words"].map((length) => (
                <button
                  key={length}
                  onClick={(e) => {
                    e.stopPropagation()
                    changeTestLength(length)
                  }}
                  className={testLength === length ? activeLengthButtonStyle : lengthButtonStyle}
                >
                  {length}
                  {testMode === "time" ? "s" : ""}
                </button>
              ))}
            </div>
          )}
        </div>


        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-neutral-700 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${themeSettings[currentTheme].primary} transition-all duration-300`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>


        {/* Middle Section - Stats and Text Display */}
        <div className="w-full flex flex-col gap-3">
          {/* Stats Bar */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 font-exo2">
            <div className={`flex flex-col items-center p-2 ${cardStyle}`}>
              <span className={cardHeaderStyle}>WPM</span>
              <span
                className={`${cardValueStyle} text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600`}
              >
                {wpm}
              </span>
            </div>
            <div className={`flex flex-col items-center p-2 ${cardStyle}`}>
              <span className={cardHeaderStyle}>Accuracy</span>
              <span
                className={`${cardValueStyle} ${
                  accuracy > 90 ? "text-emerald-400" : accuracy > 70 ? "text-amber-400" : "text-rose-400"
                }`}
              >
                {accuracy}%
              </span>
            </div>
            <div className={`flex flex-col items-center p-2 ${cardStyle}`}>
              <span className={cardHeaderStyle}>
                {testMode === "time" ? "Time" : testMode === "words" ? "Words" : "Time"}
              </span>
              <span className={`${cardValueStyle} text-neutral-200`}>
                {testMode === "time" ? timeLeft : testMode === "words" ? wordsLeft : timeElapsed}
                {testMode === "time" ? "s" : testMode === "words" ? "" : "s"}
              </span>
            </div>
            <div className={`flex flex-col items-center p-2 ${cardStyle}`}>
              <span className={cardHeaderStyle}>Streak</span>
              <span className={`${cardValueStyle} text-yellow-400`}>{streak}</span>
            </div>
          </div>


          {/* Text Display (monkeytype style) */}
          {/* Update the text display div to use the selected font size */}
          <div
            className={`w-full p-3 sm:p-4 rounded-md bg-neutral-800/80 backdrop-blur-sm ${selectedFontSize.value} leading-relaxed tracking-wide border border-neutral-700 shadow-[0_0_15px_rgba(0,0,0,0.2)] min-h-[100px] sm:min-h-[120px] flex items-center justify-center`}
            style={{ fontFamily: "var(--font-roboto-mono)" }}
          >
            {renderWords}
          </div>
        </div>


        {/* Bottom Controls */}
        <div className="w-full flex flex-col gap-3">
          {/* Font Selection */}
          {/* Update the font selection buttons to show different sized A's */}
          <div className="w-full flex justify-center gap-4 sm:gap-6">
            {fontOptions.map((fontOption) => (
              <button
                key={fontOption.name}
                onClick={() => changeFont(fontOption)}
                className={selectedFontSize.name === fontOption.name ? activeIconButtonStyle : iconButtonStyle}
                title={fontOption.name}
              >
                <span className={`font-roboto-mono ${fontOption.symbolClass}`}>{fontOption.symbol}</span>
              </button>
            ))}
          </div>


          {/* Difficulty Selection */}
          <div className="w-full flex justify-center gap-1.5 sm:gap-2">
            {(Object.keys(difficultySettings) as Difficulty[]).map((level) => (
              <button
                key={level}
                onClick={() => changeDifficulty(level)}
                className={
                  difficulty === level
                    ? `${difficultyButtonStyle} ${difficultySettings[level].bgColor} ${difficultySettings[level].color} shadow-[0_0_10px_rgba(139,92,246,0.2)] border ${difficultySettings[level].borderColor}`
                    : difficultyButtonStyle
                }
              >
                {difficultySettings[level].name}
              </button>
            ))}
          </div>


          {/* Action Buttons and Instructions */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation()
                resetTest()
              }}
              className={`px-5 py-2 ${themeSettings[currentTheme].buttonBg} ${themeSettings[currentTheme].buttonHover} text-neutral-900 font-bold rounded-md transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-orbitron text-sm sm:text-base`}
            >
              {isFinished ? "New Test" : hasStarted ? "Reset" : getButtonText()}
            </button>
          </div>
        </div>


        {/* Input Field (visually hidden but functional) */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          className="opacity-0 absolute"
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
        />
      </div>


      {/* Results Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div
            ref={popupRef}
            className={`w-full max-w-md mx-4 rounded-lg overflow-hidden shadow-2xl animate-scaleIn ${
              testResults.passed ? "border border-emerald-500/30" : "border border-rose-500/30"
            }`}
          >
            {/* Popup Header */}
            <div
              className={`p-4 ${
                testResults.passed
                  ? `bg-gradient-to-r ${themeSettings[currentTheme].successGradient}`
                  : `bg-gradient-to-r ${themeSettings[currentTheme].failGradient}`
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white font-orbitron">
                  {testResults.passed ? "Test Passed! 🎉" : "Test Failed 😕"}
                </h2>
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-white hover:text-neutral-200 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>


            {/* Popup Content */}
            <div className="bg-neutral-800 p-5">
              {/* Feedback Message */}
              <p className="text-center mb-4 text-lg font-exo2">{testResults.feedbackMessage}</p>


              {/* Results Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className={`${cardStyle} p-3`}>
                  <span className={cardHeaderStyle}>WPM</span>
                  <div className="flex items-baseline">
                    <span
                      className={`${cardValueStyle} text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600`}
                    >
                      {testResults.wpm}
                    </span>
                    <span className="text-neutral-400 text-xs ml-1">/ {difficultySettings[difficulty].minWpm} min</span>
                  </div>
                </div>


                <div className={`${cardStyle} p-3`}>
                  <span className={cardHeaderStyle}>Accuracy</span>
                  <div className="flex items-baseline">
                    <span
                      className={`${cardValueStyle} ${
                        testResults.accuracy > 90
                          ? "text-emerald-400"
                          : testResults.accuracy > 70
                            ? "text-amber-400"
                            : "text-rose-400"
                      }`}
                    >
                      {testResults.accuracy}%
                    </span>
                    <span className="text-neutral-400 text-xs ml-1">
                      / {difficultySettings[difficulty].minAccuracy}% min
                    </span>
                  </div>
                </div>


                <div className={`${cardStyle} p-3`}>
                  <span className={cardHeaderStyle}>Correct Words</span>
                  <div className="flex items-baseline">
                    <span className={`${cardValueStyle} text-emerald-400`}>{testResults.correctWords}</span>
                    <span className="text-neutral-400 text-xs ml-1">/ {testResults.totalWords} total</span>
                  </div>
                </div>


                <div className={`${cardStyle} p-3`}>
                  <span className={cardHeaderStyle}>Time</span>
                  <span className={`${cardValueStyle} text-neutral-200`}>{testResults.duration.toFixed(1)}s</span>
                </div>
              </div>


              {/* Additional Stats */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className={`${cardStyle} p-3`}>
                  <span className={cardHeaderStyle}>Raw WPM</span>
                  <span className={`${cardValueStyle} text-neutral-200`}>{testResults.rawWpm}</span>
                </div>


                <div className={`${cardStyle} p-3`}>
                  <span className={cardHeaderStyle}>Characters</span>
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-400 font-bold">{testResults.correctChars}</span>
                    <span className="text-neutral-400">/</span>
                    <span className="text-rose-400 font-bold">{testResults.incorrectChars}</span>
                  </div>
                </div>
              </div>


              {/* Action Buttons */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setShowPopup(false)
                    resetTest()
                  }}
                  className={`px-4 py-2 ${themeSettings[currentTheme].buttonBg} ${themeSettings[currentTheme].buttonHover} text-neutral-900 font-bold rounded-md transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-orbitron text-sm`}
                >
                  Try Again
                </button>


                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-neutral-200 font-bold rounded-md transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-orbitron text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* CSS for animations and font classes */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
       
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
       
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
       
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
       
        @keyframes slideUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
       
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
       
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
       
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-20px); }
          60% { transform: translateY(-10px); }
        }
       
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
       
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
       
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
       
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
       
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
       
        .animate-blink {
          animation: blink 1s ease-in-out infinite;
        }
       
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
       
        .animate-bounce {
          animation: bounce 1s ease-in-out;
        }
       
        .font-orbitron {
          font-family: var(--font-orbitron);
        }
       
        .font-press-start {
          font-family: var(--font-press-start);
        }
       
        .font-exo2 {
          font-family: var(--font-exo2);
        }
       
        .font-roboto-mono {
          font-family: var(--font-roboto-mono);
        }
       
        .font-jetbrains-mono {
          font-family: var(--font-jetbrains-mono);
        }
       
        .font-fira-code {
          font-family: var(--font-fira-code);
        }
       
        .bg-grid-pattern {
          background-image:
            linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
       
        /* Improve mobile experience */
        @media (max-width: 640px) {
          .bg-grid-pattern {
            background-size: 15px 15px;
          }
        }


        /* Prevent iOS Safari from zooming in on input focus */
        @media screen and (max-width: 768px) {
          input, select, textarea {
            font-size: 16px;
          }
        }


        /* Ensure the app fits in the viewport */
        html, body {
          height: 100%;
          overflow: hidden;
          position: fixed;
          width: 100%;
        }
      `}</style>
    </div>
  )
}




