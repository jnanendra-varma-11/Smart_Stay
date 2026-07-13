import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-white">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-500 via-red-500 to-pink-500">
        <div className="mx-auto flex min-h-[90vh] max-w-7xl items-center px-8 py-20">

          <div className="max-w-2xl text-white">

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
              Welcome to SmartStay
            </span>

            <h1 className="mt-6 text-6xl font-extrabold leading-tight">
              Find Your
              <br />
              Perfect Stay
            </h1>

            <p className="mt-6 text-xl leading-8 text-white/90">
              Discover luxury hotels, budget stays, and unforgettable
              experiences across India with SmartStay.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <Link to="/hotels">
                <button className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-rose-600 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  Explore Hotels
                </button>
              </Link>

              <Link to="/register">
                <button className="rounded-full border-2 border-white px-8 py-4 text-lg font-semibold text-white transition duration-300 hover:bg-white hover:text-rose-600">
                  Get Started
                </button>
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* Features */}

      <section className="bg-gray-50 py-24">

        <div className="mx-auto max-w-7xl px-8">

          <div className="mb-16 text-center">

            <h2 className="text-5xl font-bold text-gray-900">
              Why Choose SmartStay?
            </h2>

            <p className="mt-5 text-lg text-gray-600">
              Everything you need for a comfortable and memorable stay.
            </p>

          </div>

          <div className="grid gap-8 md:grid-cols-3">

            <div className="rounded-3xl bg-white p-10 shadow-md transition duration-300 hover:-translate-y-3 hover:shadow-2xl">

              <div className="mb-6 text-6xl">
                🏨
              </div>

              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Premium Hotels
              </h3>

              <p className="leading-7 text-gray-600">
                Carefully selected hotels offering luxury, comfort,
                and exceptional hospitality for every traveler.
              </p>

            </div>

            <div className="rounded-3xl bg-white p-10 shadow-md transition duration-300 hover:-translate-y-3 hover:shadow-2xl">

              <div className="mb-6 text-6xl">
                💰
              </div>

              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Best Prices
              </h3>

              <p className="leading-7 text-gray-600">
                Enjoy affordable prices with exclusive offers and
                transparent booking without hidden charges.
              </p>

            </div>

            <div className="rounded-3xl bg-white p-10 shadow-md transition duration-300 hover:-translate-y-3 hover:shadow-2xl">

              <div className="mb-6 text-6xl">
                ⭐
              </div>

              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Trusted Service
              </h3>

              <p className="leading-7 text-gray-600">
                Thousands of travelers trust SmartStay for reliable
                bookings and unforgettable experiences.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Call To Action */}

      <section className="py-24">

        <div className="mx-auto max-w-6xl rounded-[40px] bg-gradient-to-r from-rose-500 to-red-500 px-10 py-20 text-center text-white shadow-2xl">

          <h2 className="text-5xl font-bold">
            Ready for Your Next Trip?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-white/90">
            Explore beautiful destinations, discover premium hotels,
            and enjoy hassle-free bookings with SmartStay.
          </p>

          <Link to="/hotels">

            <button className="mt-10 rounded-full bg-white px-10 py-4 text-lg font-bold text-rose-600 transition duration-300 hover:scale-105">

              Browse Hotels

            </button>

          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;