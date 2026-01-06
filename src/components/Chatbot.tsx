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
    question: "What services does Zionarch Architects offer?",
    answer: "ZionArch Architects provides comprehensive design solutions including:\n• Architectural Design - Conceptual design through detailed documentation\n• Commercial & Institutional Projects - Office buildings, corporate headquarters, educational facilities\n• Residential Design - Apartments, villas, farmhouses, residential complexes\n• Design and Built Services - Full-service architectural solutions\n• Interior Design - Full-scale interior planning and execution\n• Hospitality Design - Hotels, resorts, restaurants\n• Healthcare Facilities - Hospitals and medical centers\n• Industrial Buildings - Manufacturing and industrial spaces\n• Religious Structures - Temples, churches, worship spaces\n• 3D Visualization & Rendering - Pre-construction visual presentations\n• Engineering & Building Services - MEP coordination, structural consultation\n\nWith 26+ years of experience, we create designs that yield positive energy and promote prosperous lifestyles.",
    keywords: ["services", "offer", "provide", "do", "what"]
  },
  {
    question: "Who is the principal architect at ZionArch?",
    answer: "A.K. Pandian is the Principal Architect with 26 years of extensive experience in architectural and interior projects. He has worked with renowned organizations including Chitale Architects Chennai, Chandavarkar & Thacker Bangalore, IGCAR - Department of Atomic Energy Kalpakkam, and HKS India Chennai. His expertise spans corporate headquarters, office buildings, commercial complexes, hotels, hospitals, industrial buildings, and residential projects.",
    keywords: ["principal", "architect", "pandian", "who", "founder", "owner", "team"]
  },
  {
    question: "When was ZionArch Architects established?",
    answer: "ZionArch Architects was established in 2010 and has been delivering quality architectural and interior design solutions for over a decade. We've built a strong reputation for innovative design and consistent project quality.",
    keywords: ["established", "founded", "when", "started", "history", "year"]
  },
  {
    question: "What makes ZionArch different from other architecture firms?",
    answer: "What sets ZionArch apart:\n• Holistic Design Philosophy - Creating designs that yield positive energy\n• Diverse Expertise - Team collaboration across multiple disciplines\n• Client-Centric Approach - Working closely to determine exactly which services you need\n• Consistent Quality - Superior project leadership and quality control\n• Smart Efficient Solutions - Recommending only services that make business sense\n• Proven Track Record - 26+ years of experience across all project types\n\nWe believe architecture involves not just layouts but creating spaces that enhance lifestyle and promote prosperity.",
    keywords: ["different", "unique", "special", "why", "choose", "better", "best"]
  },
  {
    question: "Can ZionArch design residential projects?",
    answer: "Absolutely! We have extensive experience in residential design including:\n• Individual Villas & Farmhouses - Traditional and contemporary styles\n• Residential Apartments - Multi-unit complexes with efficient space planning\n• Residential Complexes - Large-scale developments with amenities\n• Custom Residences - Tailored designs reflecting your lifestyle\n\nWe focus on creating homes that combine functionality, aesthetics, and positive energy. Our projects showcase traditional, contemporary, and fusion architectural styles.",
    keywords: ["residential", "home", "house", "villa", "apartment", "farmhouse", "living"]
  },
  {
    question: "Does ZionArch handle commercial and corporate projects?",
    answer: "Yes, we specialize in commercial design including:\n• Corporate Headquarters - Modern office spaces with professional aesthetics\n• Office Buildings - Contemporary workspaces optimized for productivity\n• Commercial Complexes - Mixed-use developments with retail and office spaces\n• Retail Spaces - Customer-centric commercial environments\n• Business Centers - Professional facilities for growing enterprises\n\nOur commercial projects emphasize efficiency, brand representation, and modern design standards.",
    keywords: ["commercial", "office", "corporate", "business", "retail", "shop", "headquarters"]
  },
  {
    question: "Can you design hotels and hospitality spaces?",
    answer: "Yes! Hospitality design is one of our core specializations:\n• Hotel & Resort Design - Complete hospitality facilities with guest comfort as priority\n• Restaurant & Cafe Spaces - Ambiance-focused dining environments\n• Banquet & Event Halls - Multi-functional spaces for celebrations\n• Hospitality Interiors - Guest rooms, common areas, service zones\n\nWe understand the unique requirements of hospitality spaces and design for guest experience and operational efficiency.",
    keywords: ["hospitality", "hotel", "resort", "restaurant", "cafe", "banquet"]
  },
  {
    question: "Do you work on healthcare facility projects?",
    answer: "Yes, we have experience designing healthcare facilities including:\n• Hospital Design - Complete medical facility planning with modern standards\n• Clinics & Medical Centers - Patient-focused healthcare spaces\n• Medical Laboratories - Specialized functional spaces\n• Healthcare Interiors - Patient rooms, operation theaters, consultation areas\n\nOur healthcare designs prioritize patient safety, hygiene, and efficient workflow.",
    keywords: ["healthcare", "hospital", "medical", "clinic", "health"]
  },
  {
    question: "Can ZionArch design educational and institutional buildings?",
    answer: "Absolutely! We specialize in institutional architecture including:\n• School & College Buildings - Learning environments with modern facilities\n• University Facilities - Multi-building campus planning\n• Training Centers - Professional development spaces\n• Library & Resource Centers - Knowledge-focused facilities\n• Administrative Buildings - Government and institutional offices\n\nWe create educational spaces that inspire learning and facilitate knowledge exchange.",
    keywords: ["educational", "institutional", "school", "college", "university", "campus"]
  },
  {
    question: "Do you handle industrial building projects?",
    answer: "Yes, we design industrial facilities including:\n• Manufacturing Plants - Optimized production spaces\n• Industrial Warehouses - Efficient storage and logistics facilities\n• Factory Buildings - Functional industrial structures\n• Industrial Complexes - Large-scale manufacturing developments\n\nOur industrial designs focus on operational efficiency, safety standards, and workflow optimization.",
    keywords: ["industrial", "factory", "manufacturing", "warehouse", "plant"]
  },
  {
    question: "What is the typical design process at ZionArch?",
    answer: "Our comprehensive design process:\n1. Initial Consultation - Understanding your vision, requirements, and budget\n2. Site Analysis & Planning - Evaluating site conditions and constraints\n3. Conceptual Design - Initial design concepts and spatial planning\n4. Design Development - Refining the chosen concept with details\n5. Detailed Documentation - Complete construction drawings and specifications\n6. Engineering Coordination - MEP integration\n7. Construction Support - Site supervision and quality control during execution\n8. Project Completion - Final handover and client satisfaction",
    keywords: ["process", "steps", "how", "work", "approach", "method", "procedure"]
  },
  {
    question: "How do you approach the initial project consultation?",
    answer: "Our consultation process is thorough and client-focused:\n• Detailed Briefing - Understanding your goals, lifestyle, and preferences\n• Needs Assessment - Identifying functional requirements and priorities\n• Budget Discussion - Understanding your investment capacity\n• Site Evaluation - Analyzing location, orientation, and constraints\n• Timeline Planning - Establishing realistic project schedules\n• Service Recommendation - Suggesting only services that make sense for your project\n• Visual References - Discussing design preferences, styles, and inspirations\n\nThis thorough understanding is crucial for successful design outcomes.",
    keywords: ["consultation", "meeting", "discuss", "initial", "first"]
  },
  {
    question: "Do you provide 3D visualization and rendering?",
    answer: "Yes! 3D visualization is an integral part of our service offering:\n• Photorealistic Renderings - High-quality visual representations\n• Pre-construction Visualization - See how your space will look before construction\n• Interior Renderings - Detailed interior design visualization\n• Exterior Perspectives - Multiple angles of building facades\n• Landscape Integration - Outdoor spaces in context\n\nOur visualizations help you make informed decisions and communicate the design vision clearly.",
    keywords: ["3d", "render", "visualization", "visual", "image", "picture", "view"]
  },
  {
    question: "What is your approach to interior design?",
    answer: "Our interior design philosophy encompasses:\n• Functional Spaces - Efficient layouts optimized for daily use\n• Aesthetic Excellence - Beautiful, cohesive design that reflects your taste\n• Material Selection - Quality materials balancing aesthetics and durability\n• Color & Lighting - Strategic use to create atmosphere\n• Positive Energy - Design principles that create uplifting, prosperous environments\n• Budget Optimization - Maximum impact within financial constraints\n• Sustainability - Eco-friendly materials and practices\n\nWe integrate interior design from the architectural planning stage for seamless results.",
    keywords: ["interior", "inside", "furniture", "decor", "decoration", "fit"]
  },
  {
    question: "Can you help with renovation and remodeling projects?",
    answer: "Yes, we work on renovation and remodeling including:\n• Space Reconfiguration - Redesigning existing layouts for better function\n• Aesthetic Upgrades - Modernizing dated spaces\n• Structural Modifications - Safe alterations to existing structures\n• System Upgrades - Electrical, plumbing, HVAC improvements\n• Historic Preservation - Respectful updates to heritage structures\n• Phase-by-Phase Execution - Minimal disruption during renovation\n\nWe respect the existing structure while creating improved, modern spaces.",
    keywords: ["renovation", "remodel", "restore", "old", "existing", "modify", "upgrade"]
  },
  {
    question: "What factors affect the cost of an architectural project?",
    answer: "Project cost is determined by multiple factors:\n\nDesign Scope: Project size and complexity, number of floors, specialized requirements\n\nMaterials & Finishes: Quality levels chosen, material availability, finishing details\n\nLocation & Site: Land costs, site conditions, infrastructure connectivity\n\nServices Required: Design complexity, visualization needs, engineering coordination\n\nTimeline: Project duration, phasing requirements, seasonal considerations\n\nWe recommend a detailed cost estimate after understanding your full requirements and constraints.",
    keywords: ["cost", "price", "charge", "fee", "expensive", "budget", "money", "affordable"]
  },
  {
    question: "How long does an architectural project typically take?",
    answer: "Project timeline varies based on client response and requirements. Each project is unique with different complexities, approval processes, and construction phases. During our initial consultation, we'll provide a realistic timeline specific to your project type, scope, and location. Generally, design phases take a few weeks to months, while construction can extend based on project scale.",
    keywords: ["time", "long", "duration", "timeline", "days", "months", "weeks", "fast"]
  },
  {
    question: "Do you provide building approval services?",
    answer: "Yes! We provide comprehensive building approval services. Our team handles all documentation required for building permits and municipal approvals. We're well-versed with local building codes and regulations to ensure smooth approval processes. This includes preparing submission drawings, coordinating with authorities, and managing the approval workflow.",
    keywords: ["approval", "permit", "permission", "license", "legal", "regulation", "code"]
  },
  {
    question: "Do you provide construction supervision and project management?",
    answer: "Yes! We offer comprehensive construction support:\n• Site Supervision - Regular on-site quality monitoring\n• Progress Tracking - Timeline adherence and schedule management\n• Quality Control - Ensuring construction matches design specifications\n• Material Inspection - Verifying quality of materials used\n• Problem Resolution - Quick decision-making on site issues\n• Communication Bridge - Regular updates to client on progress\n• Final Inspection - Detailed handover and defect identification\n\nOur supervision ensures your project is executed as designed with consistent quality.",
    keywords: ["supervision", "construction", "build", "site", "visit", "monitor", "management"]
  },
  {
    question: "Can you design spaces that blend traditional and contemporary styles?",
    answer: "Absolutely! Fusion design is one of our strengths:\n\nTraditional Elements: Respects cultural heritage, incorporates local traditions, uses traditional materials and craftsmanship\n\nContemporary Elements: Modern functionality, current design aesthetics, efficient building systems, sustainable practices\n\nThe Fusion Approach: We create spaces that honor cultural roots while providing modern comfort. This creates designs that are timeless, locally relevant yet globally sophisticated, culturally respectful yet contemporary.\n\nPerfect for clients wanting authenticity with modern living standards.",
    keywords: ["traditional", "contemporary", "fusion", "modern", "blend", "mix", "style"]
  },
  {
    question: "Where is ZionArch Architects located?",
    answer: "ZionArch Architects is based in Chennai, Tamil Nadu:\n\nAddress:\nNo. 1, 1st Floor, 2nd Main Road\nParasakthi Nagar, Camp Road, Selaiyur\nEast Tambaram, Chennai - 600073\n\nContact Information:\n• Phone: +91 44 4286 5772\n• Mobile: +91 86954 78788\n• Email: office@zionarch.com\n\nWe're conveniently located and welcome visits for consultations.",
    keywords: ["location", "where", "address", "office", "chennai", "find"]
  },
  {
    question: "Does ZionArch work on projects outside Chennai?",
    answer: "Yes! We work on projects beyond Chennai:\n\nService Areas: Throughout Tamil Nadu, neighboring states (Andhra Pradesh, Telangana, Karnataka), Pan-India projects, selective international projects\n\nProject Delivery:\n• Initial Virtual Consultation - Video meetings for project briefing\n• Site Visit & Assessment - Our team visits for site evaluation\n• Remote Coordination - Consistent communication and updates\n• Digital Submissions - Plans, drawings, renderings digitally\n• Regular Site Supervision - Periodic on-site visits\n• Quality Assurance - Consistent standards across all locations\n\nGeographic location is no barrier to working with us.",
    keywords: ["outside", "other", "location", "pan", "india", "travel", "distant"]
  },
  {
    question: "How can I get started with ZionArch for my project?",
    answer: "Getting started is simple:\n\n1. Initial Contact: Call +91 44 4286 5772, Email office@zionarch.com, or fill out our website inquiry form\n\n2. Schedule Consultation: We arrange a convenient time for discussion\n\n3. Project Discussion: Share your vision, requirements, and budget\n\n4. Fee Quote & Proposal: We prepare a detailed project proposal with scope, timeline, and fees\n\n5. Agreement & Begin Design: Execute design agreement and commence with detailed briefing\n\nWe make the process transparent and straightforward from the first conversation.",
    keywords: ["start", "begin", "initiate", "first", "contact", "reach", "hire"]
  },
  {
    question: "What information do I need to provide for a project quote?",
    answer: "To prepare an accurate quote, please provide:\n\nProject Basics: Project type, location, total built-up area, number of units/floors\n\nYour Requirements: Functional needs, design preferences, must-have features, special requirements\n\nPractical Details: Budget range, desired timeline, land ownership/approvals status, existing structures\n\nAdditional Information: Number of people to accommodate, lifestyle/business details, growth plans, sustainability goals\n\nDon't worry if you don't have all details—we'll guide you through the discovery process during consultation.",
    keywords: ["quote", "information", "need", "provide", "details", "requirement"]
  },
  {
    question: "How much input will I have in the design process?",
    answer: "Client collaboration is central to our process:\n\nYour Involvement:\n• Conceptual Phase - Multiple design concepts for your selection\n• Feedback Loops - Regular design reviews with your input\n• Modification Requests - Easy incorporation of preferences\n• Major Decisions - You decide on materials, finishes, specifications\n• Progress Updates - Transparent communication at every stage\n• Final Approvals - Your sign-off before documentation\n\nOur Role: Advising on feasibility, recommending efficient solutions, ensuring design integrity and compliance, providing professional expertise, managing technical details\n\nIt's a true partnership where your vision and our expertise combine for the best results.",
    keywords: ["input", "involvement", "participate", "decision", "collaborate", "say"]
  },
  {
    question: "How can I contact ZIONARCH?",
    answer: "You can reach us through multiple channels:\n\n• Phone: +91 44 4286 5772\n• Mobile/WhatsApp: +91 86954 78788\n• Email: office@zionarch.com\n• Website: Visit our contact page for inquiry form\n• Visit: No. 1, 1st Floor, 2nd Main Road, Parasakthi Nagar, Camp Road, Selaiyur, East Tambaram, Chennai - 600073\n\nWe typically respond within 24 hours!",
    keywords: ["contact", "reach", "call", "phone", "email", "whatsapp", "touch"]
  }
];

const quickQuestions = [
  "What services does Zionarch offer?",
  "Who is the principal architect?",
  "Can you design residential projects?",
  "Do you provide 3D visualization?",
  "How can I get started?"
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
  return "Thank you for your question! For detailed information about this topic, please contact us:\n\n• Phone: +91 44 4286 5772\n• Mobile/WhatsApp: +91 86954 78788\n• Email: office@zionarch.com\n\nOur team will be happy to assist you with personalized guidance!";
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
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[80vh] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
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
