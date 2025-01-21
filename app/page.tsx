import Footer from "@/components/Footer";
import TabPage from "@/components/TabPage";
import NavBar from "@/components/ui/NavBar";

export default function Home() {
  return (
    <main className="relative bg-black-100 justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">

      <NavBar />
      <TabPage />
      <Footer />
    </main>
  );
}


