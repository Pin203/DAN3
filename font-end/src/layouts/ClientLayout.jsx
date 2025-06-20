import Header from "../components/client/headers/header";
import Banner from "../components/client/banner/banner";
import Productnew from "../components/client/product/productnew";
import Footer from "../components/client/footer/footer";
import ProductFlash from "../components/client/product/productSale";
import { Outlet } from "react-router-dom";


const ClientLayout = () =>{
    return(
        <>
          <Header />
           {/* <main>
                <Outlet /> 
            </main> */}
           <Banner/>
          <Productnew/>
          <ProductFlash/>
          
          <Footer/>
        </>
    )
}
export default ClientLayout;