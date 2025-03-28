import { format } from "date-fns";
import { Heart } from "lucide-react"; // Use a heart icon from Lucide or any other icon library
import Image from "next/image";
import { fetchEnabledQoutes } from "../../actions/qoutes";
import { dismissDisplayNamePrompt, getCurrentUser } from "../../actions/user";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function QuotesFeed() {
  const qoutes = await fetchEnabledQoutes();
  const user = await getCurrentUser();

  // Array of background colors for the cards
  const cardBackgrounds = [
    "bg-gray-800",
    "bg-gray-700",
    "bg-gray-900",
  ];

  const handleDismiss = async () => {
    'use server';
    await dismissDisplayNamePrompt();
    redirect("/");
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      {/* Welcome Message */}
      {user && !user.displayNameChanged && (
        <div className="bg-purple-700 text-white p-4 rounded-lg flex flex-col space-y-2">
          <p className="text-white">
            Welcome! We&apos;ve set your display name to <span className="font-bold">{user.displayName}</span>.
          </p>
          <div className="flex space-x-2 justify-end font-bold">
            <Link href="/settings" className=" hover:underline">
              Change it?
            </Link>
            <form action={handleDismiss}>
              <button
                type="submit"
                className=" hover:underline"
              >
                Dismiss
              </button>
            </form>
          </div>
        </div>
      )}
      {qoutes.map((qoute, index) => {
        // Cycle through the background colors
        const bgColor = cardBackgrounds[index % cardBackgrounds.length];
        const authorName = qoute.user?.displayName?.trim() || "kdramanoobie";

        return (
          <div
            key={qoute.id}
            className={`${bgColor} rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden`}
          >
            {/* Mobile View (unchanged) */}
            <div className="md:hidden">
              {/* Poster with Quote Overlay */}
              <div className="relative h-80">
                {qoute.image && (
                  <Image
                    src={qoute.image}
                    alt={qoute.showTitle}
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover object-bottom"
                  />
                )}

                {/* Quote Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 p-4">
                  <p className="text-2xl font-serif text-white italic text-center">
                    {`"${qoute.qoutes}"`}
                  </p>
                </div>
              </div>

              {/* Details Below Poster */}
              <div className="p-4">
                {/* Show Title and Created At */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-purple-400">
                    {qoute.showTitle}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {format(new Date(qoute.createdAt), "PP")}
                  </span>
                </div>

                {/* Character Name */}
                <p className="text-purple-400 font-bold mt-2">
                  {qoute.characterName}
                </p>

                {/* Author Name and Likes */}
                <div className="flex justify-between items-center mt-2">
                  {authorName && (
                    <span className="text-gray-400 text-sm">
                      by {authorName}
                    </span>
                  )}
                  <button className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>{qoute.totalLikes}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop/Tablet View */}
            <div className="hidden md:flex p-4">
              {/* Poster (Full Height) */}
              {qoute.image && (
                <div className="flex-shrink-0 w-1/3 lg:w-1/4">
                  <Image
                    src={qoute.image}
                    alt={qoute.showTitle}
                    width={200}
                    height={300}
                    className="object-cover rounded-lg h-full w-full"
                  />
                </div>
              )}

              {/* Quote and Details */}
              <div className="flex-1 flex flex-col pl-4">
                {/* Quote */}
                <p className="text-2xl font-serif text-gray-100 italic mb-4">
                  {`"${qoute.qoutes}"`}
                </p>

                {/* Show Title and Created At */}
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-purple-400">
                    {qoute.showTitle}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {format(new Date(qoute.createdAt), "PP")}
                  </span>
                </div>

                {/* Character Name */}
                <p className="text-purple-400 font-bold mt-2">
                  {qoute.characterName}
                </p>

                {/* Author Name and Likes */}
                <div className="flex justify-between items-center mt-2">
                  {authorName && (
                    <span className="text-gray-400 text-xs">
                      by {qoute.authorName}
                    </span>
                  )}
                  <button className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>{qoute.totalLikes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
