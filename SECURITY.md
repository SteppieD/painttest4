# Security Implementation Guide

## Overview
This document outlines the comprehensive security measures implemented in the PaintQuote Pro application to protect user data and prevent unauthorized access.

## Security Features Implemented

### 1. Authentication & Session Management
- **Secure Session Tokens**: 32-byte cryptographically secure random tokens
- **Session Expiry**: 7-day maximum session lifetime with 1-day refresh intervals
- **HttpOnly Cookies**: Session tokens stored in HttpOnly, Secure, SameSite cookies
- **Automatic Session Cleanup**: Expired sessions cleaned up hourly

### 2. Rate Limiting
Protects against brute force and DoS attacks:
- **API Calls**: 60 requests per minute per IP
- **Authentication Attempts**: 5 attempts per hour per IP
- **Quote Creation**: 30 quotes per hour per company
- **429 Status Code**: Returned with Retry-After header when limit exceeded

### 3. Input Validation & Sanitization
All user inputs are validated and sanitized:
- **Type Validation**: Strict type checking for all inputs
- **Length Limits**: Maximum lengths enforced on all string inputs
- **Pattern Matching**: Regex validation for emails, phones, etc.
- **HTML Escaping**: Prevents XSS attacks by escaping HTML entities
- **SQL Injection Prevention**: Parameterized queries and string escaping

### 4. Security Headers
All API responses include security headers:
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Cache-Control: no-store, no-cache, must-revalidate
```

### 5. CSRF Protection
- **CSRF Tokens**: Generated for state-changing operations
- **Token Validation**: Required for POST, PUT, DELETE requests
- **SameSite Cookies**: Additional protection against CSRF

### 6. Data Encryption
- **Password Hashing**: Using SHA-256 with salt (upgrade to bcrypt recommended)
- **Sensitive Data**: Encrypted at rest and in transit
- **HTTPS Only**: Enforce SSL/TLS for all communications

### 7. Access Control
- **Company Isolation**: Each company can only access their own data
- **Permission Checks**: Granular permissions for different actions
- **Resource Ownership**: Verify resource ownership before access

### 8. Security Logging
- **Authentication Events**: All login attempts logged
- **Permission Denials**: Unauthorized access attempts tracked
- **Rate Limit Violations**: Excessive request patterns logged
- **Invalid Input**: Malicious input attempts recorded

## Implementation Guide

### Migrating Existing Routes

#### Before (Insecure):
```typescript
export async function POST(request: NextRequest) {
  const company = getCompanyFromRequest(request);
  const body = await request.json();
  
  // Direct database access without validation
  const quote = await db.createQuote({
    company_id: company.id,
    ...body
  });
  
  return NextResponse.json(quote);
}
```

#### After (Secure):
```typescript
import { createSecureRoute, validateQuoteData } from '@/lib/auth/secure-api';

export const POST = createSecureRoute(async ({ companyId, accessCode, request }) => {
  // Validate and sanitize input
  const body = await request.json();
  const validation = validateQuoteData(body);
  
  if (!validation.valid) {
    return createErrorResponse('Invalid data', 400, validation.errors);
  }
  
  // Check permissions
  if (!await checkPermission(companyId, 'create_quote')) {
    return createErrorResponse('Permission denied', 403);
  }
  
  // Use sanitized data
  const quote = await db.createQuote({
    company_id: companyId,
    ...validation.sanitized
  });
  
  return createSecureResponse(quote, 201);
});
```

### Client-Side Security

#### Secure API Calls:
```typescript
// Use session cookie (automatically sent)
const response = await fetch('/api/quotes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken // Include CSRF token
  },
  credentials: 'include', // Include cookies
  body: JSON.stringify(data)
});
```

#### Secure Local Storage:
```typescript
// Don't store sensitive data in localStorage
// Use session cookies instead
// If you must use localStorage, encrypt the data:
const encryptedData = await encrypt(sensitiveData);
localStorage.setItem('data', encryptedData);
```

## Security Checklist

### For Every API Route:
- [ ] Use `createSecureRoute` wrapper
- [ ] Validate all inputs with `sanitizeInput`
- [ ] Check permissions with `checkPermission`
- [ ] Log security events
- [ ] Return proper error codes (401, 403, 429)
- [ ] Include security headers

### For Every Form:
- [ ] Client-side validation (UX)
- [ ] Server-side validation (Security)
- [ ] CSRF token for state changes
- [ ] Rate limiting for submissions
- [ ] Sanitize before display

### For Database Operations:
- [ ] Use parameterized queries
- [ ] Validate foreign key relationships
- [ ] Check ownership before updates/deletes
- [ ] Audit sensitive operations
- [ ] Use transactions for consistency

## Environment Variables

Required security environment variables:
```env
# Authentication
AUTH_SALT=<random-32-char-string>
SESSION_SECRET=<random-64-char-string>

# Encryption
ENCRYPTION_KEY=<random-32-char-string>

# Rate Limiting (Redis in production)
REDIS_URL=<redis-connection-url>

# Security
ALLOWED_ORIGINS=https://yourdomain.com
SECURE_COOKIE=true
```

## Testing Security

### Manual Testing:
1. **Rate Limiting**: Make 61 requests in 1 minute, verify 429 response
2. **Invalid Input**: Send malformed JSON, verify 400 response
3. **No Auth**: Call API without session, verify 401 response
4. **Wrong Company**: Try to access another company's data, verify 403
5. **XSS**: Try to inject `<script>` tags, verify they're escaped
6. **SQL Injection**: Try SQL in inputs, verify it's escaped

### Automated Testing:
```typescript
// Example security test
describe('API Security', () => {
  it('should rate limit excessive requests', async () => {
    const promises = Array(61).fill(0).map(() => 
      fetch('/api/quotes')
    );
    
    const responses = await Promise.all(promises);
    const lastResponse = responses[60];
    
    expect(lastResponse.status).toBe(429);
    expect(lastResponse.headers.get('Retry-After')).toBeDefined();
  });
  
  it('should reject invalid input', async () => {
    const response = await fetch('/api/quotes', {
      method: 'POST',
      body: JSON.stringify({
        customerName: '<script>alert("XSS")</script>'
      })
    });
    
    const data = await response.json();
    expect(data.customerName).not.toContain('<script>');
  });
});
```

## Security Monitoring

### What to Monitor:
1. **Failed Login Attempts**: > 5 per hour from same IP
2. **Rate Limit Violations**: Patterns indicating attacks
3. **404 Errors**: Scanning for vulnerabilities
4. **Large Payloads**: Potential DoS attempts
5. **Unusual Patterns**: Off-hours access, geographic anomalies

### Incident Response:
1. **Detect**: Monitor logs and alerts
2. **Contain**: Block IP, disable account
3. **Investigate**: Review logs, identify impact
4. **Remediate**: Fix vulnerability, patch systems
5. **Recover**: Restore service, verify integrity
6. **Learn**: Update procedures, add tests

## Regular Security Tasks

### Daily:
- Review security logs
- Check for failed authentication spikes
- Monitor rate limit violations

### Weekly:
- Review new dependencies for vulnerabilities
- Update security patches
- Test backup restoration

### Monthly:
- Security audit of new features
- Review and rotate API keys
- Update security documentation

### Quarterly:
- Penetration testing
- Security training for team
- Review and update security policies

## Compliance Considerations

### GDPR Compliance:
- User consent for data collection
- Right to be forgotten (data deletion)
- Data portability (export user data)
- Privacy policy and cookie notice

### PCI Compliance (if handling payments):
- Never store credit card numbers
- Use Stripe/payment processor tokens
- Secure transmission (HTTPS only)
- Regular security audits

### SOC 2 Compliance:
- Access controls and authentication
- Data encryption at rest and in transit
- Security monitoring and logging
- Incident response procedures

## Contact for Security Issues

**Security Team Email**: security@paintquotepro.com
**Bug Bounty Program**: https://paintquotepro.com/security/bounty
**Security Updates**: https://paintquotepro.com/security/updates

## Next Steps

1. **Immediate**: Update all API routes to use `createSecureRoute`
2. **This Week**: Implement CSRF tokens on all forms
3. **This Month**: Set up security monitoring and alerting
4. **This Quarter**: Conduct penetration testing

Remember: Security is not a feature, it's a continuous process. Stay vigilant!