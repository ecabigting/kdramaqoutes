"use server"

const apiKey = process.env.TVDB_API_KEY
const apiURL = process.env.TVDB_BASE_URL
let token: string | null;

async function getToken() {

  if (token) return token;

  const response = await fetch(`${apiURL}/login`, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      apikey: apiKey,
    })
  })
  const data = await response.json();
  token = data.data.token;
  return token
}

export async function searchShow(query: string) {
  const token = await getToken();
  const response = await fetch(`${apiURL}/search?query=${encodeURIComponent(query)}&country=kor&language=kor&limit=10`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch show data.")
  }

  const data = await response.json();
  return data.data || [];
}


export async function searchCharacter(seriesId: string, query: string) {
  const token = await getToken();
  console.log(`serach character with seriesid: ${seriesId} and query string: ${query}`)
  const response = await fetch(`${apiURL}/series/${seriesId}/extended`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

  console.log(`character data of ${seriesId}:`, response)
  if (!response.ok) {
    throw new Error("Failed to fetch characters.")
  }

  const data = await response.json();

  const characters = data.data.characters || [];
  return characters.filter((character: any) =>
    character.name.toLowerCase().includes(query.toLocaleLowerCase())
  );
}
