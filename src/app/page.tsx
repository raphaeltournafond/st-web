'use client'

import React from 'react';
import OBJViewer from './components/obj-viewer';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-base-100 text-base-content flex flex-col justify-center text-center lg:text-left py-10">
      <section className="py-10">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center">
          <div className='px-4'>
            <h1 className="text-2xl md:text-4xl font-bold mb-4">Smarter Moves, Smoother Tracks:<br />Elevate Your Training Game 🚀</h1>
            <p className="text-lg md:text-xl brightness-75 mb-8">
              Choose AlpineTech for intelligent sports tracking.<br /><span className="border-base-content/20 border-b-2">Boost your performance</span> with state-of-the-art technology and tailored insights.
            </p>
            <Link href="/table"><button className="btn btn-info">Watch Demo</button></Link>
          </div>
          <Image className='light-image hidden rounded-lg drop-shadow-xl' src={'/screen-light.png'} alt='screen' width={1000} height={1000} />
          <Image className='dark-image hidden rounded-lg drop-shadow-xl' src={'/screen-dark.png'} alt='screen' width={1000} height={1000} />
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center">
          <div className='order-2 lg:order-1 cursor-grab flex items-center justify-center'>
            <OBJViewer objUrl="/smart-tracker.obj" mtlUrl="/smart-tracker.mtl" width={600} height={600} />
          </div>
          <div className='order-1 lg:order-2 px-4'>
            <h1 className="text-2xl md:text-4xl font-bold mb-4">Our Embedded Devices</h1>
            <p className="text-lg md:text-xl brightness-75 mb-8">
              We&apos;ve developed cutting-edge embedded devices for tracking sports activity,
              including step count, pace, strength, and more.
            </p>
            <Link href="/device"><button className="btn btn-info">Learn More</button></Link>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className='px-4'>
            <h1 className="text-2xl md:text-4xl font-bold mb-4">Our Mobile Application</h1>
            <p className="text-lg md:text-xl brightness-75 mb-8">
              Take control of your training sessions with our intuitive mobile app,
              designed for athletes and personal coaches alike.
            </p>
            <Link href="/app"><button className="btn btn-info">Explore App</button></Link>
          </div>
          <div className="mockup-phone">
            <div className="camera"></div>
            <div className="display">
              <div className="artboard artboard-demo phone-1 my-14">
                <Image className='light-image' src={'/app-light.gif'} alt='App demo video' width={888} height={1836} unoptimized />
                <Image className='dark-image' src={'/app-dark.gif'} alt='App demo video' width={888} height={1836} unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
