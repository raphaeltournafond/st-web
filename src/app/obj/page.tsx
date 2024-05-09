import OBJViewer from "../components/obj-viewer";

export default function Home() {
  return (
    <main className="bg-base-100 text-base-content flex justify-center items-center">
      <OBJViewer objUrl="/smart-tracker.obj" mtlUrl="/smart-tracker.mtl" width={500} height={500} />
    </main>
  );
}