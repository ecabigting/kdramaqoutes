import QuotesFeed from "@/components/qoutesFeed";


export default async function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      <main className="max-w-2xl mx-auto p-4">
        <QuotesFeed />
      </main>
    </div>
  );
}
