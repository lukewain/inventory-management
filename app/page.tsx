import { RecentItems } from "@/app/components/data/recentItems";

export default function Home() {
  return (
    <main>
      {/* 
      TODO: Show recently added items
       */}
      <div className="card w-96 ml-[75px] mt-10" id="recent-items">
        <div className="card-body">
          <h1 className="card-title text-center items-center mx-auto">
            Recently Added
          </h1>
        </div>
        <div className="mb-5 ml-2">
          <RecentItems />
        </div>
      </div>
    </main>
  );
}
