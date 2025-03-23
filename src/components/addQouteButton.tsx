"use client"

import { useState, useTransition, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { submitQoute } from "../../actions/qoutes";
import { fetchCharacters, fetchShows } from "../../data/tvdb";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";

export default function AddQuoteButton() {
  const { data: session } = useSession();
  const [isFormVisible, setFormVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tvShowsLoading, setTvShowsLoading] = useState(false);
  const [charactersLoading, setCharactersLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Form Inputs States
  const [showTitle, setShowTitle] = useState("")
  const [characterName, setCharacterName] = useState("")
  const [qoute, setQoute] = useState("")
  const [showImage, setShowImage] = useState("")

  // Search input States
  const [tvShows, setTvShows] = useState<any[]>([]);
  const [characters, setCharacters] = useState<any[]>([]);
  const [selectedTvShow, setSelectedTvShow] = useState<any>(null);

  // Debounced search queries
  const debouncedShowTitle = useDebounce(showTitle, 1500); // 1.5 seconds
  const debouncedCharacterName = useDebounce(characterName, 1500); // 1.5 seconds

  // Memoized handleCharacterSearch
  const handleCharacterSearch = useCallback(
    async (query: string) => {
      try {
        const characters = await fetchCharacters(selectedTvShow.id.split("-")[1], query);
        setCharacters(characters);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch characters.");
      }
    },
    [selectedTvShow]
  );

  // Fetch TV shows when debouncedShowTitle changes, but only if no show is selected
  useEffect(() => {
    if (selectedTvShow) return;

    let isActive = true; // Prevent state updates on unmounted component

    const searchTvShows = async () => {
      if (isActive) setTvShowsLoading(true);
      if (debouncedShowTitle.length >= 3) {
        try {
          const shows = await fetchShows(debouncedShowTitle);
          if (isActive) {
            setTvShows(shows);
            setTvShowsLoading(false);
          }
        } catch (error) {
          console.log(error);
          if (isActive) {
            setError("Failed to fetch TV shows.");
            setTvShowsLoading(false);
          }
        }
      } else {
        if (isActive) {
          setTvShows([]);
          setTvShowsLoading(false);
        }
      }
    };

    searchTvShows();

    return () => {
      isActive = false;
    };
  }, [debouncedShowTitle, selectedTvShow]);


  // Fetch characters when debouncedCharacterName changes
  useEffect(() => {
    let isActive = true;

    const searchCharacters = async () => {
      if (isActive) setCharactersLoading(true);
      if (selectedTvShow && debouncedCharacterName.length >= 3) {
        try {
          const characters = await fetchCharacters(selectedTvShow.id.split("-")[1], debouncedCharacterName);
          if (isActive) {
            setCharacters(characters);
            setCharactersLoading(false);
          }
        } catch (error) {
          console.log(error);
          if (isActive) {
            setError("Failed to fetch characters.");
            setCharactersLoading(false);
          }
        }
      } else {
        if (isActive) {
          setCharacters([]);
          setCharactersLoading(false);
        }
      }
    };

    searchCharacters();

    return () => {
      isActive = false;
    };
  }, [debouncedCharacterName, selectedTvShow, handleCharacterSearch]);


  if (!session) return null; // Only show if logged in

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!qoute || qoute.length > 200) {
      setError("Qoute must be less than 200 characters and not empty.")
      return
    }

    if (!showTitle || !characterName) {
      setError("Select a Title and Character")
      return
    }

    startTransition(async () => {
      try {
        await submitQoute({ qoute, showTitle, characterName, showImage })

        // Clear the form after successful submission
        setShowTitle("");
        setCharacterName("");
        setQoute("");
        setTvShows([]);
        setCharacters([]);
        setSelectedTvShow(null);
        setFormVisible(false);
        setError(null);

      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred.");
      }
    })
  }

  return (
    <>
      {/* Floating Plus Button */}
      <button
        onClick={() => setFormVisible(!isFormVisible)}
        className="fixed top-1/2 right-8 transform -translate-y-1/2 bg-purple-800 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-purple-700"
      >
        +
      </button>

      {/* Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 relative">
            {/* Close Button */}
            <button
              onClick={() => setFormVisible(false)}
              className="absolute top-2 right-2 text-gray-300 hover:text-purple-400"
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
            <h2 className="text-xl font-bold mb-4 text-purple-400">Add A Quote</h2>
            <form
              onSubmit={handleSubmit}
            >
              {/* TV Show Search */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search TV Show"
                    className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
                    value={showTitle}
                    onChange={(e) => {
                      setShowTitle(e.target.value);
                      // If user types after selecting a show, reset selection
                      if (selectedTvShow) setSelectedTvShow(null);
                    }}
                    disabled={isPending}
                  />
                </div>
                {tvShows.length > 0 || tvShowsLoading ? (
                  <ul
                    className="absolute mt-1 z-10 bg-gray-700 border border-gray-600 rounded shadow-lg p-1 w-[90%] text-white"
                  >
                    {tvShowsLoading ? (
                      <li
                        className="p-2 text-center text-gray-300"
                      >Fetching shows...</li>
                    ) : (
                      tvShows.map((show) => (
                        <li
                          key={show.id}
                          className="p-2 hover:bg-gray-600 cursor-pointer text-white transition-colors"
                          onClick={() => {
                            setSelectedTvShow(show);
                            const showTitleWithYear = `${show.translations.eng} (${show.year}) `;
                            setShowTitle(showTitleWithYear);
                            setShowImage(show.image_url);
                            setTvShows([]); // Clear the dropdown
                          }}
                        >
                          <div className="flex items-center justify-start">
                            <Image
                              src={show.image_url}
                              className="rounded-sm"
                              alt={show.translations.eng}
                              width={50}
                              height={100}
                            />
                            <p className="ml-2">
                              {show.translations.eng} ({show.year})
                            </p>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                ) : null}

              </div>

              {/* Character Search */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search Character"
                    className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
                    value={characterName}
                    onChange={(e) => {
                      setCharacterName(e.target.value);
                    }}
                    disabled={!selectedTvShow || isPending}
                  />
                </div>
                {characters.length > 0 || charactersLoading ? (
                  <ul
                    className="absolute mt-1 z-10 bg-gray-700 border border-gray-600 rounded shadow-lg p-1 w-[90%] text-white"
                  >
                    {charactersLoading ? (
                      <li
                        className="p-2 text-center text-gray-300"
                      >Loading...</li>
                    ) : (
                      characters.map((character) => (
                        <li
                          key={character.id}
                          className="p-2 hover:bg-gray-600 cursor-pointer text-white transition-colors"
                          onClick={() => {
                            const fullCharName = `${character.name} (${character.personName})`;
                            setCharacterName(fullCharName);
                            setCharacters([]); // Clear the dropdown
                          }}
                        >
                          <div className="flex items-center justify-start">
                            <Image
                              src={character.image}
                              className="rounded-full w-10 h-10 object-cover border border-purple-400"
                              alt={character.name}
                              width={25}
                              height={25}
                            />
                            <p className="ml-3">
                              {character.name} ({character.personName})
                            </p>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                ) : null}
              </div>

              {/* Quote Textarea */}
              <textarea
                name="qoute"
                disabled={isPending}
                placeholder="Enter your TV quote (max 200 characters)..."
                className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
                rows={4}
                maxLength={200} // Limit to 200 characters
                required
                onChange={(e) => setQoute(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
                type="submit"
                className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-700"
                disabled={isPending}
              >
                {isPending ? "Adding.." : "Add"}
              </button>
            </form>
          </div>

        </div >
      )
      }
    </>
  );
}
