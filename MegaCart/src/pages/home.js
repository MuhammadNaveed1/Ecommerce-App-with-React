import DrawerAppBar from "../components/navbar";
import MediaCard from "../components/card";
import axios from "axios";
import '../App.css'
import { useEffect, useState } from "react";
import BasicModal from "../components/modal";

function Home () {
  const [productdata, setProductdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('');
  useEffect(()=> {
    axios.get(`https://fakestoreapi.com/products/${category ? category : ''}`)
      .then(res => {
        res.data.map((v,i)=> setProductdata(res.data))
      })
      .catch (err => {
        console.log(err)
      })
  },[category])
  const viewDetails = (productData)=> {
    setDetails(productData)
  }
  const selectedCategory = (getCategory)=> {
    setCategory(getCategory)
  }
    return (
        <div>
        <DrawerAppBar selectedCategoryfunc={selectedCategory}/>
        <div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: 100}}>
        {productdata.map((v,i)=> {
          return (
            <MediaCard products= {v} key={i} setOpen={setOpen} viewDetails={viewDetails}/>
          )
        })}
        </div>
        </div>
        <BasicModal open={open} handleClose={()=> setOpen(false)} product={details} />
              </div>
    )
}
export default Home