import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilteredData from "../Reducers/FilterData";
import Pagination from "../Reducers/Pagination";
import FetchDataFromAPI from "../Reducers/FetchDataFromAPI";
import CartLength from "../Reducers/CartLenght";

export default function HomeKichen() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState([]);
  // const [pageNumber, setPageNumber] = useState(1);

  const FetchData = async () => {
    setLoading(true);
    try {
      const kitchenProducts = await FetchDataFromAPI("kitchen");
      setData(kitchenProducts);
      setLoading(false);
      setPerPage(kitchenProducts.slice(0, 4));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    FetchData();
    if (localStorage.getItem("user")) {
      CartLength();
    }
  }, []);


  const handler = (page) => {
    const pageNo = page.selected + 1;
    setPerPage(filterData.slice(pageNo * 4 - 4, pageNo * 4));
  };
  const getFiltered = (value) => {
    if (value === "all") {
      setFilterData(data);
      setPerPage(data.slice(0, 4));
    } else if (value === "kitchen") {
      const datafilterd = FilteredData(data, value);
      setFilterData(datafilterd);
       setPerPage(datafilterd.slice(0, 4));
    } else if (value === "home") {
      const datafilterd = FilteredData(data, value);
      setFilterData(datafilterd);
       setPerPage(datafilterd.slice(0, 4));
    } else if (value === "cups") {
      const datafilterd = FilteredData(data, value);
      setFilterData(datafilterd);
       setPerPage(datafilterd.slice(0, 4));
    } else if (value === "sofa") {
      const datafilterd = FilteredData(data, value);
      setFilterData(datafilterd);
       setPerPage(datafilterd.slice(0, 4));
    } else if (value === "table") {
      const datafilterd = FilteredData(data, value);
      setFilterData(datafilterd);
       setPerPage(datafilterd.slice(0, 4));
    } else if (value === "bed") {
      const datafilterd = FilteredData(data, value);
      setFilterData(datafilterd);
       setPerPage(datafilterd.slice(0, 4));
    } else {
      setFilterData(data);
      setPerPage(data.slice(0, 4));
    }
  };

  useEffect(() => {
    setFilterData(data);
  }, [data]);
  return (
    <div className="products-main-container">
      <div className="filter-container text-center">
        <h4>Filter By</h4>
        <select onChange={(e) => getFiltered(e.target.value)}>
          <option value={"all"}>Select any one Option</option>
          <option value={"kitchen"}>Kichen Products</option>
          <option value={"home"}>Home Products</option>
          <option value={"cups"}>Cup Sets</option>
          <option value={"sofa"}>Sofas</option>
          <option value={"table"}>Tables</option>
          <option value={"bed"}>Beds</option>
        </select>
      </div>
      {!loading && (
        <h6 style={{ marginLeft: "4rem" }}>
          Showing {filterData.length} Products
        </h6>
      )}
      <div className="products-container d-flex justify-content-evenly align-items-center flex-wrap gap-4">
        {loading && (
          <div className="spinner-border text-warning men-spinner"></div>
        )}
        {!loading &&
          perPage.map((item) => {
            const { imgURL, name, salePrice, _id, maxPrice } = item;
            return (
              <div className="product-card" key={_id}>
                <img src={imgURL} alt="img1" />
                <h6>{name}</h6>
                <div>
                  {" "}
                  Price -
                  <span className="" style={{ fontWeight: 700 }}>
                    Rs. {salePrice}/-
                  </span>
                  <span style={{ textDecoration: "line-through" }}>
                    Rs. {maxPrice}/-
                  </span>
                </div>
                <span>Free Delivery</span>
                <div className="buy-cart-btns d-flex align-items-center justify-content-center">
                  <Link to={`/kitchen/product-details/${_id}`}>
                    More Details
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
      {filterData.length !== 0 && filterData.length > 4 && (
        <div className="pagination-container">
          <Pagination
            filterData={filterData}
            handler={handler}
            pageLength={4}
          />
        </div>
      )}
      <img
        src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1710044702_continueshopping.jpg?im=Resize=(1240,150)"
        alt="img"
        width={"100%"}
      />
    </div>
  );
}
