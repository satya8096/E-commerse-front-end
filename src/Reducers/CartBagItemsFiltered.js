const cartFilteredData = (data, value) => {
  const filterdata = data.filter((each) => {
    return each._id === value;
  });
  return filterdata;
};

export default cartFilteredData;
