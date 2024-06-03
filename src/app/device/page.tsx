import OBJViewer from "../components/obj-viewer";

export default function Device() {
  return (
    <main className="bg-base-100 text-base-content flex flex-col lg:flex-row justify-between items-center p-10">
      <div>
        <OBJViewer objUrl="/esp32.obj" mtlUrl="/esp32.mtl" width={300} height={300} scale={2} />
      </div>
      <div>
        <OBJViewer objUrl="/ADXL345.obj" mtlUrl="/ADXL345.mtl" width={300} height={300} scale={2} />
      </div>
      <div>
        <OBJViewer objUrl="/18650.obj" mtlUrl="/18650.mtl" width={300} height={300} scale={2} />
      </div>
    </main>
  );
}
