import React from 'react';
import Paginate from "react-paginate";

export default function Pagination({filterData,handler,pageLength}) {
  return (
    <>
      <center>
        <Paginate
          pageCount={Math.ceil(filterData.length / pageLength)}
          onPageChange={handler}
          containerClassName="paginate-container"
          previousClassName="paginate-previous"
          breakLabel = '...'
          marginPagesDisplayed={1}
          pageRangeDisplayed={1}
          breakClassName='paginate-break'
          breakLinkClassName='paginate-break-link'
          nextClassName="paginate-next"
          pageClassName="paginate-page"
          pageLinkClassName="paginate-page-link"
          previousLinkClassName="paginate-previous-link"
          nextLinkClassName="paginate-next-link"
          activeClassName='paginate-active'
          activeLinkClassName='paginate-active-link'
        />
      </center>
    </>
  );
}
