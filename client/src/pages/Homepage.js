import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import Item from "../components/Item";
import "../resourses/items.css";
import { useDispatch } from "react-redux";
function Homepage() {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategoty] = useState("Electronics");
  const categories = [
    {
      name: "Electronics",
      imageURL:
        "https://n.sinaimg.cn/translate/754/w1440h914/20200604/d6e8-iumkapx2018016.jpg",
    },
    {
      name: "Clothing",
      imageURL:
        "https://c8.alamy.com/comp/CTCW4M/vector-illustration-of-cool-men-clothes-icon-set-CTCW4M.jpg",
    },
    {
      name: "Shoes",
      imageURL:
        "https://sneakernews.com/wp-content/uploads/2022/01/Nike-Air-Max-2021-WMNS-DO2336-010-8.jpg?w=540&h=380&crop=1",
    },
    {
      name: "Grocery",
      imageURL:
        "https://i.pinimg.com/originals/90/bc/0c/90bc0c906fc30587b4863d0e6089f364.jpg",
    },
  ];
  const dispatch = useDispatch();
  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        setItemsData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <DefaultLayout>

      <div className="d-flex categories">
            {categories.map((category)=>{
              return <div 
              onClick={()=>setSelectedCategoty(category.name)}
              className={`d-flex category ${selectedCategory===category.name && 'selected-category'}`}>
                      <h4>{category.name}</h4>
                      <img src={category.imageURL} height='60' width='80' />
              </div>
            })}
      </div>

      <Row gutter={20}>

        {itemsData.filter((i)=>i.category===selectedCategory).map((item) => {
          return (
            <Col xs={24} lg={6} md={12} sm={6}>
              <Item item={item} />
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
}

export default Homepage;
