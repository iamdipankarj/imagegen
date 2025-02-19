export default function NotFound() {
  return (
    <section className="pt-28 pb-32 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <h2 className="text-6xl md:text-9xl text-red-500 text-center font-bold font-heading transform -rotate-3 tracking-px-2n">
          oops!
        </h2>
        <h3 className="my-5 text-2xl text-center font-semibold font-heading leading-tight">
          Page not found
        </h3>
        <p className="mb-10 text-xl text-gray-700 text-center font-medium leading-relaxed md:max-w-md mx-auto">
          Sorry, but the requested page is not found. You might try a search below.
        </p>
        <div className="relative md:max-w-xl mx-auto">
          <svg
            className="absolute top-1/2 left-4 transform -translate-y-1/2"
            width={20}
            height={21}
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 18.0923L12.5 13.0923M14.1667 8.92562C14.1667 12.1473 11.555 14.759 8.33333 14.759C5.11167 14.759 2.5 12.1473 2.5 8.92562C2.5 5.70396 5.11167 3.09229 8.33333 3.09229C11.555 3.09229 14.1667 5.70396 14.1667 8.92562Z"
              stroke="#9CA3AF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            className="pl-12 pr-4 py-3 w-full text-gray-500 font-medium placeholder-gray-500 outline-none border-b border-gray-300 focus:ring focus:ring-indigo-300"
            id="httpCodeInput5-1"
            type="text"
            placeholder="Type to search"
          />
        </div>
      </div>
    </section>
  )
}