import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const qaDatabase: { question: string; answer: string; keywords: string[] }[] = [
  {
    question: "What services does ZIONARCH offer?",
    answer: "ZIONARCH offers comprehensive architectural services including residential design, commercial projects, interior design, landscape architecture, renovation & restoration, and urban planning consultancy.",
    keywords: ["services", "offer", "provide", "do"]
  },
  {
    question: "How much does an architectural project cost?",
    answer: "Project costs vary based on scope, size, and complexity. Residential projects typically range from ₹50-150 per sq.ft for design fees. We provide detailed quotes after understanding your requirements in a free consultation.",
    keywords: ["cost", "price", "charge", "fee", "expensive", "budget", "money"]
  },
  {
    question: "How long does a typical project take?",
    answer: "Timeline depends on project complexity. A residential design takes 4-8 weeks, while construction can take 8-18 months. Commercial projects may take longer. We provide detailed timelines in our project proposal.",
    keywords: ["time", "long", "duration", "timeline", "days", "months", "weeks"]
  },
  {
    question: "Do you work on residential projects?",
    answer: "Yes! Residential projects are our specialty. We design homes, villas, apartments, and housing complexes with a focus on functionality, aesthetics, and sustainability.",
    keywords: ["residential", "home", "house", "villa", "apartment", "living"]
  },
  {
    question: "Do you handle commercial projects?",
    answer: "Absolutely! We have extensive experience in commercial architecture including offices, retail spaces, restaurants, hotels, and mixed-use developments.",
    keywords: ["commercial", "office", "shop", "retail", "business", "corporate"]
  },
  {
    question: "What is your design process?",
    answer: "Our process includes: 1) Initial consultation 2) Site analysis 3) Concept development 4) Design development 5) Documentation 6) Construction support. We keep you involved at every stage.",
    keywords: ["process", "steps", "how", "work", "approach", "method"]
  },
  {
    question: "Do you provide interior design services?",
    answer: "Yes, we offer complete interior design services including space planning, furniture selection, material specification, lighting design, and décor styling to complement our architectural work.",
    keywords: ["interior", "inside", "furniture", "decor", "decoration"]
  },
  {
    question: "Can you help with renovation projects?",
    answer: "Yes! We specialize in renovation and restoration projects. Whether it's modernizing an old structure or restoring heritage buildings, we bring new life while respecting the original character.",
    keywords: ["renovation", "remodel", "restore", "old", "existing", "modify"]
  },
  {
    question: "Do you offer sustainable/green design?",
    answer: "Sustainability is core to our practice. We incorporate passive design strategies, energy-efficient systems, sustainable materials, rainwater harvesting, and solar integration in our projects.",
    keywords: ["sustainable", "green", "eco", "environment", "energy", "solar"]
  },
  {
    question: "What locations do you serve?",
    answer: "We primarily serve clients across India, with projects in Chennai, Bangalore, Mumbai, Delhi, and other major cities. We also take on international projects for the right opportunities.",
    keywords: ["location", "where", "area", "city", "serve", "work"]
  },
  {
    question: "How do I start a project with you?",
    answer: "Starting is easy! Click the 'Get Quote' button or contact us via WhatsApp/email. We'll schedule a free consultation to understand your vision, site, and budget before providing a proposal.",
    keywords: ["start", "begin", "initiate", "first", "contact", "reach"]
  },
  {
    question: "Do you help with building permits?",
    answer: "Yes, we handle all documentation required for building permits and approvals. Our team is well-versed with local building codes and regulations to ensure smooth approval processes.",
    keywords: ["permit", "approval", "license", "legal", "regulation", "code"]
  },
  {
    question: "What is Vastu Shastra compliance?",
    answer: "We can incorporate Vastu Shastra principles in our designs if requested. We balance traditional Vastu guidelines with modern architectural requirements to create harmonious spaces.",
    keywords: ["vastu", "direction", "traditional", "indian"]
  },
  {
    question: "Do you provide 3D visualizations?",
    answer: "Yes! We provide detailed 3D renderings, virtual walkthroughs, and animations to help you visualize your project before construction begins. It's included in our design package.",
    keywords: ["3d", "render", "visualization", "visual", "image", "picture", "view"]
  },
  {
    question: "What is your payment structure?",
    answer: "We typically work with milestone-based payments: 20% on signing, 30% on design approval, 30% on documentation, and 20% on completion. We're flexible and can discuss terms.",
    keywords: ["payment", "pay", "installment", "advance", "deposit"]
  },
  {
    question: "Do you supervise construction?",
    answer: "Yes, we offer construction supervision services. Our architects conduct regular site visits to ensure the design is executed correctly and quality standards are maintained.",
    keywords: ["supervise", "construction", "build", "site", "visit", "monitor"]
  },
  {
    question: "Can I see your previous projects?",
    answer: "Absolutely! Visit our Portfolio section to see our completed projects. We have diverse work across residential, commercial, and institutional categories showcasing our design philosophy.",
    keywords: ["portfolio", "previous", "past", "example", "project", "work", "show"]
  },
  {
    question: "What makes ZIONARCH different?",
    answer: "Our unique approach combines innovative design with practical functionality. We prioritize client collaboration, sustainable practices, and attention to detail that transforms spaces into experiences.",
    keywords: ["different", "unique", "special", "why", "choose"]
  },
  {
    question: "Do you work with specific contractors?",
    answer: "We have a network of trusted contractors we can recommend, but we're happy to work with your preferred contractors. We ensure quality through our supervision services regardless.",
    keywords: ["contractor", "builder", "construct", "vendor"]
  },
  {
    question: "How can I contact ZIONARCH?",
    answer: "You can reach us via WhatsApp at +91 8838725310, email at vijay@propzing.com, or use the contact form on our website. We typically respond within 24 hours!",
    keywords: ["contact", "reach", "call", "phone", "email", "whatsapp", "touch"]
  }
];

const quickQuestions = [
  "What services do you offer?",
  "How much does it cost?",
  "How long does a project take?",
  "Do you offer interior design?",
  "How do I start a project?"
];

const findAnswer = (input: string): string => {
  const lowercaseInput = input.toLowerCase();
  
  // Find best matching Q&A based on keywords
  let bestMatch = qaDatabase[0];
  let highestScore = 0;
  
  for (const qa of qaDatabase) {
    let score = 0;
    for (const keyword of qa.keywords) {
      if (lowercaseInput.includes(keyword)) {
        score++;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = qa;
    }
  }
  
  if (highestScore > 0) {
    return bestMatch.answer;
  }
  
  // Default response
  return "Thank you for your question! For detailed information, please contact us via WhatsApp at +91 8838725310 or use the contact form. Our team will be happy to assist you!";
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 Welcome to ZIONARCH. I'm here to help answer your architecture questions. What would you like to know?",
      isBot: true
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: findAnswer(messageText),
        isBot: true
      };
      setMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: isOpen 
            ? "0 0 0 0 rgba(0,0,0,0)" 
            : ["0 0 0 0 rgba(220,38,38,0.4)", "0 0 0 20px rgba(220,38,38,0)"]
        }}
        transition={{ 
          boxShadow: { duration: 1.5, repeat: Infinity }
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-44 right-6 z-50 w-[350px] max-w-[calc(100vw-48px)] h-[500px] max-h-[70vh] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">ZIONARCH Assistant</h3>
                <p className="text-xs opacity-80">Always here to help</p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 ${message.isBot ? "justify-start" : "justify-end"}`}
                  >
                    {message.isBot && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        message.isBot
                          ? "bg-muted text-foreground rounded-tl-none"
                          : "bg-primary text-primary-foreground rounded-tr-none"
                      }`}
                    >
                      {message.text}
                    </div>
                    {!message.isBot && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Quick Questions */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 space-y-2"
                >
                  <p className="text-xs text-muted-foreground">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((q, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        onClick={() => handleSend(q)}
                        className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {q}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question..."
                  className="flex-1 rounded-full"
                />
                <Button
                  onClick={() => handleSend()}
                  size="icon"
                  className="rounded-full"
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
