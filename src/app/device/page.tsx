import OBJViewer from "../components/obj-viewer";

export default function Device() {
  return (
    <div>
      <main className="bg-base-100 text-base-content flex flex-col xl:flex-row justify-between items-center px-5">
        <div className="m-5">
          <OBJViewer objUrl="/esp32.obj" mtlUrl="/esp32.mtl" width={400} height={400} scale={5} enableControls={false} autorotate={true} />
          <h2 className="text-2xl">ESP32: The Brain Behind the Magic</h2>
          <br />
          <p className="text-justify">
            Meet the ESP32, the brilliant brain behind our smart tracking device.
            Imagine having a super-smart friend who’s always on top of things, making sure everything runs smoothly.
            That&apos;s the ESP32! This little powerhouse handles all the data from your activities, processes it,
            and sends it to your app in real-time.
            It&apos;s like having your own personal coach, tech wizard, and cheerleader all rolled into one tiny chip.
            Ready to elevate your training game? The ESP32 is here to make it happen.
          </p>
        </div>
        <div className="divider xl:hidden flex"></div> 
        <div className="m-5">
          <OBJViewer objUrl="/ADXL345.obj" mtlUrl="/ADXL345.mtl" width={400} height={400} scale={7} enableControls={false} autorotate={true} />
          <h2 className="text-2xl">Accelerometer: The Motion Master</h2>
          <br />
          <p className="text-justify">
          Introducing the accelerometer, our motion master extraordinaire!
          Think of it as the Sherlock Holmes of movement – it detects every twist, turn, and jump you make.
          Whether you&apos;re sprinting, jumping, or simply walking,
          the accelerometer captures the essence of your every move with precision.
          It&apos;s like having a dance partner who never misses a step, helping you understand and improve your performance.
          Get ready to uncover the secrets of your movements with our trusty accelerometer!
          </p>
        </div>
        <div className="divider xl:hidden flex"></div> 
        <div className="m-5">
          <OBJViewer objUrl="/18650.obj" mtlUrl="/18650.mtl" width={400} height={400} scale={5} enableControls={false} autorotate={true} />
          <h2 className="text-2xl">Battery: The Everlasting Energizer</h2>
          <br />
          <p className="text-justify">
          Say hello to our powerhouse battery, the everlasting energizer that keeps your smart tracking device alive and kicking!
          Imagine having boundless energy for your workouts, never worrying about running out of juice.
          That&pos;s exactly what our battery provides. It’s reliable, long-lasting,
          and ready to power your device through the toughest training sessions. With this battery on board,
          you&apos;re all set to achieve your fitness goals without missing a beat.
          </p>
        </div>
      </main>
    </div>

  );
}
