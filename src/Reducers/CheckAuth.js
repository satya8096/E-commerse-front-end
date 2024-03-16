const CheckAuth = async (id) => {
  const URL =
    "https://shopykit-back-end.onrender.com/shopykit/api/v1/user-details";
  let usersData = await fetch(URL);
  let response = await usersData.json();
  let user = response.filter((each)=>{
    return each._id === id;
  })
  let user1 = user[0]

  return user1
};

export default CheckAuth;