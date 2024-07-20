import { useEffect } from "react"
import FeatureCards from "./FeatureCards"
import Footer from "./Footer"
import image1 from '/landing1.jpeg'
import image2 from '/landing2.jpeg'
import image3 from '/landing3.jpeg'
import image4 from '/landing4.jpeg'
import { auth } from "../../firebase/firebaseconfig"
import { useNavigate } from "react-router-dom"
function LandingPage() { 

  const navigate=useNavigate()


  //Navigate to classes page if user is logged in.
  useEffect(()=>(
    auth.onAuthStateChanged((user)=>{
    if(user){
      navigate('/classes')
    }
    })),[])


  return (
    <>
        <div className="lg:w-1/2 mb-10 md:w-1/2 mx-auto">
        <div className="mx-auto max-w-screen-xl px-4 py-20 lg:flex lg:items-center">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="bg-gradient-to-r from-green-600 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
                    Making Question Papers
                        <span className="sm:block"> Made a Whole Lot Easier!!! </span>
                    </div>
                    <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                    Effortlessly create custom question papers tailored to your curriculum with our intuitive generator. Save time and ensure accuracy in exam preparation.
                    </p>
                </div>
            </div>
            <div className="font-bold text-3xl  text-center">FEATURES</div>
            <div className="flex justify-center flex-wrap gap-3">
                <FeatureCards imageUrl={image1} title="Create Custom Question Papers." description="Make your own question papers from your list of questions." />
                <FeatureCards imageUrl={image3} title="Store Questions for later." description="Store questions according to the chapter."/>
                <FeatureCards imageUrl={image2} title="Seamless PDF generation." description="Generate PDF in one click."/>
                <FeatureCards imageUrl={image4} title="Categorize according to class." description="Easily find your saved question papers by their class." />
            </div>
            
        </div>
        <Footer/>
    </>
  )
}

export default LandingPage