"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function AddQuoteButton() {
  const { data: session } = useSession();
  const [isFormVisible, setFormVisible] = useState(false);

  if (!session) return null; // Only show if logged in

  return (
    <>
      {/* Floating Plus Button */}
      <button
        onClick={() => setFormVisible(!isFormVisible)}
        className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-600"
      >
        +
      </button>

      {/* Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add TV Quote</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Handle form submission
                setFormVisible(false);
              }}
            >
              <textarea
                placeholder="Enter your TV quote..."
                className="w-full p-2 border rounded mb-4"
                rows={4}
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
