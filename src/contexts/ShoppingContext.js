import { createContext, useState,useCallback,useMemo } from "react";

const ShoppingDataContext = createContext();

const ShoppingContextProvider = ({ children }) => {
    const [shoppingData, setShoppingData] = useState([]);
    const [uniqueBrands, setUniqueBrands] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [brandList,setBrandList] = useState([]);


    const updateShoppingData = useCallback((response) => {
      setShoppingData(response);
    }, []);

    const updateUniqueBrands = useCallback((response) => {
      setUniqueBrands(response);
    }, []);

    const updateCart = useCallback((response) => {
      setCartList([...response]);
    }, []);

    const updateSelectedBrand= useCallback((response,data) => {
      setSelectedBrand(response);
      setBrandList(data)
    }, []);

    const shoppingContextObj = useMemo(() => ({
      shoppingData,
      updateShoppingData,
      uniqueBrands,
      updateUniqueBrands,
      cartList,
      updateCart,
      selectedBrand,
      updateSelectedBrand,
      brandList
    }), [shoppingData,
      updateShoppingData,
      uniqueBrands,
      updateUniqueBrands,
      cartList,
      updateCart,
      selectedBrand,
      updateSelectedBrand, 
      brandList]);

    return (
      <ShoppingDataContext.Provider value={shoppingContextObj}>
        {children}
      </ShoppingDataContext.Provider>
    );
};

export { ShoppingDataContext, ShoppingContextProvider };