export interface ConversationStep {
  id: string;
  question: string;
  field: string;
  type: 'text' | 'number' | 'select' | 'multiselect';
  options?: string[];
  required: boolean;
  validation?: (value: any) => boolean;
  next?: (value: any) => string | null;
}

export interface ConversationState {
  currentStep: string;
  collectedData: Record<string, any>;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>;
  isComplete: boolean;
  quoteReady: boolean;
}

export class ConversationManager {
  private steps: Map<string, ConversationStep> = new Map();
  private state: ConversationState;

  constructor() {
    this.initializeSteps();
    this.state = this.createInitialState();
  }

  private initializeSteps() {
    // Define conversation flow based on research: 2-minute professional quote
    const steps: ConversationStep[] = [
      {
        id: 'start',
        question: "Hi! I'll help you build a quote in under 2 minutes. I see you're set up for painting with your standard rates. Let's start - what type of space are we quoting today?",
        field: 'spaceType',
        type: 'select',
        options: ['living room', 'bedroom', 'kitchen', 'bathroom', 'whole house', 'office', 'other'],
        required: true,
        next: (value) => value === 'whole house' ? 'houseSize' : 'roomDimensions'
      },
      // Step 1: Room Dimensions (30 seconds)
      {
        id: 'roomDimensions',
        question: "Great! I need the basic measurements. Can you give me:\n- Linear feet of walls around the perimeter?\n- Ceiling height? (standard 8ft, 9ft, 10ft+, or vaulted)\n- Room length and width for ceiling area?",
        field: 'measurements',
        type: 'text',
        required: true,
        next: () => 'surfaces'
      },
      {
        id: 'houseSize',
        question: "Perfect! How many total rooms are we painting? And what's the approximate square footage of the house? (or tell me: small house under 1500sqft, medium 1500-2500sqft, large 2500sqft+)",
        field: 'houseDetails',
        type: 'text',
        required: true,
        next: () => 'surfaces'
      },
      // Step 2: Surfaces & Scope (45 seconds)
      {
        id: 'surfaces',
        question: "What surfaces are we painting?\n- Walls only?\n- Walls + ceiling?\n- Include trim and doors?\n- Any special features? (accent walls, textured surfaces, high ceilings)",
        field: 'surfaces',
        type: 'text',
        required: true,
        next: (value) => {
          const lower = value.toLowerCase();
          if (lower.includes('trim') || lower.includes('door')) {
            return 'trimDetails';
          }
          return 'paintSelection';
        }
      },
      {
        id: 'trimDetails',
        question: "How many doors and windows need trim work?",
        field: 'trimCount',
        type: 'text',
        required: true,
        next: () => 'paintSelection'
      },
      // Step 3: Paint Selection (20 seconds)
      {
        id: 'paintSelection',
        question: "Which paint are you planning to use?\n- One of your preferred paints?\n- Different paint for walls vs ceiling vs trim?\n- Client has a specific brand request?",
        field: 'paintProducts',
        type: 'text',
        required: true,
        next: () => 'condition'
      },
      // Step 4: Condition Assessment (15 seconds)
      {
        id: 'condition',
        question: "Quick condition check:\n- Walls in good shape or need prep work? (good/minor touch-ups/major prep)\n- Any repairs needed before painting?",
        field: 'prepCondition',
        type: 'select',
        options: ['good', 'minor touch-ups', 'major prep'],
        required: true,
        next: () => 'timeline'
      },
      // Step 5: Timeline & Preferences (10 seconds)
      {
        id: 'timeline',
        question: "When does this need to be completed? (affects scheduling/urgency pricing)\n- This week, next week, within a month, flexible?",
        field: 'timeline',
        type: 'select',
        options: ['this week', 'next week', 'within a month', 'flexible'],
        required: true,
        next: () => 'customerInfo'
      },
      // Quick customer info capture
      {
        id: 'customerInfo',
        question: "Last quick details - customer name and address for the quote?",
        field: 'customerDetails',
        type: 'text',
        required: true,
        next: () => null // End of conversation - ready to generate quote
      }
    ];

    steps.forEach(step => this.steps.set(step.id, step));
  }

  private createInitialState(): ConversationState {
    return {
      currentStep: 'start',
      collectedData: {},
      messages: [],
      isComplete: false,
      quoteReady: false
    };
  }

  reset() {
    this.state = this.createInitialState();
  }

  getCurrentQuestion(): string {
    const step = this.steps.get(this.state.currentStep);
    return step?.question || "I'm having trouble understanding. Could you please rephrase?";
  }

  getCurrentStep(): ConversationStep | undefined {
    return this.steps.get(this.state.currentStep);
  }

  processUserInput(input: string): { 
    response: string; 
    isComplete: boolean;
    collectedData: Record<string, any>;
  } {
    const currentStep = this.steps.get(this.state.currentStep);
    
    if (!currentStep) {
      return {
        response: "I'm sorry, I got confused. Let's start over.",
        isComplete: false,
        collectedData: this.state.collectedData
      };
    }

    // Add user message to history
    this.state.messages.push({
      role: 'user',
      content: input,
      timestamp: new Date()
    });

    // Process input based on type
    let processedValue: any = input;
    
    if (currentStep.type === 'number') {
      processedValue = parseFloat(input);
      if (isNaN(processedValue)) {
        return {
          response: "Please provide a valid number.",
          isComplete: false,
          collectedData: this.state.collectedData
        };
      }
    } else if (currentStep.type === 'select') {
      const normalizedInput = input.toLowerCase().trim();
      if (currentStep.options && !currentStep.options.includes(normalizedInput)) {
        return {
          response: `Please choose one of: ${currentStep.options.join(', ')}`,
          isComplete: false,
          collectedData: this.state.collectedData
        };
      }
      processedValue = normalizedInput;
    } else if (currentStep.type === 'multiselect') {
      // Parse comma-separated values or detect from text
      const items = input.toLowerCase().split(/[,\s]+/).filter(Boolean);
      processedValue = items.filter(item => 
        currentStep.options?.includes(item)
      );
      
      if (processedValue.length === 0) {
        return {
          response: `Please select from: ${currentStep.options?.join(', ')}`,
          isComplete: false,
          collectedData: this.state.collectedData
        };
      }
    }

    // Validate if needed
    if (currentStep.validation && !currentStep.validation(processedValue)) {
      return {
        response: "That doesn't seem right. Please try again.",
        isComplete: false,
        collectedData: this.state.collectedData
      };
    }

    // Store the collected data
    this.state.collectedData[currentStep.field] = processedValue;

    // Determine next step
    const nextStepId = currentStep.next ? currentStep.next(processedValue) : null;
    
    if (nextStepId) {
      this.state.currentStep = nextStepId;
      const nextStep = this.steps.get(nextStepId);
      
      // Add assistant response
      this.state.messages.push({
        role: 'assistant',
        content: nextStep?.question || '',
        timestamp: new Date()
      });
      
      return {
        response: nextStep?.question || '',
        isComplete: false,
        collectedData: this.state.collectedData
      };
    } else {
      // Conversation complete
      this.state.isComplete = true;
      this.state.quoteReady = true;
      
      return {
        response: "Perfect! I have all the information I need. Let me generate your quote...",
        isComplete: true,
        collectedData: this.state.collectedData
      };
    }
  }

  getCollectedData(): Record<string, any> {
    return { ...this.state.collectedData };
  }

  getMessages(): Array<{ role: 'user' | 'assistant'; content: string; timestamp: Date }> {
    return [...this.state.messages];
  }

  isComplete(): boolean {
    return this.state.isComplete;
  }

  isQuoteReady(): boolean {
    return this.state.quoteReady;
  }

  // Helper to parse contact info
  parseContactInfo(data: Record<string, any>): { email?: string; phone?: string } {
    const contact = data.contactInfo || '';
    const emailMatch = contact.match(/[\w.-]+@[\w.-]+\.\w+/);
    const phoneMatch = contact.match(/[\d\s()+-]+/);
    
    return {
      email: emailMatch ? emailMatch[0] : undefined,
      phone: phoneMatch ? phoneMatch[0].trim() : undefined
    };
  }

  // Parse measurements from text input
  parseMeasurements(input: string): {
    linearFeetWalls?: number;
    ceilingHeight?: number;
    roomLength?: number;
    roomWidth?: number;
    wallSqft?: number;
    ceilingSqft?: number;
  } {
    const measurements: any = {};
    
    // Look for linear feet
    const linearMatch = input.match(/(\d+)\s*(?:linear\s*)?(?:feet|ft)/i);
    if (linearMatch) measurements.linearFeetWalls = parseFloat(linearMatch[1]);
    
    // Look for ceiling height
    const ceilingMatch = input.match(/(\d+)\s*(?:foot|ft|')?\s*(?:ceiling|height)/i);
    if (ceilingMatch) measurements.ceilingHeight = parseFloat(ceilingMatch[1]);
    
    // Look for room dimensions
    const dimensionMatch = input.match(/(\d+)\s*(?:x|by)\s*(\d+)/i);
    if (dimensionMatch) {
      measurements.roomLength = parseFloat(dimensionMatch[1]);
      measurements.roomWidth = parseFloat(dimensionMatch[2]);
    }
    
    // Calculate sqft if we have the measurements
    if (measurements.linearFeetWalls && measurements.ceilingHeight) {
      measurements.wallSqft = measurements.linearFeetWalls * measurements.ceilingHeight;
    }
    if (measurements.roomLength && measurements.roomWidth) {
      measurements.ceilingSqft = measurements.roomLength * measurements.roomWidth;
    }
    
    return measurements;
  }

  // Parse customer details from combined input
  parseCustomerDetails(input: string): {
    customerName?: string;
    address?: string;
  } {
    const lines = input.split(/[,\n]/);
    return {
      customerName: lines[0]?.trim(),
      address: lines.slice(1).join(', ').trim() || undefined
    };
  }

  // Quick quote mode parser - handles comprehensive messages
  parseQuickQuote(input: string): Record<string, any> | null {
    const data: any = {
      measurements: {},
      surfaces: [],
      paintProducts: {}
    };
    
    // Extract customer name (look for "for [Name] at")
    const customerMatch = input.match(/for\s+(\w+)\s+at/i);
    if (customerMatch) data.customerName = customerMatch[1];
    
    // Extract address
    const addressMatch = input.match(/at\s+([^.]+?)(?:\.|,|$)/i);
    if (addressMatch) data.address = addressMatch[1].trim();
    
    // Extract linear feet
    const linearMatch = input.match(/(\d+)\s*(linear\s*)?feet/i);
    if (linearMatch) data.measurements.linearFeetWalls = parseFloat(linearMatch[1]);
    
    // Extract ceiling height
    const ceilingMatch = input.match(/(\d+)\s*(feet|ft|')\s*(tall|high|ceiling)/i);
    if (ceilingMatch) data.measurements.ceilingHeight = parseFloat(ceilingMatch[1]);
    
    // Calculate wall sqft
    if (data.measurements.linearFeetWalls && data.measurements.ceilingHeight) {
      data.measurements.wallSqft = data.measurements.linearFeetWalls * data.measurements.ceilingHeight;
    }
    
    // Extract paint cost
    const costMatch = input.match(/\$(\d+)\s*(a|per)?\s*gallon/i);
    if (costMatch) {
      data.paintProducts.walls = data.paintProducts.walls || {};
      data.paintProducts.walls.costPerGallon = parseFloat(costMatch[1]);
    }
    
    // Extract coverage rate
    const coverageMatch = input.match(/(\d+)\s*square\s*feet\s*per\s*gallon/i);
    if (coverageMatch) {
      data.paintProducts.walls = data.paintProducts.walls || {};
      data.paintProducts.walls.coverageRate = parseFloat(coverageMatch[1]);
    }
    
    // Extract paint name (e.g., "eggshell sherwin williams")
    const paintMatch = input.match(/(eggshell|flat|satin|semi-gloss|gloss)\s*([^.,]+)/i);
    if (paintMatch) {
      data.paintProducts.walls = data.paintProducts.walls || {};
      data.paintProducts.walls.name = paintMatch[0].trim();
    }
    
    // Determine surfaces
    if (/not\s*painting.*ceiling/i.test(input)) {
      data.surfaces.push('walls');
    } else if (/walls?\s*and\s*ceiling/i.test(input)) {
      data.surfaces.push('walls', 'ceiling');
    } else if (/walls?\s*only/i.test(input) || /linear\s*feet.*interior/i.test(input)) {
      data.surfaces.push('walls');
    }
    
    // Check for trim/doors/windows
    if (!/not\s*painting.*trim/i.test(input) && /trim/i.test(input)) {
      data.surfaces.push('trim');
    }
    if (!/not\s*painting.*door/i.test(input) && /door/i.test(input)) {
      const doorMatch = input.match(/(\d+)\s*doors?/i);
      if (doorMatch) data.measurements.doors = parseInt(doorMatch[1]);
    }
    if (!/not\s*painting.*window/i.test(input) && /window/i.test(input)) {
      const windowMatch = input.match(/(\d+)\s*windows?/i);
      if (windowMatch) data.measurements.windows = parseInt(windowMatch[1]);
    }
    
    // Default to interior if not specified
    data.projectType = 'interior';
    
    // Return null if we don't have minimum required data
    if (!data.measurements.wallSqft && !data.measurements.linearFeetWalls) {
      return null;
    }
    
    return data;
  }
}