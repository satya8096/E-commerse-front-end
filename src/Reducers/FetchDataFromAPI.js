
export default async function FetchDataFromAPI(value) {
    const data = await fetch(
      "https://shopykit-back-end.onrender.com/shopykit/api/v1/all-products"
    );
      const response = await data.json();
      const Products = response.filter((each) => {
        return each.type === value;
      });
  return Products;
}
