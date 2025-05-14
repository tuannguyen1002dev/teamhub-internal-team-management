// app/page.tsx

export default function HomePage() {
  return (
    <main className="items-center justify-center h-screen bg-black-50 flex flex-col space-y-10 ">
      <div id="greeting-placement" className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to
          <span className="opacity-0 ease-in-out animate-pulse transition-opacity duration-300 m-0 p-0"> |</span>
          <span className="text-violet-700">TeamHub</span>
        </h1>
        <p className="text-white/80 text-xl font-bold italic">
          Your internal team management dashboard.
        </p>
      </div>
      <div id="button-placement" className="">
        <button>
          <a href="/auth/login">
            <div className="bg-violet-700 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition duration-500 ease-in-out">
              Login
            </div>
          </a>
        </button>
      </div>
    </main>
  )
}