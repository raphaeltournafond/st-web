import UserTable from "../components/user-table";

export default function Home() {
  return (
    <main className="bg-base-100 text-base-content flex flex-col justify-center items-center py-10">
      <UserTable />

      <section className="pt-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4 text-error">Demo Website Notice</h2>
          <p className="text-lg mb-8">
            Welcome to the demo version of our Smart Tracker app. This demo is designed to give you an overview of the powerful capabilities of our embedded tracking devices. Here, you can explore the features using a single demo user account.
          </p>
          <p className="text-lg mb-8">
            Our Smart Tracker app allows you to monitor various aspects of physical activity, including step count, regularity, strength, and more. This demo version showcases the user interface and some core functionalities, but please note that it does not include all features available in the full version.
          </p>
          <p className="text-lg mb-8">
            If you would like a more comprehensive and personalized demonstration of our app, please contact us. We would be happy to arrange a detailed demo session tailored to your needs.
          </p>
          <p className="text-lg mb-8">
            For further inquiries or to request a full demo, reach out to us at:&nbsp;
            <a href="mailto:contact.alpinetech@proton.me" className="text-blue-500 underline">contact.alpinetech@proton.me</a>
          </p>
          <p className="text-lg mb-8">
            Thank you for your interest in our Smart Tracker app. We look forward to helping you discover how our innovative technology can enhance your experience.
          </p>
        </div>
      </section>
    </main>
  );
}
