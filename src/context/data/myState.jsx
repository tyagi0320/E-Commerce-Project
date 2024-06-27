import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  doc
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../firebase/FirebaseConfig";

function myState(props) {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17,24,39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const addProduct = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageUrl == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("All fields are required");
    }
    setLoading(true);
    try {
      const productRef = collection(fireDB, "products");
  
      await addDoc(productRef, products);
      toast.success("Product added successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
        getProductData();
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [product, setproduct] = useState([]);

  const getProductData = async () => {
    setLoading(true);
    try {
      const productRef = collection(fireDB, "products");

      // Construct the query with orderBy correctly applied to the query
      const q = query(productRef, orderBy("time"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let productArray = [];
        querySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });

        setproduct(productArray);
        setLoading(false);
      });

      return unsubscribe; // Return the unsubscribe function for cleanup
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);
  
  //Update product

  const edithandle = (item) =>{
    setProducts(item)
  }

  //update
  const updateProduct = async (item) =>{
    setLoading(true)
    try {
      await setDoc(doc(fireDB,"products",products.id),products)
      toast.success("Product Updated successfully")
      setTimeout(()=>{
        window.location.href = "/dashboard"
      },2000)
      getProductData();
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  //delete 

  const deleteProduct = async(item) => {
  try {
    setLoading(true)
    await deleteDoc(doc(fireDB,"products",item.id));
    toast.success('Product Deleted Successfully')
    setLoading(false)
    getProductData()
  } catch (error) {
    toast.error("Failed to Delete Product")
    console.error(error)
    setLoading(false)
    
  }
  }

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        edithandle,
        updateProduct,
        deleteProduct

      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default myState;
