import { useEffect,useState } from "react"
import { useNavigate } from "react-router";
import { Outlet,NavLink } from 'react-router'

function ProductsList() {
    let [products,setProducts]=useState([]);
    let [loading,setLoading]=useState(false);
    let [error,setError]=useState(null);
    const [searchText, setSearchText] = useState("");
    const navigate=useNavigate()
    // navugate to product componenet
    const gotoProduct=(productObj)=>{
      // navigate logic
      // while navigating,transfer product obj too
      navigate('/products',{state:{products:productObj}})
    }
    const searchProduct = (e) => {
    e.preventDefault()
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    )

    setProducts(filteredProducts)
  }

  const LtoH = () => {
  const sorted = [...products].sort((a, b) => a.price - b.price)
  setProducts(sorted)
}

const HtoL = () => {
  const sorted = [...products].sort((a, b) => b.price - a.price)
  setProducts(sorted)
}
   useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true)
        let res = await fetch("https://fakestoreapi.com/products");
        if (res.status === 200) {
          let productsData = await res.json();
          setProducts(productsData);
        } else {
          throw new Error('Failed to fetch');
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  if (loading) {
    return <p className="text-center text-2xl text-blue-300">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-2xl text-red-400">{error.message}</p>;
  }
  return (
    <div>
      <div className="flex justify-around items-center">
        <form  onSubmit={searchProduct}>
          <input type="text" placeholder="Search the product you want" className="w-60 p-2 border-2 mr-2" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          <button type="submit" className="bg-blue-300 rounded-[50%] p-5">Search</button>
          <select onChange={(e) => {
            if (e.target.value === "low") {
                LtoH()
            } else if (e.target.value === "high") {
                HtoL()
            }
        }}
      >
        <option value="">Sort By Price</option>
        <option value="low">Low - High</option>
        <option value="high">High - Low</option>
        </select>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-10">
        {products.map((productObj)=>(
            <div onClick={()=>{gotoProduct(productObj)}} key={productObj.id} className="shadow-md p-10 rounded-2xl cursor-pointer">
            <img src={productObj.image} alt="" className="h-44 object-contain block mx-auto mb-10"/>
            <h3>{productObj.title}</h3>
            </div>
        ))}
        </div>
    </div>
  )
}

export default ProductsList