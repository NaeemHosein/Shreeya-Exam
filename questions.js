// Questions dataset for Shreeya's Lovability & Prettiness Accreditation Exam
// Personal, loving, natural nickname Shree, Naio, no other girls mentioned, no em dashes
window.EXAM_QUESTIONS = [
  {
    id: 1,
    section: "SECTION I: COSMIC BEAUTY STANDARDS",
    code: "ITEM 1.01",
    type: "binary-choice",
    question: "Is Shreeya the prettiest, most stunning, ethereal person in the entire universe?",
    subtitle: "Select your answer below. Answer honestly, Shree.",
    yesText: "YES, 1,000,000% 🥰",
    noText: "No ❌",
    correct: "yes",
    autocorrectMsg: "❌ ERROR: System detected a false statement! 'No' is physically impossible for Shreeya. Autocorrecting to YES! ✨",
    feedback: "CORRECT! The laws of physics confirm: Shreeya is unrivaled in prettiness. ✨"
  },
  {
    id: 2,
    section: "SECTION I: COSMIC BEAUTY STANDARDS",
    code: "ITEM 1.02",
    type: "multi-choice",
    question: "When Shree smiles with her eyes and that cute little grin, what is the documented hazard level to Naio?",
    subtitle: "Select the most accurate medical classification:",
    options: [
      { text: "A) Mild hazard: Just a normal everyday smile", icon: "😐", correct: false, reason: "FALSE! There is nothing ordinary about Shree's smile." },
      { text: "B) Instant cardiac arrest from cuteness overload", icon: "💓", correct: true, remark: "Accurate! Pulse rate spikes to 180 bpm immediately." },
      { text: "C) Irreversible addiction to making her smile again", icon: "✨", correct: true, remark: "Scientifically proven fact. Naio is hooked for life." },
      { text: "D) All of the above, plus she owes Naio 50 sweet voice notes as compensation", icon: "💋", correct: true, remark: "The ultimate answer! Voice note tax will be collected immediately." }
    ],
    recommendedIndex: 3,
    autocorrectMsg: "❌ INCORRECT! 'Ordinary'?! Her smile is a category 5 cuteness hurricane. Autocorrecting to Option D! 💋",
    feedback: "EXCELLENT ANALYSIS! Every single option is 100% verified by clinical Naio studies."
  },
  {
    id: 3,
    section: "SECTION II: MATHEMATICAL MEASUREMENTS",
    code: "ITEM 2.01",
    type: "magnetic-slider",
    question: "Calibrate your daily prettiness & glow quotient on the official aesthetic spectrum:",
    subtitle: "Drag the slider to your self-assessed prettiness level and release to lock it in:",
    min: 0,
    max: 100,
    initial: 50,
    unit: "% Gorgeous",
    autocorrectMsg: "⚠️ SYSTEM OVERRIDE: Self-doubt detected! Autocorrecting slider to 100% (Absolute Goddess)! ✨",
    feedback: "CALIBRATION COMPLETE: 100% Prettiness Quotient permanently locked in! 💖"
  },
  {
    id: 4,
    section: "SECTION II: MATHEMATICAL MEASUREMENTS",
    code: "ITEM 2.02",
    type: "bamboozle-tf",
    question: "Evaluate the truth value of the following undeniable scientific claim:",
    statement: "“Shreeya is the most gorgeous, breathtaking, and lovable person in the entire world.”",
    subtitle: "Tap TRUE or FALSE below:",
    correctChoice: "true",
    autocorrectMsg: "❌ INCORRECT! Shree is 100% the most gorgeous person in the world. Autocorrecting to TRUE! ✨",
    feedback: "CORRECT! Scientific fact verified: Shreeya's beauty is completely unmatched and ethereal."
  },
  {
    id: 5,
    section: "SECTION III: JURISPRUDENCE & RELATIONSHIP LAW",
    code: "ITEM 3.01",
    type: "dilemma-cards",
    question: "According to Article 1 of the official relationship rules, who is legally correct in every discussion or debate?",
    subtitle: "Click the party you believe possesses superior authority:",
    cards: [
      { id: "a", title: "Shreeya", tag: "Scenario A", desc: "When she is undeniably 100% right.", isRight: true },
      { id: "b", title: "Also Shreeya", tag: "Scenario B", desc: "When she is slightly confused, but still somehow right.", isRight: true },
      { id: "c", title: "Naio", tag: "Scenario C", desc: "Theoretical concept: Does not exist.", isRight: false }
    ],
    recommendedCardId: "a",
    autocorrectMsg: "❌ ACCESS DENIED! Naio is constitutionally barred from winning debates against Shree. Autocorrecting to Shreeya! 👑",
    feedback: "LEGAL VERDICT CONFIRMED: Shreeya retains perpetual diplomatic immunity and is always right."
  },
  {
    id: 6,
    section: "SECTION IV: BIOMETRIC IDENTITY VERIFICATION",
    code: "ITEM 4.01",
    type: "captcha-grid",
    question: "Security Check: Select all items that belong indisputably to Shree:",
    subtitle: "Check all the assets that apply, then click 'Verify Cuteness':",
    items: [
      { id: 1, label: "Naio's whole heart and devotion forever", emoji: "💖" },
      { id: 2, label: "The superpower of making his heart race with a single selfie", emoji: "📸" },
      { id: 3, label: "The sweetest, most soothing voice in the universe", emoji: "🌸" },
      { id: 4, label: "Unlimited compliments and sweet texts on demand", emoji: "💌" },
      { id: 5, label: "The undisputed title of Prettiest Girl Alive", emoji: "👑" },
      { id: 6, label: "All of Naio's sweetest thoughts from morning to night", emoji: "🧸" }
    ],
    autocorrectMsg: "⚠️ INCOMPLETE CLAIM: You forgot to claim some of your assets! Autocorrecting by selecting all items... ✨",
    feedback: "VERIFICATION SUCCESSFUL! All assets officially deeded and registered under Shreeya's name."
  },
  {
    id: 7,
    section: "SECTION V: SHORT ANSWER ESSAY",
    code: "ITEM 5.01",
    type: "autocorrect-input",
    question: "Type in what you think when sending a quick selfie or snap to Naio:",
    subtitle: "Type your honest thoughts into the box and click 'Submit Evaluation':",
    targetText: "Literally ethereal, angelically gorgeous, and the sweetest cutie pie on earth ✨",
    placeholder: "Type your thoughts here...",
    autocorrectMsg: "✨ Naio-Vision Filter Activated: Self-criticism replaced with objective reality!",
    feedback: "EVALUATION SUBMITTED: Naio-Vision has accurately recorded the objective reality."
  },
  {
    id: 8,
    section: "SECTION VI: PROBABILITY & QUANTUM MECHANICS",
    code: "ITEM 6.01",
    type: "shrink-grow",
    question: "Do you admit that Naio is the luckiest guy in the entire universe to have you?",
    subtitle: "Select your verdict:",
    yesText: "YES, he won the lottery! 🍀",
    noText: "No he didn't 🙄",
    correct: "yes",
    autocorrectMsg: "❌ OBJECTION OVERRULED: You clicked 'No', but quantum sensors say YES! Autocorrecting to YES! 🍀",
    feedback: "EXPANSION COMPLETE: The universe collapsed all possibilities into YES!"
  },
  {
    id: 9,
    section: "SECTION VII: DIGITAL COMMUNICATION PROTOCOL",
    code: "ITEM 7.01",
    type: "multi-choice",
    question: "When Shree sends a photo of herself looking casually breathtaking, what is the mandatory response from Naio?",
    subtitle: "Select the most accurate behavioral protocol:",
    options: [
      { text: "A) Just send a thumbs-up emoji and move on", icon: "👍", correct: false, reason: "CRIMINAL OFFENSE! She deserves an entire paragraph of adoration." },
      { text: "B) Stare at the screen in pure awe for at least 10 minutes", icon: "✨", correct: true, remark: "Standard biological reaction to Shreeya's beauty." },
      { text: "C) Save the photo and smile at his phone like an idiot", icon: "📱", correct: true, remark: "Accurate! He now has a permanent grin on his face." },
      { text: "D) Both B and C, plus tell her she is the prettiest girl on earth", icon: "💖", correct: true, remark: "Full romantic protocol executed with 100% dedication." }
    ],
    recommendedIndex: 3,
    autocorrectMsg: "❌ INCORRECT! A thumbs up?! She deserves endless love and devotion. Autocorrecting to Option D! 💖",
    feedback: "ASSESSMENT PASSED: Every photo from Shree is classified as an absolute masterpiece."
  },
  {
    id: 10,
    section: "SECTION VIII: HIDDEN VARIABLE DECRYPTION",
    code: "ITEM 8.01",
    type: "scratch-card",
    question: "Confidential Evaluation File: Scratch the baby pink foil to reveal the hidden truth:",
    subtitle: "Use your finger or mouse to scratch off the foil surface:",
    secretMessage: "You are the love of my life, Shree. You make every single day brighter just by being you! 💕",
    secretGrade: "EXAM RESULT: 100/100 IN PERFECTION",
    feedback: "SECRET DECRYPTED: 100/100 Gorgeousness and infinite love confirmed! 💕"
  },
  {
    id: 11,
    section: "SECTION IX: HIGH VOLTAGE ADORABILITY",
    code: "ITEM 9.01",
    type: "energy-capacitor",
    question: "Emergency Alert: The Shreeya Cuteness Capacitor requires manual kinetic charging!",
    subtitle: "Tap the heart button repeatedly to charge the lovability reactor to 100%:",
    targetClicks: 8,
    feedback: "OVERCHARGE DETECTED! Lovability levels have exceeded standard planetary safety limits! 🚀💥"
  },
  {
    id: 12,
    section: "SECTION X: COMPLIMENT ACCEPTANCE THEOREM",
    code: "ITEM 10.01",
    type: "multi-choice",
    question: "When Shree says 'I don't look good today' or downplays how pretty she is, what is the objective truth?",
    subtitle: "Advanced female linguistic decryption required:",
    options: [
      { text: "A) She is right and is only ordinary", icon: "🤖", correct: false, reason: "DANGEROUS MISTAKE: Factually impossible statement!" },
      { text: "B) She has temporary cuteness blindness and needs Naio to remind her", icon: "🎯", correct: true, remark: "Naio reminder alarm triggered immediately." },
      { text: "C) She is literally incapable of looking anything less than an angel", icon: "👼", correct: true, remark: "Scientific law of physics verified worldwide." },
      { text: "D) Both B and C because she is breathtaking every single second", icon: "👑", correct: true, remark: "The undisputed truth of the cosmos." }
    ],
    recommendedIndex: 3,
    autocorrectMsg: "❌ INCORRECT! Ordinary?! Cuteness blindness detected! Autocorrecting to Option D! ✨",
    feedback: "DIPLOMATIC SUCCESS: Shreeya's beauty is constant and eternal at all hours."
  },
  {
    id: 13,
    section: "SECTION XI: VALUE HIERARCHY",
    code: "ITEM 11.01",
    type: "drag-rank",
    question: "Rank Shreeya's attributes from Best to Most Perfect:",
    subtitle: "Tap the traits below to assign their rank, or tap 'Lock In All Rankings':",
    items: [
      { id: "eyes", text: "Her gorgeous, sparkling eyes", icon: "👀" },
      { id: "laugh", text: "Her adorable, contagious laugh", icon: "🤭" },
      { id: "voice", text: "Her sweet, comforting voice", icon: "🎶" },
      { id: "pout", text: "Her cute little pout when she is dramatic", icon: "🥺" },
      { id: "heart", text: "Her pure, beautiful, golden soul", icon: "💖" }
    ],
    feedback: "SYSTEM OVERRIDE: Every single quality of Shreeya is tied for #1 WORLD CHAMPION! 🏆"
  },
  {
    id: 14,
    section: "SECTION XII: RAPID REFLEX ACCREDITATION",
    code: "ITEM 12.01",
    type: "speed-verdict",
    question: "Quick reflex test: Is it physically possible for Shreeya to look bad, even for 1 single second?",
    subtitle: "Select your verdict:",
    optRight: "NO WAY, IMPOSSIBLE! 🙅‍♀️",
    optWrong: "Yes, maybe on a bad day 🥺",
    autocorrectMsg: "❌ INCORRECT! Optical satellites and Naio's eyes confirm 0 bad angles on record. Autocorrecting to NO WAY, IMPOSSIBLE! ✨",
    feedback: "SPLENDID REFLEXES! Camera footage and Naio's eyes confirm: 0 bad angles on record."
  },
  {
    id: 15,
    section: "FINAL COMMENCEMENT: THE PERPETUAL ACCREDITATION",
    code: "ITEM 15.00",
    type: "final-vow",
    question: "Do you, Shreeya, solemnly accept and acknowledge that you are the prettiest girl in the world, eternally loved, and cherished beyond measure?",
    subtitle: "This is a legally binding romantic decree. Choose your answer:",
    yesText: "💖 YES, I ACCEPT! (I am pretty & loved) 💖",
    noText: "No 😤",
    autocorrectMsg: "⚠️ ROMANTIC LAW VIOLATION: The answer 'No' has been intercepted and vetoed by Naio. Autocorrecting to 100% YES! 💕",
    feedback: "OATH FORMALLY RATIFIED! Welcome to the Hall of Supreme Lovability! 🎉"
  }
];
