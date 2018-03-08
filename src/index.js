import React, { Component } from "react";
import _ from "lodash";

export default class Paginator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pager: {}
    };
  }

  componentDidMount() {
    const {
      meta,
      meta: { totalItems, currentPage, itemsPerPage }
    } = this.props;

    !_.isEmpty(meta) &&
      this.setState({
        pager: this.getPager(totalItems, currentPage, itemsPerPage)
      });
  }

  componentDidUpdate(prevProps) {
    const {
      meta,
      meta: { totalItems, currentPage, itemsPerPage }
    } = this.props;

    if (!_.isEqual(meta, prevProps.meta)) {
      !_.isEmpty(meta) &&
        this.setState({
          pager: this.getPager(totalItems, currentPage, itemsPerPage)
        });
    }
  }

  getPager(_totalItems, _currentPage, _itemsPerPage) {
    // console.log("Total items: ", _totalItems);
    // console.log("Items per page: ", _itemsPerPage);
    // console.log("Current page: ", _currentPage);
    const currentPage = _currentPage;

    // default page size is 10
    const itemsPerPage = _itemsPerPage || 10;

    // calculate total pages
    const numberOfPages = Math.ceil(_totalItems / itemsPerPage);

    let startPage, endPage;
    if (numberOfPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = numberOfPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= numberOfPages) {
        startPage = numberOfPages - 9;
        endPage = numberOfPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // create an array of pages to ng-repeat in the pager control
    const pages = _.range(startPage, endPage + 1);

    // return object with all pager properties
    return {
      currentPage,
      numberOfPages,
      pages
    };
  }

  render() {
    const { pager } = this.state;
    const { options } = this.props;
    // console.log(pager);
    return (
      !_.isEmpty(pager) && (
        <ul className={options.ulClassName}>
          <li
            className={pager.currentPage === 1 ? options.disabledClassName : ""}
          >
            <a
              className={
                options.anchorClassName ? options.anchorClassName : ""
              }
              onClick={() => this.props.onChangePage(1, pager.numberOfPages)}
            >
              First
            </a>
          </li>
          <li
            className={pager.currentPage === 1 ? options.disabledClassName : ""}
          >
            <a
              className={
                options.anchorClassName ? options.anchorClassName : ""
              }
              onClick={() =>
                pager.currentPage > 1 &&
                this.props.onChangePage(
                  pager.currentPage - 1,
                  pager.numberOfPages
                )
              }
            >
              Previous
            </a>
          </li>
          {pager.pages &&
            pager.pages.map((page, index) => (
              <li
                key={index}
                className={
                  pager.currentPage === page ? options.activeClassName : ""
                }
              >
                <a
                  className={
                    options.anchorClassName ? options.anchorClassName : ""
                  }
                  onClick={() =>
                    this.props.onChangePage(page, pager.numberOfPages)
                  }
                >
                  {page}
                </a>
              </li>
            ))}
          <li
            className={
              pager.currentPage === pager.numberOfPages
                ? options.disabledClassName
                : ""
            }
          >
            <a
              className={
                options.anchorClassName ? options.anchorClassName : ""
              }
              onClick={() =>
                pager.currentPage < pager.numberOfPages &&
                this.props.onChangePage(
                  pager.currentPage + 1,
                  pager.numberOfPages
                )
              }
            >
              Next
            </a>
          </li>
          <li
            className={
              pager.currentPage === pager.numberOfPages
                ? options.disabledClassName
                : ""
            }
          >
            <a
              className={
                options.anchorClassName ? options.anchorClassName : ""
              }
              onClick={() =>
                this.props.onChangePage(
                  pager.numberOfPages,
                  pager.numberOfPages
                )
              }
            >
              Last
            </a>
          </li>
        </ul>
      )
    );
  }
}
