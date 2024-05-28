import React from 'react';
import OBJViewer from './components/obj-viewer';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-base-100 text-base-content flex flex-col justify-center text-center lg:text-left">

      <section className="p-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Smarter Moves, Smoother Tracks:<br />Elevate Your Training Game 🚀</h1>
            <p className="text-xl brightness-75 mb-8">
              Choose AlpineTech for intelligent sports tracking.<br /><span className="border-base-content/20 border-b-2">Boost your performance</span> with state-of-the-art technology and tailored insights.
            </p>
            <Link href="/search"><button className="btn btn-info">Get Started</button></Link>
          </div>
          <div className="mockup-window border bg-slate-200">
            <Image src={'/screen-white.png'} alt='Dashboard activity' width={2806} height={1620} />
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
          <div>
            <OBJViewer objUrl="/smart-tracker.obj" mtlUrl="/smart-tracker.mtl" width={500} height={500} />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Embedded Devices</h2>
            <p className="text-lg text-gray-600 mb-8">
              We&apos;ve developed cutting-edge embedded devices for tracking sports activity,
              including step count, pace, strength, and more.
            </p>
            <button className="btn btn-info">Learn More</button>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-0 md:mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mobile Application</h2>
            <p className="text-lg text-gray-600 mb-8">
              Take control of your training sessions with our intuitive mobile app,
              designed for athletes and personal coaches alike.
            </p>
            <button className="btn btn-info">Explore App</button>
          </div>
          <div className="mockup-phone">
            <div className="camera"></div>
            <div className="display">
              <div className="artboard artboard-demo phone-1">Hi.</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
