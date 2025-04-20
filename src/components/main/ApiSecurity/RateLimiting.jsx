import {
  typescriptExampleRateLimiting,
  typescriptExampleCaptcha,
  typescriptExampleDDoS,
  typescriptExampleBrowserFingerprinting,
} from "../../../code";
import CodeBlock from "../../codeBlock";

export const RateLimiting = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mt-6 mb-3">
        Rate Limiting for API Protection:
      </h1>
      <p className="mb-4">
        Rate limiting is an essential security measure that restricts the number
        of requests a client can make to an API within a specific time window.
        In the context of fraud detection integration, rate limiting serves
        multiple critical purposes: it prevents abuse, mitigates DDoS attacks,
        and protects against automated probing of fraud detection systems.
      </p>
      <p className="mb-4">
        Implementing tiered rate limiting based on client type provides a
        balance between security and accessibility. For example, legitimate
        high-volume merchants may require higher limits than occasional users,
        while suspicious activity can trigger more restrictive limits.
      </p>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <CodeBlock code={typescriptExampleRateLimiting} />
      </div>
      <p className="mb-4">
        Several efficient rate limiting libraries are available for Node.js
        applications:{" "}
        <a
          href="https://www.npmjs.com/package/express-rate-limit"
          className="text-blue-600 underline"
        >
          express-rate-limit
        </a>{" "}
        (straightforward implementation for Express applications),{" "}
        <a
          href="https://www.npmjs.com/package/rate-limiter-flexible"
          className="text-blue-600 underline"
        >
          rate-limiter-flexible
        </a>{" "}
        (offers advanced features and multiple storage options), and{" "}
        <a
          href="https://www.npmjs.com/package/@nestjs/throttler"
          className="text-blue-600 underline"
        >
          @nestjs/throttler
        </a>{" "}
        (designed for NestJS applications). For distributed systems,
        Redis-backed implementations are strongly recommended to ensure
        consistent rate limiting across multiple servers.
      </p>
      <p className="mb-4">
        A robust implementation should include proper response headers
        (Retry-After, X-RateLimit-Limit, X-RateLimit-Remaining) to help
        legitimate clients adjust their request patterns, along with clear error
        messages that provide guidance on when to retry requests.
      </p>
      <h3 className="text-xl font-bold mt-6 mb-3">
        Additional Security Measures for E-Commerce
      </h3>
      <p className="mb-4">
        While authentication, authorization, and rate limiting form the
        foundation of API security, e-commerce platforms should implement
        additional specialized protections against automated threats and
        targeted attacks.
      </p>

      <h4 className="text-lg font-semibold mt-4 mb-2">
        CAPTCHA Implementation
      </h4>
      <p className="mb-4">
        CAPTCHA (Completely Automated Public Turing test to tell Computers and
        Humans Apart) mechanisms provide an effective defense against automated
        bots attempting account creation, credential stuffing, or checkout
        abuse. Modern CAPTCHA solutions offer improved user experience while
        maintaining strong security.
      </p>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <CodeBlock code={typescriptExampleCaptcha} />
      </div>
      <p className="mb-4">
        Popular CAPTCHA solutions include{" "}
        <a
          href="https://www.google.com/recaptcha/about/"
          className="text-blue-600 underline"
        >
          Google reCAPTCHA
        </a>{" "}
        (offering invisible verification with risk-based challenges),{" "}
        <a href="https://www.hcaptcha.com/" className="text-blue-600 underline">
          hCaptcha
        </a>{" "}
        (privacy-focused alternative), and{" "}
        <a
          href="https://www.cloudflare.com/products/turnstile/"
          className="text-blue-600 underline"
        >
          Cloudflare Turnstile
        </a>{" "}
        (leveraging Cloudflare's threat intelligence). For maximum
        effectiveness, implement CAPTCHA at registration, login, and checkout
        points with risk-based triggering to minimize impact on legitimate
        users.
      </p>

      <h4 className="text-lg font-semibold mt-4 mb-2">DDoS Protection</h4>
      <p className="mb-4">
        Distributed Denial of Service (DDoS) attacks can overwhelm e-commerce
        platforms, disrupting service and creating opportunities for fraud. DDoS
        protection should be implemented at multiple layers:
      </p>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <CodeBlock code={typescriptExampleDDoS} />
      </div>
      <p className="mb-4">
        For comprehensive DDoS protection, consider these multi-layered
        approaches:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-1">
          <span className="font-semibold">Edge Protection:</span> Utilize
          cloud-based services like{" "}
          <a
            href="https://www.cloudflare.com/"
            className="text-blue-600 underline"
          >
            Cloudflare
          </a>
          ,{" "}
          <a
            href="https://aws.amazon.com/shield/"
            className="text-blue-600 underline"
          >
            AWS Shield
          </a>
          , or{" "}
          <a
            href="https://cloud.google.com/armor"
            className="text-blue-600 underline"
          >
            Google Cloud Armor
          </a>{" "}
          to filter malicious traffic before it reaches your infrastructure.
        </li>
        <li className="mb-1">
          <span className="font-semibold">Application-Layer Protection:</span>{" "}
          Implement rate limiting, request filtering, and traffic analysis at
          the application level to identify and mitigate layer 7 attacks.
        </li>
        <li className="mb-1">
          <span className="font-semibold">Traffic Monitoring:</span> Deploy
          real-time monitoring tools that can detect unusual traffic patterns
          and trigger automated mitigation responses.
        </li>
        <li className="mb-1">
          <span className="font-semibold">Scaling Infrastructure:</span> Use
          auto-scaling capabilities to handle traffic spikes, either legitimate
          or malicious, ensuring service availability.
        </li>
      </ul>

      <h4 className="text-lg font-semibold mt-4 mb-2">
        Browser Fingerprinting
      </h4>
      <p className="mb-4">
        Browser fingerprinting creates a unique identifier based on device and
        browser characteristics, helping identify suspicious clients even when
        they change IP addresses or clear cookies.
      </p>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <CodeBlock code={typescriptExampleBrowserFingerprinting} />
      </div>
      <p className="mb-4">
        When implementing browser fingerprinting, balance security with privacy
        considerations. Use fingerprinting data primarily for fraud detection
        rather than tracking, and ensure compliance with privacy regulations
        like GDPR by providing appropriate user notifications and data handling
        policies.
      </p>

      <p className="mb-4">
        By combining these additional security measures with core API security
        practices, e-commerce platforms can establish robust protection against
        a wide range of threats, from automated bots to sophisticated fraud
        attempts, while maintaining a positive user experience for legitimate
        customers.
      </p>
    </div>
  );
};
