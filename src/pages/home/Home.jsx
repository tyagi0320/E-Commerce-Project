import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import mycontext from "../../context/data/myContext";
import HeroSection from "../../components/heroSection/HeroSection";
import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/productCard/ProductCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";


function Home() {
  const dispatch = useDispatch;
  const cartItem= useSelector((state)=>state.cart)
  const addCart =  () => {
    dispatch(addToCart("shirt"))
  }
  const deleteCart = () =>{
    dispatch(deleteFromCart("shirt"));
  }
  return (
    <Layout>
      <div className="flex gap-5 justify-center">
        <button className='bg-gray-300 p-3'  onClick={()=> addCart}>Add</button>
        <button className='bg-gray-300 p-3'  onClick={()=> deleteCart}>Delete</button>


      </div>
      <HeroSection />
      <Filter />
      <ProductCard />
      <Track />
      <Testimonial />
    </Layout>
  );
}

export default Home;
