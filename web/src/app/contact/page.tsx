export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

      <div className="space-y-6 max-w-2xl">
        <p>
          Have questions or want to share your favorite K-Drama moments?
          We’re all ears (and big fans too!).
        </p>

        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
          <h2 className="font-bold text-lg mb-3">Reach Out Safely</h2>
          <p className="mb-2">Email us at: kdramaqoutes dot com at gmail dot com</p>
        </div>

        <div className="text-sm text-gray-400 border-t border-gray-700 pt-6">
          <p>⏳ Response time: 2-3 business days</p>
          <p>For copyright issues, please use our <a href="/dmca" className="text-purple-400">DMCA process</a></p>
        </div>
      </div>
    </div>
  );
}
