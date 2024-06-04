import OBJViewer from "../components/obj-viewer";

export default function Device() {
  return (
    <div>
      <h1 className="text-3xl p-5 bg-warning flex justify-center items-center">Under construction</h1>
      <main className="bg-base-100 text-base-content flex flex-col xl:flex-row justify-between items-center p-10">
        <div>
          <OBJViewer objUrl="/esp32.obj" mtlUrl="/esp32.mtl" width={400} height={500} scale={5} enableControls={false} autorotate={true} />
        </div>
        <div>
          <OBJViewer objUrl="/ADXL345.obj" mtlUrl="/ADXL345.mtl" width={400} height={500} scale={7} enableControls={false} autorotate={true} />
        </div>
        <div>
          <OBJViewer objUrl="/18650.obj" mtlUrl="/18650.mtl" width={400} height={500} scale={5} enableControls={false} autorotate={true} />
        </div>
      </main>
    </div>

  );
}
