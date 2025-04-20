import { typescriptExampleJWT, typescriptExampleAPIKey } from "../../../code";
import CodeBlock from "../../codeBlock";

export const AuthenticationAuthorisation = () => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-6">
          Authentication and Authorisation
        </h1>
        <p className="mb-4">
          There are several ways to implement authentication and authorisation
          in e-commerce applications, including:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>User registration and login</li>
          <li>OAuth 2.0</li>
          <li>JWT (JSON Web Tokens)</li>
          <li>API keys</li>
        </ul>
        <p className="mb-4">
          Each of these methods has its own advantages and disadvantages, and
          the choice of authentication mechanism depends on factors such as the
          application's requirements, the level of security required, and the
          user experience desired.
        </p>
        <p className="mb-4">
          Sometimes the best approach is to combine multiple methods, such as a
          hybrid approach that combines user registration and login with OAuth
          2.0 for authorisation. This approach provides a balance between ease
          of use and security, as users can create an account and authenticate
          with their credentials, while also granting access to specific
          resources based on their roles and permissions.
        </p>
        <h3 className="text-xl font-bold mt-6 mb-3">JWT (JSON Web Tokens):</h3>
        <p className="mb-4">
          JWT is a widely used authentication mechanism for APIs, offering
          stateless, self-contained tokens that can be easily verified and
          decoded. The token contains claims about the user, including their
          identity and role, and can be used to authorise access to protected
          resources.
        </p>
        <div className="bg-gray-100 p-4 rounded mb-6">
          <CodeBlock code={typescriptExampleJWT} />
        </div>
        <p className="mb-4">
          There are different libraries available for implementing JWT in
          Node.js, such as{" "}
          <a
            href="https://www.npmjs.com/package/jsonwebtoken"
            className="text-blue-600 underline"
          >
            jsonwebtoken
          </a>{" "}
          and{" "}
          <a
            href="https://www.npmjs.com/package/jwt"
            className="text-blue-600 underline"
          >
            jwt
          </a>
          . The choice of library depends on factors such as the desired level
          of security, compatibility with the target platform, and the specific
          requirements of the application.
        </p>
        <h3 className="text-xl font-bold mt-6 mb-3">
          API Key Authentication for Fraud Service Integration:
        </h3>
        <p className="mb-4">
          API key authentication is a simple and straightforward approach for
          fraud service integration. The client application includes an API key
          in the request headers, which is then verified by the fraud detection
          service. This approach is easy to implement and provides a high level
          of security, as the API key is not stored in the database and cannot
          be easily compromised.
        </p>
        <div className="bg-gray-100 p-4 rounded mb-6">
          <CodeBlock code={typescriptExampleAPIKey} />
        </div>
        <h3 className="text-xl font-bold mt-6 mb-3">
          OAuth 2.0 for Authorisation:
        </h3>
        <p className="mb-4">
          OAuth 2.0 is an industry-standard authorisation protocol that enables
          secure, delegated access to protected resources. It provides a
          framework for third-party applications to obtain limited access to a
          user's account on another service without exposing credentials.
        </p>
        <p className="mb-4">
          In e-commerce fraud detection integration, OAuth 2.0 is valuable for
          securely authorising access to transaction data while maintaining
          strict control over permissions and scopes. It supports various
          authorisation flows including Authorisation Code, Client Credentials,
          and Implicit flows, each suited to different scenarios.
        </p>
        <p className="mb-4">
          For social login integration, OAuth 2.0 allows users to authenticate
          using existing accounts like Google, Facebook, or GitHub, which can
          provide valuable identity verification signals for fraud detection.
        </p>
        <p className="mb-4">
          Several OAuth 2.0 libraries are available for Node.js implementation:{" "}
          <a
            href="https://www.npmjs.com/package/passport-oauth2"
            className="text-blue-600 underline"
          >
            passport-oauth2
          </a>{" "}
          (ideal for Express applications with multiple authentication
          strategies),{" "}
          <a
            href="https://www.npmjs.com/package/oauth"
            className="text-blue-600 underline"
          >
            oauth
          </a>{" "}
          (a lower-level implementation offering more control), and{" "}
          <a
            href="https://www.npmjs.com/package/oauth2-server"
            className="text-blue-600 underline"
          >
            oauth2-server
          </a>{" "}
          (for implementing your own OAuth 2.0 provider). The choice depends on
          your security requirements, platform compatibility, and specific
          implementation needs.
        </p>
      </div>
    </>
  );
};
