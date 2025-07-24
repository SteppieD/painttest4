// Debug logger utility for tracking errors and execution flow
export class DebugLogger {
  private context: string;
  private startTime: number;
  private logs: Array<{ timestamp: number; level: string; message: string; data?: any }> = [];

  constructor(context: string) {
    this.context = context;
    this.startTime = Date.now();
  }

  private log(level: string, message: string, data?: any) {
    const timestamp = Date.now() - this.startTime;
    const logEntry = { timestamp, level, message, data };
    this.logs.push(logEntry);

    const prefix = `[${this.context}] [${timestamp}ms] [${level}]`;
    const style = level === 'ERROR' ? 'color: red; font-weight: bold' : 
                  level === 'SUCCESS' ? 'color: green; font-weight: bold' : 
                  level === 'WARN' ? 'color: orange' : 'color: blue';

    if (typeof window !== 'undefined') {
      // Client-side logging with styling
      console.log(`%c${prefix}`, style, message, data || '');
    } else {
      // Server-side logging
      console.log(`${prefix} ${message}`, data ? JSON.stringify(data, null, 2) : '');
    }
  }

  info(message: string, data?: any) {
    this.log('INFO', message, data);
  }

  success(message: string, data?: any) {
    this.log('SUCCESS', message, data);
  }

  warn(message: string, data?: any) {
    this.log('WARN', message, data);
  }

  error(message: string, error?: any) {
    const errorData = error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack?.split('\n').slice(0, 5).join('\n')
    } : error;
    
    this.log('ERROR', message, errorData);
  }

  checkpoint(name: string, data?: any) {
    this.log('CHECKPOINT', name, data);
  }

  getSummary() {
    const totalTime = Date.now() - this.startTime;
    const errors = this.logs.filter(log => log.level === 'ERROR');
    
    return {
      context: this.context,
      totalTime,
      totalLogs: this.logs.length,
      errors: errors.length,
      logs: this.logs
    };
  }

  printSummary() {
    const summary = this.getSummary();
    console.log('='.repeat(50));
    console.log(`Debug Summary for: ${summary.context}`);
    console.log(`Total Time: ${summary.totalTime}ms`);
    console.log(`Total Logs: ${summary.totalLogs}`);
    console.log(`Errors: ${summary.errors}`);
    console.log('='.repeat(50));
    
    if (summary.errors > 0) {
      console.log('Error Details:');
      this.logs.filter(log => log.level === 'ERROR').forEach(log => {
        console.log(`  - [${log.timestamp}ms] ${log.message}`);
        if (log.data) console.log('    ', log.data);
      });
    }
  }
}