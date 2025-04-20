export const typescriptExampleGeographicConsistency = `
    function validateGeographicConsistency(transaction: Transaction): ValidationResult {
  const inconsistencies = [];
  
  // Compare IP location with shipping address
  if (
    transaction.deviceInfo.ipGeoLocation && 
    transaction.shippingAddress
  ) {
    const ipCountry = transaction.deviceInfo.ipGeoLocation.country;
    const shippingCountry = transaction.shippingAddress.country;
    
    if (ipCountry !== shippingCountry) {
      inconsistencies.push({
        type: 'geographic',
        severity: transaction.amount > 1000 ? 'high' : 'medium',
        description: 'IP location ({ipCountry}) doesn't match shipping country ({shippingCountry})'
      });
    }
  }
  
  // Compare billing and shipping countries for high-value transactions
  if (
    transaction.billingAddress && 
    transaction.shippingAddress &&
    transaction.billingAddress.country !== transaction.shippingAddress.country
  ) {
    inconsistencies.push({
      type: 'geographic',
      severity: transaction.amount > 500 ? 'high' : 'low',
      description: 'Billing country differs from shipping country'
    });
  }
  
  return {
    valid: inconsistencies.length === 0,
    inconsistencies
  };
}
    `;
export const typescriptExampleDistanceBased = `function validateLocationVelocity(
  currentTransaction: Transaction,
  previousTransaction: Transaction
): ValidationResult {
  // Skip if we don't have location data
  if (
    !currentTransaction.deviceInfo.ipGeoLocation ||
    !previousTransaction.deviceInfo.ipGeoLocation
  ) {
    return { valid: true, inconsistencies: [] };
  }
  
  // Calculate distance between locations
  const distance = calculateDistance(
    currentTransaction.deviceInfo.ipGeoLocation,
    previousTransaction.deviceInfo.ipGeoLocation
  );
  
  // Calculate time difference in hours
  const timeDiff = Math.abs(
    new Date(currentTransaction.timestamp).getTime() - 
    new Date(previousTransaction.timestamp).getTime()
  ) / (1000 * 60 * 60);
  
  // Check if travel between locations is physically possible
  // Assuming maximum reasonable travel speed of 500 miles per hour
  const maxPossibleDistance = timeDiff * 500;
  
  if (distance > maxPossibleDistance) {
    return {
      valid: false,
      inconsistencies: [{
        type: 'velocity',
        severity: 'high',
        description: 'Impossible travel distance ({Math.round(distance)} miles) in {timeDiff.toFixed(2)} hours'
      }]
    };
  }
  
  return { valid: true, inconsistencies: [] };
}

function calculateDistance(
  location1: GeoLocation,
  location2: GeoLocation
): number {
  // Haversine formula for distance between coordinates
  const R = 3958.8; // Earth radius in miles
  
  const lat1 = location1.latitude * Math.PI / 180;
  const lat2 = location2.latitude * Math.PI / 180;
  const deltaLat = (location2.latitude - location1.latitude) * Math.PI / 180;
  const deltaLon = (location2.longitude - location1.longitude) * Math.PI / 180;
  
  const a = 
    Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
    Math.cos(lat1) * Math.cos(lat2) * 
    Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
  return R * c;
}`;

export const typescriptExampleTemporalValidation = `
function validateTemporalConsistency(
  transaction: Transaction,
  customerHistory: TransactionHistory
): ValidationResult {
  const inconsistencies = [];
  
  // Check for unusual purchase times
  const hour = new Date(transaction.timestamp).getHours();
  const isNightTime = hour >= 1 && hour <= 5; // 1 AM to 5 AM
  
  if (customerHistory.typicalPurchaseHours) {
    const isUnusualHour = !customerHistory.typicalPurchaseHours.includes(hour);
    
    if (isUnusualHour && isNightTime && transaction.amount > 200) {
      inconsistencies.push({
        type: 'temporal',
        severity: 'medium',
        description: 'High-value purchase made during unusual hours (1 AM - 5 AM)'
      });
    }
  }
  
  // Check for rapid successive transactions
  const recentTransactions = customerHistory.getRecentTransactions(5);
  if (recentTransactions.length > 0) {
    const mostRecent = recentTransactions[0];
    const timeDiffMinutes = (
      new Date(transaction.timestamp).getTime() - 
      new Date(mostRecent.timestamp).getTime()
    ) / (1000 * 60);
    
    if (timeDiffMinutes < 2 && transaction.paymentMethod.type === mostRecent.paymentMethod.type) {
      inconsistencies.push({
        type: 'temporal',
        severity: 'high',
        description: 'Multiple transactions with same payment method in very short timeframe'
      });
    }
  }
  
  return {
    valid: inconsistencies.length === 0,
    inconsistencies
  };
}`;

export const typescriptExampleDeviceConsistency = `
function validateDevicePaymentConsistency(
  transaction: Transaction,
  customerHistory: TransactionHistory
): ValidationResult {
  const inconsistencies = [];
  
  // Check if this payment method has been used with this device before
  const knownDevicePaymentPairs = customerHistory.getDevicePaymentPairs();
  const currentPair = {
    deviceId: transaction.deviceInfo.fingerprint,
    paymentMethodId: '{transaction.paymentMethod.type}-{transaction.paymentMethod.last4}'
  };
  
  const isNewPair = !knownDevicePaymentPairs.some(pair =>
    pair.deviceId === currentPair.deviceId && 
    pair.paymentMethodId === currentPair.paymentMethodId
  );
  
  if (isNewPair && transaction.amount > 200) {
    inconsistencies.push({
      type: 'device_payment',
      severity: 'medium',
      description: 'New device-payment method combination for high-value transaction'
    });
  }
  
  // Check if a new device is being used with multiple payment methods in short time
  if (isNewPair) {
    const recentTransactions = customerHistory.getRecentTransactionsByDevice(
      currentPair.deviceId,
      24 * 60 // last 24 hours
    );
    
    const uniquePaymentMethods = new Set(
      recentTransactions.map(tx => '{tx.paymentMethod.type}-{tx.paymentMethod.last4}')
    );
    
    if (uniquePaymentMethods.size >= 2) {
      inconsistencies.push({
        type: 'device_payment',
        severity: 'high',
        description: 'New device used with multiple payment methods in short timeframe'
      });
    }
  }
  
  return {
    valid: inconsistencies.length === 0,
    inconsistencies
  };
}`;

export const typescriptExampleFallbackMechanism = `
async transactionCheck(request: FraudDetectionRequest): Promise<FraudDetectionResponse> {
// Primary service first
try {
  return await this.primaryService.evaluate(request);
} catch (error) {
  this.monitoringService.recordServiceFailure('primary-fraud-service', error);
  
  // Secondary service
  try {
    return await this.secondaryService.evaluate(request);
  } catch (secondaryError) {
    this.monitoringService.recordServiceFailure('secondary-fraud-service', secondaryError);
    
    // Last fall back to local rules
    return this.localRulesEngine.evaluate(request) 
  }
}
}`;

export const typescriptExampleClassSeparation = `
// Transaction processing only handles payment processing
class TransactionService {
processPayment(transaction) {
  // Only handles payment processing
}
}

// Input validation only validates transaction data
class ValidationService {
validateTransaction(transaction) {
  // Only performs data validation
}
}

// Fraud detection only evaluates fraud risk
class FraudDetectionService {
detectFraud(transactionData) {
  // Only performs fraud detection
}
}

// Monitoring only tracks system behavior
class MonitoringService {
recordTransaction(transaction) {
  // Only records monitoring data
}

alertOnAnomaly(transactionId) {
  // Only handles alerting
}
}`;

export const typescriptExampleInteraction = `
function processTransaction(transaction) {
// Each component performs only its specific responsibility
const validationService = new ValidationService();
const fraudService = new FraudDetectionService();
const transactionService = new TransactionService();
const monitoringService = new MonitoringService();

// Validation layer
const isValid = validationService.validateTransaction(transaction);
if (!isValid) return { status: 'rejected', reason: 'validation' };

// Fraud detection layer
const fraudResult = fraudService.detectFraud(transaction);
if (fraudResult.isRisky) return { status: 'rejected', reason: 'fraud' };

// Transaction processing layer
const paymentResult = transactionService.processPayment(transaction);

// Monitoring layer
monitoringService.recordTransaction(transaction);

return paymentResult;
}`;

export const typescriptTransactionAmount = `function normaliseAmount(amount: string | number, currency: string): number {
    // Convert string to number if needed
    const numericAmount = typeof amount === 'string' ? 
      parseFloat(amount.replace(/[^\d.-]/g, '')) : amount;
    
    // Apply currency-specific decimal precision
    const precisionMap: Record<string, number> = {
      'USD': 2,
      'JPY': 0,
      'BTC': 8,
      'DEFAULT': 2
    };
    
    const precision = precisionMap[currency] || precisionMap.DEFAULT;
    
    // Return with fixed precision
    return parseFloat(numericAmount.toFixed(precision));
  }`;
export const typescriptExamplePhoneNumber = `function normalisePhoneNumber(phoneNumber: string, countryCode: string): string {
    // Remove all non-digit characters
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    
    // Ensure country code is included
    if (digitsOnly.startsWith(countryCode.replace('+', ''))) {
      return '+{digitsOnly}';
    }
    
    return '+{countryCode.replace(/\D/g, '')}{digitsOnly}';
  }`;

export const typescriptExamplePostalCode = `
  private normalisePostalCode(postalCode: string, country: string): string {
    const clean = postalCode.trim().toUpperCase();
    
    // Apply country-specific formatting
    switch (country.toUpperCase()) {
      case 'US':
        // US ZIP code format (5 digits or ZIP+4)
        return clean.replace(/[^0-9-]/g, '');
      case 'CA':
        // Canadian postal code format (A1A 1A1)
        return clean.replace(/[^A-Z0-9]/g, '').replace(/(.{3})(.{3})/, '$1 $2');
      // Add other country-specific formatting
      default:
        return clean.replace(/\s/g, '');
    }
  }`;
export const typescriptExampleEmail = `
  function normaliseEmail(email: string): string {
    if (!email) return '';
    
    // Convert to lowercase and trim whitespace
    let normalised = email.toLowerCase().trim();
    
    // Split into local part and domain
    const [localPart, domain] = normalised.split('@');
    
    // Handle Gmail aliases (remove dots and anything after +)
    if (domain === 'gmail.com') {
      const cleanLocalPart = localPart.replace(/\./g, '').split('+')[0];
      return '{cleanLocalPart}@gmail.com';
    }
    
    return normalised;
  }
  `;
export const typescriptExampleAddress = `
  function normaliseAddress(address: {
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }): NormalisedAddress {
    return {
      line1: address.line1.trim(),
      city: address.city.trim(),
      state: address.state.trim().toUpperCase(),
      postalCode: normalisePostalCode(address.postalCode, address.country),
      country: address.country.trim().toUpperCase(),
      // Generate standardised hash for comparison
      addressHash: generateAddressHash(address)
    };
  }
  
  function generateAddressHash(address: any): string {
    // Create deterministic representation by sorting keys
    const sortedAddress = Object.keys(address)
      .sort()
      .reduce((obj, key) => {
        obj[key] = (address[key] || '').toString().toLowerCase().trim();
        return obj;
      }, {});
    
    // Create hash for comparison
    return crypto
      .createHash('sha256')
      .update(JSON.stringify(sortedAddress))
      .digest('hex');
  }`;

export const typescriptExampleFingerprint = `
  function generateTransactionFingerprint(transaction: any): string {
    // Extract critical fields
    const criticalData = {
      amount: normaliseAmount(transaction.amount, transaction.currency),
      email: normaliseEmail(transaction.email),
      ipAddress: normaliseIpAddress(transaction.ipAddress),
      cardBin: transaction.cardNumber.substring(0, 6),
      cardLast4: transaction.cardNumber.slice(-4)
    };
    
    // Generate deterministic hash
    return crypto
      .createHash('sha256')
      .update(JSON.stringify(criticalData))
      .digest('hex');
  }
  `;

export const typescriptExampleAnomaly = `
  function normaliseWithWarnings(input: any): { normalised: any; warnings: string[] } {
    const warnings = [];
    const normalised = {};
    
    // Example: Check email format before normalisation
    if (input.email && input.email.match(/\s+/)) {
      warnings.push('Email contains unusual whitespace');
    }
    
    normalised.email = normaliseEmail(input.email);
    
    // More normalisation with warnings
    
    return { normalised, warnings };
  }`;

export const typescriptExamplePaymentCard = `
function validateCardDetails(cardNumber: string, expiryMonth: string, expiryYear: string): {
  isValid: boolean;
  cardData: {
    bin: string;
    last4: string;
    cardType: string;
    expiry: string;
  }
} {
  // Remove non-digits from card number
  const digits = cardNumber.replace(/\D/g, '');
  
  // Basic format validation and Luhn algorithm check
  const isValidFormat = digits.length >= 13 && digits.length <= 19;
  const isValidChecksum = validateLuhn(digits);
  
  // Identify card type from BIN ranges
  const cardType = getCardType(digits);
  
  // Validate expiration date (simple version)
  const month = parseInt(expiryMonth, 10);
  let year = parseInt(expiryYear, 10);
  if (year < 100) year += 2000;
  
  const now = new Date();
  const isExpired = (year < now.getFullYear() || 
                    (year === now.getFullYear() && month < now.getMonth() + 1));
  
  // Return validation result with normalised data for fraud detection
  return {
    isValid: isValidFormat && isValidChecksum && !isExpired && cardType !== 'unknown',
    cardData: {
      bin: digits.substring(0, 6),  // Bank Identification Number
      last4: digits.slice(-4),      // Last 4 digits
      cardType: cardType,
      expiry: '{month.toString().padStart(2, '0')}/{year}'
    }
  };
}

/**
 * Luhn algorithm for card number validation
 */
function validateLuhn(digits: string): boolean {
  let sum = 0;
  let alternate = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits.charAt(i), 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  
  return (sum % 10) === 0;
}

/**
 * Card type identification based on BIN ranges
 */
function getCardType(digits: string): string {
  // Simplified card type detection
  if (/^4/.test(digits)) return 'visa';
  if (/^5[1-5]/.test(digits)) return 'mastercard';

  // Other card types
  return 'unknown';
}`;

export const typescriptExampleJWT = `
// Generate JWT token on successful login
export function generateToken(userId: string, role: string): string {
  return jwt.sign(
    { 
      userId,
      role,
      // Include tokenVersion for forced logout capability
      tokenVersion: 1
    },
    process.env.JWT_SECRET as string,
    { 
      expiresIn: '1h',  // Short expiration for security
      audience: 'fraud-detection-api'
    }
  );
}

// JWT verification middleware
export function verifyJwt(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorisation;
  
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorisation token' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(403).json({ error: 'Invalid token' });
  }
}

// Role-based authorisation middleware
export function requireRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
}`;

export const typescriptExampleAPIKey = `
// Generate a secure API key for a client
export function generateApiKey(clientId: string): string {
  const randomBytes = crypto.randomBytes(32).toString('hex');
  const apiKey = 'fd_{randomBytes}';
  
  // In production, store this securely in your database
  // along with the clientId and creation timestamp
  saveApiKeyToDatabase(clientId, apiKey);
  
  return apiKey;
}

// Validate API key middleware
export function validateApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'] as string;
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API key is required' });
  }
  
  // Validate API key format
  if (!apiKey.startsWith('fd_') || apiKey.length !== 66) {
    return res.status(401).json({ error: 'Invalid API key format' });
  }
  
  // Check if API key exists and is active
  getApiKeyDetails(apiKey)
    .then(details => {
      if (!details || !details.active) {
        return res.status(401).json({ error: 'Invalid or inactive API key' });
      }
      
      // Attach client info to request for logging and rate limiting
      req.client = {
        id: details.clientId,
        tier: details.tier,
        rateLimit: details.rateLimit
      };
      
      next();
    })
    .catch(error => {
      console.error('API key validation error:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
}

// Mock function to represent database lookup
async function getApiKeyDetails(apiKey: string) {
  // In a real implementation, this would query your database
  return {
    clientId: 'client123',
    active: true,
    tier: 'standard',
    rateLimit: 100
  };
}

// Mock function to represent storing the API key
function saveApiKeyToDatabase(clientId: string, apiKey: string) {
  // In a real implementation, this would store the API key in your database
  console.log('API key generated for client {clientId}');
}
`;

export const typescriptExampleRateLimiting = `const app = express();
// Define different limiter tiers
const createLimiter = (windowMs, max, message) => rateLimit({
  windowMs,
  max,
  standardHeaders: true, // Return rate limit info in headers
  message: { error: message }
});

// Standard API limiter - 100 requests per minute
const standardLimiter = createLimiter(
  60 * 1000,
  100,
  'Too many requests, please try again later.'
);

// More restrictive limiter for auth endpoints - 10 attempts per 5 minutes
const authLimiter = createLimiter(
  5 * 60 * 1000,
  10,
  'Too many authentication attempts. Please try again later.'
);

// Dynamic limiter based on client tier
const dynamicLimiter = (req, res, next) => {
  const tier = req.user?.tier || 'standard';
  
  const limits = {
    premium: 300,
    standard: 100,
    basic: 50
  };
  
  const limit = limits[tier] || 30;
  
  createLimiter(60 * 1000, limit, 'Rate limit exceeded')(req, res, next);
};

// Apply limiters to different routes
app.use('/api/fraud-check', dynamicLimiter);
app.use('/api/auth', authLimiter);
app.use('/api', standardLimiter);}`;

export const typescriptExampleCaptcha = `
// Middleware to verify reCAPTCHA token
async function verifyCaptcha(req: Request, res: Response, next: NextFunction) {
  const token = req.body.recaptchaToken;
  
  if (!token) {
    return res.status(400).json({ error: 'CAPTCHA verification required' });
  }
  
  try {
    // Verify with Google's API
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token
        }
      }
    );
    
    const data = response.data;
    
    // Check if verification was successful
    if (!data.success) {
      return res.status(400).json({ error: 'CAPTCHA verification failed' });
    }
    
    // For high-risk operations, check the score
    if (data.score < 0.5) {
      // Log suspicious activity
      console.warn('Suspicious request detected', {
        score: data.score,
        action: data.action,
        ip: req.ip
      });
      
      // For checkout or payment operations, require additional verification
      if (req.path.includes('/checkout') || req.path.includes('/payment')) {
        return res.status(403).json({ 
          error: 'Additional verification required',
          requiresVerification: true
        });
      }
    }
    
    next();
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return res.status(500).json({ error: 'CAPTCHA verification failed' });
  }
}`;

export const typescriptExampleDDoS = `const redis = new Redis(process.env.REDIS_URL);

// DDoS detection middleware
async function detectDDoS(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip;
  const path = req.path;
  
  // Track request counts by IP and path
  const ipKey = \`ddos:ip:\${ip}\`;
  const pathKey = \`ddos:path:\${path}\`;
  
  await redis.multi()
    .incr(ipKey)
    .expire(ipKey, 60) // 1 minute window
    .incr(pathKey)
    .expire(pathKey, 60)
    .exec();
  
  // Get current counts
  const [ipCount, pathCount] = await Promise.all([
    redis.get(ipKey),
    redis.get(pathKey)
  ]);
  
  // Check for suspicious activity
  if (parseInt(ipCount) > 100) {
    // Log potential DDoS from this IP
    console.warn('Potential DDoS detected from IP', { ip, count: ipCount });
    
    // For severe cases, block temporarily
    if (parseInt(ipCount) > 300) {
      await redis.set(\`blocked:ip:\${ip}\`, '1', 'EX', 300); // Block for 5 minutes
      return res.status(429).json({ 
        error: 'Too many requests',
        retryAfter: 300
      });
    }
  }
  
  // Check if this path is under attack
  if (parseInt(pathCount) > 1000) {
    // Activate enhanced protection for this path
    await redis.set(\`protected:path:\${path}\`, '1', 'EX', 600); // 10 minutes
  }
  
  next();
}`;

export const typescriptExampleBrowserFingerprinting = `// Initialize the fingerprinting library
const fpPromise = FingerprintJS.load();

// Generate device fingerprint
async function getDeviceFingerprint() {
  const fp = await fpPromise;
  const result = await fp.get();
  
  // The visitorId is a stable identifier based on device properties
  return result.visitorId;
}

// Use fingerprint with transaction data
async function secureCheckout(transactionData) {
  const fingerprint = await getDeviceFingerprint();
  
  // Add fingerprint to transaction data
  const secureTransaction = {
    ...transactionData,
    deviceFingerprint: fingerprint
  };
  
  // Send to backend for fraud check
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(secureTransaction)
  });
  
  return response.json();
}`;

export const typescriptExamplesContextBasedResponse = `
class ContextualResponseHandler {
  /**
   * Transforms response based on the context in which it will be used
   */
  transformForContext(
    rawResponse: RawFraudDetectionResponse,
    context: 'API' | 'CHECKOUT' | 'ADMIN_PANEL'
  ): object {
    // Log access for auditing
    this.logAccess(context, rawResponse.transactionId);
    
    switch (context) {
      case 'CHECKOUT':
        // User-facing: use friendly language, no technical details
        return {
          orderStatus: this.mapDecisionToFriendlyStatus(rawResponse.decision),
          reference: rawResponse.transactionId
        };
      
      case 'API': 
        // External API: only essential data with standard format
        return {
          transactionId: rawResponse.transactionId,
          decision: rawResponse.decision
        };
        
      case 'ADMIN_PANEL':
        // Admin view: more details but still protecting model internals
        return {
          transactionId: rawResponse.transactionId,
          decision: rawResponse.decision,
          reviewCategory: this.categorizeRiskFactors(rawResponse.triggeringFactors),
          timestamp: new Date().toISOString()
        };
        
      default:
        // Default to minimum information
        return {
          transactionId: rawResponse.transactionId,
          status: 'PROCESSED'
        };
    }
  }
  
  private mapDecisionToFriendlyStatus(decision: string): string {
    switch (decision) {
      case 'APPROVE': return 'Order confirmed';
      case 'REVIEW': return 'Order processing';
      case 'DENY': return 'Additional verification needed';
      default: return 'Processing';
    }
  }
  
  private categorizeRiskFactors(factors: string[]): string {
    // Group specific factors into general categories to protect detection logic
    if (factors.some(f => f.includes('IP_') || f.includes('GEO_'))) {
      return 'LOCATION';
    }
    if (factors.some(f => f.includes('VELOCITY') || f.includes('FREQUENCY'))) {
      return 'BEHAVIOR';
    }
    if (factors.some(f => f.includes('PAYMENT') || f.includes('CARD'))) {
      return 'PAYMENT';
    }
    return 'OTHER';
  }
  
  private logAccess(context: string, transactionId: string): void {
    logger.info('Fraud data accessed', {
      context,
      transactionId,
      timestamp: new Date().toISOString()
    });
  }
}
`;

export const typescriptExamplesResponseNormalisation = `
class ResponseNormaliser {
  /**
   * Normalises timing and format to prevent side-channel attacks
   */
  async normaliseResponse(
    rawResponse: RawFraudDetectionResponse
  ): Promise<SafeFraudResponse> {
    // Add timing normalisation to prevent timing attacks
    const processStartTime = Date.now();
    
    // Prepare normalised response
    const normalisedResponse: SafeFraudResponse = {
      transactionId: rawResponse.transactionId,
      decision: rawResponse.decision
    };
    
    // Ensure consistent response time
    const processingTime = Date.now() - processStartTime;
    const targetTime = 300; // Target 300ms response time
    
    if (processingTime < targetTime) {
      // Add delay to normalise timing
      await new Promise(resolve => setTimeout(resolve, targetTime - processingTime));
    }
    
    return normalisedResponse;
  }
}
`;

export const typescriptExamplesDecisionMasking = `
class DecisionMasker {
  /**
   * Applies special handling for high-risk denials to prevent attackers
   * from learning what triggers denials
   */
  maskHighRiskDenials(rawResponse: RawFraudDetectionResponse): SafeFraudResponse {
    const baseResponse = {
      transactionId: rawResponse.transactionId,
      decision: rawResponse.decision
    };
    
    // If this is a high-confidence denial, route to special handling
    if (rawResponse.decision === 'DENY' && rawResponse.confidenceLevel > 0.9) {
      // For high-confidence fraud, return REVIEW instead of DENY
      // to mask that we detected the fraud pattern
      return {
        ...baseResponse,
        decision: 'REVIEW' as const
      };
    }
    
    return baseResponse;
  }
}
`;

export const typescriptExamplesSanitisation = `
// Data sanitization function to ensure compliance before sending to fraud detection service
function sanitizeTransactionData(transaction) {
  // Create a copy to avoid modifying original data
  const sanitizedData = { ...transaction };
  
  // Remove PCI-DSS protected data
  delete sanitizedData.cardNumber;
  delete sanitizedData.cvv;
  
  // Keep only last 4 digits of card for reference
  if (transaction.cardNumber) {
    sanitizedData.cardLastFour = transaction.cardNumber.slice(-4);
  }
  
  // Pseudonymize personal data for GDPR compliance
  if (sanitizedData.customerEmail) {
    sanitizedData.customerEmail = hashPII(sanitizedData.customerEmail);
  }
  
  // Remove other unnecessary PII
  delete sanitizedData.customerDateOfBirth;
  delete sanitizedData.customerSocialSecurity;
  
  return sanitizedData;
}
}`;

export const typescriptExamplesDataTransmission = `
// Configure secure TLS connection for all fraud detection API calls
function configureFraudDetectionClient() {
  const clientConfig = {
    baseUrl: FRAUD_API_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': FRAUD_API_KEY
    },
    // TLS configuration
    tls: {
      minVersion: 'TLSv1.2',
      preferredCipherSuites: [
        'TLS_AES_256_GCM_SHA384',
        'TLS_CHACHA20_POLY1305_SHA256'
      ],
      rejectUnauthorized: true, // Verify server certificate
      // Pin the certificate if possible
      ca: FRAUD_SERVICE_CA_CERT
    }
  };
  
  return clientConfig;
}

// Example secure API call
async function sendFraudDetectionRequest(data) {
  const config = configureFraudDetectionClient();
  const securePayload = prepareSecurePayload(data);
  
  try {
    const response = await apiClient.post('/fraud/check', securePayload, config);
    
    // Verify response integrity
    if (!verifyResponseIntegrity(response.data)) {
      throw new Error('Response integrity check failed');
    }
    
    return response.data;
  } catch (error) {
    logSecurityEvent('fraud_api_error', error);
    throw error;
  }
}`;

export const typescriptExamplesDataIntegrity = `
// Ensure data integrity throughout the pipeline
function prepareSecurePayload(data) {
  // Create payload with original data
  const payload = {
    data: data,
    metadata: {
      timestamp: Date.now(),
      source: 'checkout-service',
      version: '1.2.3'
    }
  };
  
  // Calculate checksum of the data
  payload.integrity = {
    checksum: calculateChecksum(JSON.stringify(data)),
    hashAlgorithm: 'SHA-256'
  };
  
  // Add digital signature
  payload.signature = signPayload(payload, PRIVATE_KEY);
  
  return payload;
}

// Verify data integrity when receiving responses
function verifyResponseIntegrity(response) {
  // Extract the signature and data
  const { signature, ...dataWithoutSignature } = response;
  
  // Verify digital signature
  const isSignatureValid = verifySignature(
    dataWithoutSignature, 
    signature, 
    FRAUD_SERVICE_PUBLIC_KEY
  );
  
  // Verify checksum if present
  let isChecksumValid = true;
  if (response.integrity && response.integrity.checksum) {
    const calculatedChecksum = calculateChecksum(JSON.stringify(response.data));
    isChecksumValid = (calculatedChecksum === response.integrity.checksum);
  }
  
  return isSignatureValid && isChecksumValid;
}`;

export const typescriptExamplesAccessControl = `
// Role-based access control for fraud detection pipeline
function checkAccessPermission(user, action) {
  // Define permission matrix
  const permissions = {
    'fraud_analyst': ['view_reports', 'update_rules', 'review_transactions'],
    'customer_support': ['view_transaction_status', 'initiate_review'],
    'developer': ['view_metrics', 'test_integration'],
    'system': ['send_data', 'receive_results', 'update_model']
  };
  
  // Check if user has permission
  const userRole = user.role;
  if (!permissions[userRole] || !permissions[userRole].includes(action)) {
    logSecurityEvent('unauthorized_access_attempt', {
      user: user.id,
      action,
      timestamp: new Date()
    });
    return false;
  }
  
  return true;
}

// Example usage in pipeline
function processFraudDetectionResult(user, transactionId, action) {
  // Verify user has permission to perform this action
  if (!checkAccessPermission(user, action)) {
    throw new Error('Access denied: Insufficient permissions');
  }
  
  // Proceed with authorized action
  switch (action) {
    case 'review_transactions':
      return getFraudDetails(transactionId);
    case 'update_rules':
      return updateFraudRules(user.id);
    // Other actions...
    default:
      throw new Error('Unknown action');
  }
}`;

export const typescriptExamplesMonitoringDataPipeline = `
// Monitor fraud detection pipeline activities
function monitorFraudDetectionActivity(activity) {
  // Record the activity
  const activityLog = {
    type: activity.type,
    user: activity.userId,
    resource: activity.resource,
    action: activity.action,
    timestamp: new Date(),
    metadata: activity.metadata || {}
  };
  
  // Log activity for audit trail
  logger.info('Fraud detection activity', activityLog);
  
  // Check against suspicious patterns
  const isSuspicious = detectSuspiciousPattern(activityLog);
  if (isSuspicious) {
    // Generate alert for security team
    triggerSecurityAlert('suspicious_fraud_detection_activity', {
      severity: calculateSeverity(activityLog),
      details: activityLog,
      recommendedAction: determineRecommendedAction(activityLog)
    });
  }
  
  // Track metrics
  updateMetrics(activity.type, activity.metadata);
}

// Detect anomalies in fraud detection responses
function monitorFraudResponsePatterns(responses) {
  // Check for unusual patterns in fraud detection responses
  const approvalRate = calculateApprovalRate(responses);
  const averageRiskScore = calculateAverageRiskScore(responses);
  
  // Check if metrics deviate from baseline
  if (Math.abs(approvalRate - BASELINE_APPROVAL_RATE) > THRESHOLD) {
    triggerOperationalAlert('fraud_approval_rate_change', {
      current: approvalRate,
      baseline: BASELINE_APPROVAL_RATE,
      percentChange: ((approvalRate - BASELINE_APPROVAL_RATE) / BASELINE_APPROVAL_RATE) * 100
    });
  }
  
  // Log response pattern metrics
  logger.debug('Fraud detection metrics', {
    timeWindow: '1 hour',
    approvalRate,
    averageRiskScore,
    timestamp: new Date()
  });
}`;

export const cicdExamplesSAST = `
# GitHub Actions workflow for fraud detection service
name: Fraud Detection Security Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  security-scan:
    name: Security Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run security linting
        run: npm run lint:security
      
      - name: Check for secrets
        uses: gitleaks/gitleaks-action@v2

      - name: Run SAST scan
        uses: github/codeql-action/analyze@v2
        with:
          languages: javascript, typescript
          queries: security-extended
          
      - name: Scan dependencies
        run: npm audit --audit-level=high
        
      - name: Run data security tests
        run: npm run test:data-security

  build-deploy:
    name: Build and Deploy
    needs: security-scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build application
        run: npm run build
        
      - name: Run tests
        run: npm test
      
      # Deploy to staging if develop branch
      - name: Deploy to Staging
        if: github.ref == 'refs/heads/develop'
        run: |
          echo "Deploying to staging..."
          # Replace with your actual deployment commands
          npm run deploy:staging
          
      # Deploy to production if main branch
      - name: Deploy to Production
        if: github.ref == 'refs/heads/main'
        run: |
          echo "Deploying to production..."
          # Replace with your actual deployment commands
          npm run deploy:production
      
      # Verify security post-deployment
      - name: Verify security configuration
        run: npm run verify:security`;

export const typescriptExampleBehaviouralAnalysisTransationPatterns = `
// Monitor for unusual transaction patterns
  function monitorTransactionPatterns() {
    // Get recent transactions
    const recentTransactions = getTransactionsFromLastHour();
    
    // Calculate current metrics
    const currentPatterns = {
      volumeByCategory: calculateVolumeByCategory(recentTransactions),
      approvalRateByRegion: calculateApprovalRateByRegion(recentTransactions),
      avgTransactionValue: calculateAvgValue(recentTransactions),
      riskScoreDistribution: calculateRiskDistribution(recentTransactions)
    };
    
    // Compare against established baselines
    const deviations = compareToBaseline(currentPatterns, historicalBaselines);
    const significantDeviations = deviations.filter(d => d.significance > THRESHOLD);
    
    if (significantDeviations.length > 0) {
      triggerBehavioralAlert('Unusual transaction pattern detected', significantDeviations);
    }
  }
`;

export const typescriptExampleBehaviouralAnalysisApiUsage = `// Monitor API usage for potential probing attempts
  function monitorApiUsage() {
    const apiCalls = getRecentApiCalls();
    
    // Group by user/IP
    const callsBySource = groupBySource(apiCalls);
    
    // Analyze each source's behavior
    Object.entries(callsBySource).forEach(([source, calls]) => {
      // Check for parameter fuzzing (many variations of parameters)
      const parameterVariations = calculateParameterVariations(calls);
      
      // Check for systematic testing (sequential pattern of values)
      const hasSequentialPatterns = detectSequentialPatterns(calls);
      
      // Check for unusual API call sequencing
      const hasUnusualSequencing = detectUnusualCallSequence(calls);
      
      if (parameterVariations > PARAM_VARIATION_THRESHOLD || 
          hasSequentialPatterns || 
          hasUnusualSequencing) {
        triggerAlert('Potential API probing detected', {
          source,
          parameterVariations,
          hasSequentialPatterns,
          hasUnusualSequencing
        });
      }
    });
  }`;

export const typescriptExampleModelPerformance = `
  // Monitor for sudden shifts in decision distribution
  function monitorDecisionDistribution() {
    // Get recent decisions
    const recentDecisions = getDecisionsFromLast24Hours();
    
    // Calculate distribution
    const currentDistribution = {
      approveRate: calculateRate(recentDecisions, 'APPROVE'),
      reviewRate: calculateRate(recentDecisions, 'REVIEW'),
      denyRate: calculateRate(recentDecisions, 'DENY')
    };
    
    // Calculate moving average for last 7 days
    const historicalDistribution = getHistoricalDistribution(7);
    
    // Calculate percentage change for each decision type
    const changes = {
      approveChange: percentChange(
        currentDistribution.approveRate, 
        historicalDistribution.approveRate
      ),
      reviewChange: percentChange(
        currentDistribution.reviewRate, 
        historicalDistribution.reviewRate
      ),
      denyChange: percentChange(
        currentDistribution.denyRate, 
        historicalDistribution.denyRate
      )
    };
    
    // Alert if any change exceeds threshold
    if (Math.abs(changes.approveChange) > DISTRIBUTION_THRESHOLD ||
        Math.abs(changes.reviewChange) > DISTRIBUTION_THRESHOLD ||
        Math.abs(changes.denyChange) > DISTRIBUTION_THRESHOLD) {
      triggerModelAlert('Significant shift in fraud decision distribution', {
        currentDistribution,
        historicalDistribution,
        changes
      });
    }
  }`;

export const typescriptExampleAutomatedResponse = `
  // Automated response system
  function automatedResponse(alert) {
    switch (alert.type) {
      case 'API_PROBING_ATTEMPT':
        // Temporarily increase scrutiny for this source
        addToWatchlist(alert.source, 'API_ABUSE', 24); // 24 hour watchlist
        
        // If severe, implement temporary IP block
        if (alert.severity === 'HIGH') {
          temporaryIPBlock(alert.sourceIP, 30); // 30 minute block
        }
        break;
        
      case 'TRANSACTION_PATTERN_ANOMALY':
        // Increase risk score for transactions matching pattern
        adjustRiskFactorForPattern(alert.pattern, 15); // +15 to risk score
        notifyFraudTeam(alert);
        break;
        
      case 'MODEL_DISTRIBUTION_SHIFT':
        // Enable enhanced monitoring mode
        enableEnhancedMonitoring();
        createIncident('FRAUD_MODEL', alert);
        break;
    }
  }`;
