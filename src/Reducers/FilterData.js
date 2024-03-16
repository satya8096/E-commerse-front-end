const FilteredData = (data, value) => {
  const filterdata = data.filter((each) => {
    return each.filter === value;
  });
  return filterdata
};

export default FilteredData;