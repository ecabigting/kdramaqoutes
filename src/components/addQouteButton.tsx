"use client"

import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { submitQoute } from "../../actions/qoutes";

export default function AddQuoteButton() {
  const { data: session } = useSession();
  const [isFormVisible, setFormVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!session) return null; // Only show if logged in

  const handleSubmit = async (formData: FormData) => {
    const qoute = formData.get("qoute") as string;
    if (!qoute || qoute.length > 200) {
      setError("Qoute must be less than 200 characters and not empty.")
      return
    }

    startTransition(async () => {
      try {
        await submitQoute(qoute)
        setFormVisible(false)
        setError(null)
      } catch (error) {
        setError(error as string)
      }
    })
  }

  return (
    <>
      {/* Floating Plus Button */}
      <button
        onClick={() => setFormVisible(!isFormVisible)}
        className="fixed top-1/2 right-8 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-600"
      >
        +
      </button>

      {/* Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            {/* Close Button */}
            <button
              onClick={() => setFormVisible(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Form Content */}
            <h2 className="text-xl font-bold mb-4 text-background">KDrama Quote</h2>
            <form
              action={handleSubmit}
            >
              <textarea
                name="qoute"
                disabled={isPending}
                placeholder="Enter your TV quote (max 200 characters)..."
                className="w-full p-2 border rounded mb-4 text-background"
                rows={4}
                maxLength={200} // Limit to 200 characters
                required
              />
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={isPending}
              >
                {isPending ? "Submitting.." : "Submit"}
              </button>
            </form>
          </div>

        </div >
      )
      }
    </>
  );
}
