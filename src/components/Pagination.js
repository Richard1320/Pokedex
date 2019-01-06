import React, { Component } from 'react';

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offsetDisplay: 2,
    };
  }
  goToPage(e) {
    e.preventDefault();

    let target = e.currentTarget.getAttribute('data-page');
    let pager = this.props.pager; // Get current sort state
    pager.page = target; // Add title as type to sort state
    this.props.pagerSubmit(pager); // Send query back to parent
  }
  displayLinks() {
    let links = [];
    let count = parseInt(this.props.count);
    let page = parseInt(this.props.pager.page);
    let itemsPerPage = parseInt(this.props.pager.itemsPerPage);
    let offset = parseInt(this.state.offsetDisplay);
    let totalPages = Math.ceil(count / itemsPerPage);
    // let prevPage = page - 1;
    // let nextPage = page + 1;
    let x;

    if (page > 1) {
      links.push(
        <div key="page-first" className="component--pagination__first">
          <button data-page="1" onClick={this.goToPage.bind(this)}>
            <span className="fal fa-angle-double-left" />
          </button>
        </div>
      );
      // links.push(
      //   <div key="page-prev" className="component--pagination__prev">
      //     <button data-page={prevPage} onClick={this.goToPage.bind(this)}>
      //       Prev
      //     </button>
      //   </div>
      // );
    }

    // loop to show links to range of pages around current page
    for (x = page - offset; x < page + offset + 1; x++) {
      // if it's a valid page number...
      if (x > 0 && x <= totalPages) {
        // if we're on current page...
        if (x === page) {
          // 'highlight' it but don't make a link
          links.push(
            <div key={x} className="component--pagination__page is-active">
              <span>{x}</span>
            </div>
          );
          // if not current page...
        } else {
          // make it a link
          links.push(
            <div key={x} className="component--pagination__page">
              <button data-page={x} onClick={this.goToPage.bind(this)}>
                {x}
              </button>
            </div>
          );
        } // end else
      } // end if
    } // end for

    // if not on last page, show forward and last page links
    if (page !== totalPages) {
      // links.push(
      //   <div key="page-next" className="component--pagination__next">
      //     <button data-page={nextPage} onClick={this.goToPage.bind(this)}>
      //       Next
      //     </button>
      //   </div>
      // );
      links.push(
        <div key="page-last" className="component--pagination__last">
          <button data-page={totalPages} onClick={this.goToPage.bind(this)}>
            <span className="fal fa-angle-double-right" />
          </button>
        </div>
      );
    } // end if
    /****** end build pagination links ******/

    return links;
  }
  render() {
    return <div className="component--pagination">{this.displayLinks()}</div>;
  }
}
