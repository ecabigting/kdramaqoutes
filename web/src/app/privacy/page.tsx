export default async function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4"><strong>Effective Date: June 19, 2025</strong></p>

      <div className="mb-8">
        <h2 className="text-xl font-bold mt-6 mb-3">1. Scope and Application</h2>
        <p className="mb-4">
          This Privacy Policy governs the collection, processing, and protection of personal data for users of KDramaQuotes ("Service"),
          in compliance with the General Data Protection Regulation (GDPR) for European Economic Area (EEA) users and other applicable
          data protection laws based on user jurisdiction.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mt-6 mb-3">2. Data Controller Information</h2>
        <p className="mb-4">
          The data controller for information collected through this Service is:
          <br />
          Eric Cabigting
          <br />
          Email: kdramaqoutes dot com at gmail dot com
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mt-6 mb-3">3. Data Collection and Use</h2>
        <h3 className="font-bold mb-2">A. User Contributions</h3>
        <p className="mb-4">
          When submitting quotes, text, or other content ("Contributions"):
          <ul className="list-disc list-inside mb-4 pl-5">
            <li>We collect submitted content, associated metadata, and timestamps</li>
            <li>IP addresses are logged for copyright protection purposes</li>
            <li>User account information is linked to contributions</li>
          </ul>
          <strong>Legal Basis:</strong> Article 6(1)(b) GDPR (performance of contract) for registered users;
          Article 6(1)(f) GDPR (legitimate interests) for public content preservation.
        </p>
        <div className="mb-8">
          <h3 className="font-bold mb-2 mt-4">B. Analytics and Tracking</h3>
          <div className="mb-4">
            We employ the following tracking measures:
            <ul className="list-disc list-inside mb-4 pl-5">
              <li>First-party cookies for essential functionality</li>
              <li>Anonymized Google Analytics tracking (IP masking enabled)</li>
              <li>Performance monitoring through [Service Name]</li>
            </ul>
          </div>

          <div className="mb-4">
            <strong>Data Collected:</strong>
            <ul className="list-disc list-inside mb-4 pl-5">
              <li>Device characteristics (browser, OS, screen resolution)</li>
              <li>Usage patterns (pages visited, interaction metrics)</li>
              <li>Network information (ISP, approximate location)</li>
            </ul>
          </div>

          <div className="mb-4">
            <strong>Legal Basis:</strong>
            <ul className="list-disc list-inside pl-5">
              <li>Article 6(1)(a) GDPR (consent) for non-essential tracking</li>
              <li>Article 6(1)(f) GDPR (legitimate interests) for service optimization</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mt-6 mb-3">4. Data Retention</h2>
        <ul className="list-disc list-inside mb-4 pl-5">
          <li>User contributions: Retained until deletion request or 5 years post-account termination</li>
          <li>Analytics data: Anonymized after 14 months</li>
          <li>Server logs: Retained for 30 days</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mt-6 mb-3">5. International Data Transfers</h2>
        <p className="mb-4">
          Data may be transferred outside your jurisdiction with appropriate safeguards:
          <ul className="list-disc list-inside mb-4 pl-5">
            <li>EEA transfers: Standard Contractual Clauses (SCCs)</li>
            <li>UK transfers: International Data Transfer Addendum</li>
            <li>Other regions: Adequacy decisions or explicit consent</li>
          </ul>
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mt-6 mb-3">6. Your Rights</h2>
        <p className="mb-4">
          Under applicable data protection laws:
          <ul className="list-disc list-inside mb-4 pl-5">
            <li>Access and portability (Article 15 GDPR)</li>
            <li>Rectification (Article 16 GDPR)</li>
            <li>Erasure ("Right to be Forgotten", Article 17 GDPR)</li>
            <li>Restriction of processing (Article 18 GDPR)</li>
            <li>Object to processing (Article 21 GDPR)</li>
            <li>Withdraw consent (Article 7(3) GDPR)</li>
          </ul>
          Submit requests to: kdramaqoutes dot com at gmail dot com
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mt-6 mb-3">7. Security Measures</h2>
        <ul className="list-disc list-inside mb-4 pl-5">
          <li>AES-256 encryption for data at rest</li>
          <li>TLS 1.3 for data in transit</li>
          <li>Regular security audits and penetration testing</li>
          <li>Role-based access controls with MFA</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mt-6 mb-3">8. Third-Party Processors</h2>
        <p className="mb-4">
          We engage these GDPR-compliant processors:
          <ul className="list-disc list-inside mb-4 pl-5">
            <li>Hosting Provider: [Name] (Data Processing Agreement in place)</li>
            <li>Analytics: Google LLC (GA4 with IP anonymization)</li>
            <li>Content Delivery: Cloudflare, Inc.</li>
          </ul>
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mt-6 mb-3">9. Policy Updates</h2>
        <p className="mb-4">
          Material changes will be notified 30 days in advance via registered email.
          Continued use after effective date constitutes acceptance.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mt-6 mb-3">10. Regulatory Compliance</h2>
        <p className="mb-4">
          We cooperate with data protection authorities (DPAs) in these jurisdictions:
          <ul className="list-disc list-inside mb-4 pl-5">
            <li>EEA: Lead supervisory authority is [Country] DPA</li>
            <li>UK: Information Commissioner's Office (ICO)</li>
            <li>California: CCPA compliance through opt-out mechanisms</li>
          </ul>
        </p>
      </div>
    </div>
  );
}
