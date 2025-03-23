import { format } from "date-fns";
import { fetchEnabledQoutes } from "../../actions/qoutes";
import Image from "next/image";
import { Heart } from "lucide-react"; // Use a heart icon from Lucide or any other icon library

export default async function QuotesFeed() {
  const qoutes = await fetchEnabledQoutes();

  // Array of background colors for the cards
  const cardBackgrounds = [
    "bg-gray-800",
    "bg-gray-700",
    "bg-gray-900",
  ];

  return (
    <div className="flex flex-col space-y-4 p-4">
      {qoutes.map((qoute, index) => {
        // Cycle through the background colors
        const bgColor = cardBackgrounds[index % cardBackgrounds.length];

        return (
          <div
            key={qoute.id}
            className={`${bgColor} rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden`}
          >
            {/* Mobile View */}
            <div className="md:hidden">
              {/* Poster with Quote Overlay */}
              <div className="relative h-80">
                {qoute.image && (
                  <Image
                    src={qoute.image}
                    alt={qoute.showTitle}
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                )}

                {/* Quote Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 p-4">
                  <p className="text-2xl font-serif text-white italic text-center">
                    "{qoute.qoutes}"
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
                  {qoute.authorName && (
                    <span className="text-gray-400 text-sm">
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

            {/* Desktop/Tablet View */}
            <div className="hidden md:block p-4">
              {/* Quote */}
              <p className="text-2xl font-serif text-gray-100 italic mb-4">
                "{qoute.qoutes}"
              </p>

              {/* Poster and Details */}
              <div className="flex flex-col md:flex-row md:items-start md:space-x-4">
                {/* Show Poster */}
                {qoute.image && (
                  <div className="flex-shrink-0 w-full md:w-24 lg:w-32">
                    <Image
                      src={qoute.image}
                      alt={qoute.showTitle}
                      width={128}
                      height={192}
                      className="object-cover rounded-lg w-full h-auto"
                    />
                  </div>
                )}

                {/* Show Title, Character Name, Date, and Like Button */}
                <div className="flex-1 flex flex-col space-y-2 mt-4 md:mt-0">
                  {/* Show Title and Created At */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-purple-400">
                      {qoute.showTitle}
                    </h3>
                    <span className="text-sm text-gray-400">
                      {format(new Date(qoute.createdAt), "PP")}
                    </span>
                  </div>

                  {/* Character Name and Likes */}
                  <div className="flex justify-between items-center">
                    <p className="text-purple-400 font-bold">
                      {qoute.characterName}
                    </p>
                    <button className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span>{qoute.totalLikes}</span>
                    </button>
                  </div>

                  {/* Author Name */}
                  {qoute.authorName && (
                    <span className="text-gray-400 text-sm">
                      by {qoute.authorName}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
