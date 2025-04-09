export default function DMCAPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-100">
      <h1 className="text-2xl font-bold mb-6">DMCA Copyright Policy</h1>
      <p className="mb-4"><strong>Last Updated: June 19, 2025 </strong></p>

      <div className="mb-8">
        <h2 className="text-xl font-bold mt-6 mb-3">1. Copyright Compliance</h2>
        <p className="mb-4">
          KDramaQuotes ("Service") respects intellectual property rights and complies with the
          Digital Millennium Copyright Act (DMCA) and similar copyright laws worldwide.
          This policy supplements our <a href="/terms" className="text-purple-400">Terms of Service</a>
          &nbsp; and &nbsp;<a href="/privacy" className="text-purple-400">Privacy Policy</a> regarding user contributions.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mt-6 mb-3">2. Copyright Infringement Notifications</h2>
        <p className="mb-4">
          To file a DMCA notice, send written communication to our designated agent containing:
        </p>
        <ul className="list-disc list-inside mb-4 pl-5">
          <li>Physical or electronic signature of rights holder or authorized agent</li>
          <li>Identification of the copyrighted work claimed to be infringed</li>
          <li>URL of the allegedly infringing material on our Service</li>
          <li>Contact information including address, telephone, and email</li>
          <li>Statement of good faith belief that use is unauthorized</li>
          <li>Statement under penalty of perjury that information is accurate</li>
        </ul>
        <p className="mb-4">
          Submit notices to:<br />
          <strong>Copyright Agent</strong><br />
          Eric Cabigting<br />
          Email: kdramaqoutes dot com at gmail dot com
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mt-6 mb-3">3. Counter-Notification Process</h2>
        <p className="mb-4">
          If you believe your content was wrongly removed, you may submit a counter-notice containing:
        </p>
        <ul className="list-disc list-inside mb-4 pl-5">
          <li>Your physical or electronic signature</li>
          <li>Identification of removed content and its former location</li>
          <li>Statement under penalty of perjury of good faith belief of mistaken removal</li>
          <li>Your name, address, and consent to local federal court jurisdiction</li>
        </ul>
        <p className="mb-4">
          We will forward counter-notices to the original complainant and may restore content within
          10-14 business days unless we receive notice of court action.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mt-6 mb-3">4. Repeat Infringer Policy</h2>
        <p className="mb-4">
          Consistent with our <a href="/terms" className="text-purple-400">Terms of Service</a>,
          we terminate accounts of repeat infringers in appropriate circumstances.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mt-6 mb-3">5. International Copyright Compliance</h2>
        <p className="mb-4">
          For non-US jurisdictions, we comply with equivalent processes under:
        </p>
        <ul className="list-disc list-inside mb-4 pl-5">
          <li>EU Copyright Directive (Article 17)</li>
          <li>UK Copyright, Designs and Patents Act 1988</li>
          <li>Other applicable laws based on complainant jurisdiction</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mt-6 mb-3">6. Data Processing for Copyright Claims</h2>
        <p className="mb-4">
          As detailed in our <a href="/privacy" className="text-purple-400">Privacy Policy</a>,
          we process infringement notices in accordance with GDPR requirements:
        </p>
        <ul className="list-disc list-inside mb-4 pl-5">
          <li>Notice metadata retained for 3 years for legal compliance</li>
          <li>Redaction of personal data when publishing takedown notices</li>
          <li>Secure storage of sensitive claimant information</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mt-6 mb-3">7. Modification Policy</h2>
        <p className="mb-4">
          We may update this DMCA policy with changes reflected in the "Last Updated" date.
          Continued use constitutes acceptance of revisions.
        </p>
      </div>
    </div>
  );
}
