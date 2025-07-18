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
    // Define conversation flow
    const steps: ConversationStep[] = [
      {
        id: 'start',
        question: "Hello! I'm here to help you create a professional painting quote. What's the customer's name?",
        field: 'customerName',
        type: 'text',
        required: true,
        next: () => 'address'
      },
      {
        id: 'address',
        question: "Great! What's the address for this painting project?",
        field: 'address',
        type: 'text',
        required: true,
        next: () => 'projectType'
      },
      {
        id: 'projectType',
        question: "Is this an interior or exterior painting project?",
        field: 'projectType',
        type: 'select',
        options: ['interior', 'exterior'],
        required: true,
        next: (value) => value === 'interior' ? 'interiorSurfaces' : 'exteriorSurfaces'
      },
      {
        id: 'interiorSurfaces',
        question: "Which surfaces need to be painted? (Select all that apply)",
        field: 'surfaces',
        type: 'multiselect',
        options: ['walls', 'ceilings', 'trim', 'doors', 'windows'],
        required: true,
        next: () => 'roomCount'
      },
      {
        id: 'exteriorSurfaces',
        question: "Which exterior surfaces need to be painted? (Select all that apply)",
        field: 'surfaces',
        type: 'multiselect',
        options: ['siding', 'trim', 'doors', 'windows', 'deck', 'fence'],
        required: true,
        next: () => 'measurements'
      },
      {
        id: 'roomCount',
        question: "How many rooms need painting?",
        field: 'roomCount',
        type: 'number',
        required: true,
        validation: (value) => value > 0 && value <= 50,
        next: () => 'roomDetails'
      },
      {
        id: 'roomDetails',
        question: "Can you provide the dimensions for each room? (or I can estimate based on room types)",
        field: 'roomDetails',
        type: 'text',
        required: false,
        next: () => 'paintQuality'
      },
      {
        id: 'measurements',
        question: "What's the approximate square footage of the area to be painted?",
        field: 'sqft',
        type: 'number',
        required: true,
        validation: (value) => value > 0,
        next: () => 'paintQuality'
      },
      {
        id: 'paintQuality',
        question: "What quality of paint would you prefer?\n- Good: Budget-friendly option\n- Better: Mid-range quality\n- Best: Premium paint",
        field: 'paintQuality',
        type: 'select',
        options: ['good', 'better', 'best'],
        required: true,
        next: () => 'timeline'
      },
      {
        id: 'timeline',
        question: "When would you like this project completed?",
        field: 'timeline',
        type: 'text',
        required: false,
        next: () => 'specialRequests'
      },
      {
        id: 'specialRequests',
        question: "Are there any special requirements or notes for this project?",
        field: 'specialRequests',
        type: 'text',
        required: false,
        next: () => 'contact'
      },
      {
        id: 'contact',
        question: "Finally, what's the best phone number or email to reach the customer?",
        field: 'contactInfo',
        type: 'text',
        required: false,
        next: () => null // End of conversation
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
}