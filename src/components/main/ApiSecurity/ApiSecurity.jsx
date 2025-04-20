import { AuthenticationAuthorisation } from "./AuthenticationAuthorisation";
import { RateLimiting } from "./RateLimiting";
import { ResponseHdnling } from "./ResponseHandling";

export const ApiSecurity = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">API Security</h1>
      <p className="mb-4">
        API security is a critical component of any e-commerce application, as
        it ensures that only authorised users can access and manipulate
        sensitive data. By implementing robust API security measures, e-commerce
        platforms can protect their customers' information and prevent
        fraudulent activities.
      </p>
      <p className="mb-4">
        Here are some of the key aspects of API security that e-commerce
        platforms should consider:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Authentication and authorisation</li>
        <li>Rate limiting</li>
        <li>Response handling</li>
      </ul>
      <AuthenticationAuthorisation />
      <RateLimiting />
      <ResponseHdnling />
    </div>
  );
};
