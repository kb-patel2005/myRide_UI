import React from 'react'

export default function About() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-purple-50 to-white max-w-[1080px] m-auto mt-[7vh]'>
      {/* Hero Section */}
      <div className='bg-purple-400 text-white py-12 sm:py-20 px-4 rounded-t-2xl shadow-lg shadow-purple-300'>
        <div className='max-w-5xl mx-auto text-center'>
          <h1 className='text-3xl sm:text-5xl font-bold mb-4'>About enjoyRide</h1>
          <p className='text-lg sm:text-xl text-purple-100'>Your trusted partner for safe, affordable, and reliable rides</p>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-5xl mx-auto px-4 py-12 sm:py-20'>
        {/* Our Mission */}
        <section className='mb-16'>
          <h2 className='text-3xl font-bold text-purple-600 mb-6'>Our Mission</h2>
          <p className='text-gray-700 text-lg leading-relaxed mb-4'>
            enjoyRide is committed to revolutionizing urban transportation by providing safe, convenient, and affordable ride-sharing solutions. We believe that mobility should be accessible to everyone, everywhere.
          </p>
          <p className='text-gray-700 text-lg leading-relaxed'>
            Our platform connects riders and drivers seamlessly, making city travel easier than ever before.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className='mb-16'>
          <h2 className='text-3xl font-bold text-purple-600 mb-8'>Why Choose enjoyRide?</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
            <div className='bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-shadow'>
              <h3 className='text-xl font-bold text-purple-600 mb-3'>🔒 Safety First</h3>
              <p className='text-gray-600'>All drivers are verified and undergo rigorous background checks. Real-time tracking keeps you safe every ride.</p>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-shadow'>
              <h3 className='text-xl font-bold text-purple-600 mb-3'>💰 Affordable Pricing</h3>
              <p className='text-gray-600'>Transparent pricing with no hidden charges. Competitive rates and special discounts available.</p>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-shadow'>
              <h3 className='text-xl font-bold text-purple-600 mb-3'>⏱️ Quick & Reliable</h3>
              <p className='text-gray-600'>Get a ride in minutes. Our smart matching system ensures quick pickups and efficient routes.</p>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-shadow'>
              <h3 className='text-xl font-bold text-purple-600 mb-3'>📱 Easy to Use</h3>
              <p className='text-gray-600'>Simple, intuitive app interface. Book rides, track drivers, and pay online with just a few taps.</p>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-shadow'>
              <h3 className='text-xl font-bold text-purple-600 mb-3'>🌍 Eco-Friendly</h3>
              <p className='text-gray-600'>Reduce carbon footprint by sharing rides. Every journey contributes to a greener planet.</p>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-shadow'>
              <h3 className='text-xl font-bold text-purple-600 mb-3'>💬 24/7 Support</h3>
              <p className='text-gray-600'>Round-the-clock customer support to help you with any questions or concerns.</p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className='mb-16'>
          <h2 className='text-3xl font-bold text-purple-600 mb-6'>Our Story</h2>
          <div className='bg-gradient-to-r from-purple-50 to-purple-100 p-8 rounded-lg border border-purple-200'>
            <p className='text-gray-700 text-lg leading-relaxed mb-4'>
              enjoyRide was founded with a simple vision: to make transportation affordable, safe, and accessible to everyone. What started as a small startup has grown into a trusted platform serving thousands of daily users across the city.
            </p>
            <p className='text-gray-700 text-lg leading-relaxed'>
              Today, we're proud to be the city's most preferred ride-sharing service, known for our reliability, customer care, and commitment to sustainable urban mobility.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className='mb-16'>
          <h2 className='text-3xl font-bold text-purple-600 mb-8 text-center'>By The Numbers</h2>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
            <div className='text-center bg-purple-50 p-6 rounded-lg'>
              <h3 className='text-4xl font-bold text-purple-600 mb-2'>50K+</h3>
              <p className='text-gray-600'>Happy Users</p>
            </div>
            <div className='text-center bg-purple-50 p-6 rounded-lg'>
              <h3 className='text-4xl font-bold text-purple-600 mb-2'>10K+</h3>
              <p className='text-gray-600'>Active Drivers</p>
            </div>
            <div className='text-center bg-purple-50 p-6 rounded-lg'>
              <h3 className='text-4xl font-bold text-purple-600 mb-2'>1M+</h3>
              <p className='text-gray-600'>Rides Completed</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='bg-gradient-to-r from-purple-500 to-purple-600 text-white p-8 sm:p-12 rounded-lg text-center'>
          <h2 className='text-2xl sm:text-3xl font-bold mb-4'>Ready to Experience enjoyRide?</h2>
          <p className='text-purple-100 mb-8 text-lg'>Download our app and get your first ride at special discount!</p>
          <button className='bg-white text-purple-600 font-bold py-3 px-8 rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-300'>
            Download Now
          </button>
        </section>
      </div>

      {/* Footer */}
      <footer className='bg-gray-900 text-gray-300 py-8 mt-16'>
        <div className='max-w-5xl mx-auto px-4 text-center'>
          <p>&copy; 2025 enjoyRide. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
