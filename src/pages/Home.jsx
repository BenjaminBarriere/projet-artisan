import Contact from "../sections/Contact"
import Footer from "../layouts/Footer"
import Header from "../layouts/Header"
import LastChantiers from "../sections/LastsChantiers"
import Presentation from "../sections/Presentation"
import "./Home.scss"

const Home = () => {
   return (
      <>
         <Header />
         <main>
            <Presentation />
            <LastChantiers />
            <Contact />
         </main>
         <Footer />
      </>
   )
}

export default Home
