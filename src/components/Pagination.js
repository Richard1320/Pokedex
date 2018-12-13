import React, { Component } from 'react';

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offsetDisplay: 3,
    };
  }
  goToPage(e) {
    e.preventDefault();

    let target = e.target.getAttribute('data-page');
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
    let prevPage = page - 1;
    let nextPage = page + 1;
    let x;

    if (page > 1) {
      links.push(
        <div key="page-first">
          <button data-page={1} onClick={this.goToPage.bind(this)}>
            First
          </button>
        </div>,
      );
      links.push(
        <div key="page-prev">
          <button data-page={prevPage} onClick={this.goToPage.bind(this)}>
            Prev
          </button>
        </div>,
      );
    }

    // loop to show links to range of pages around current page
    for (x = page - offset; x < page + offset + 1; x++) {
      // if it's a valid page number...
      if (x > 0 && x <= totalPages) {
        // if we're on current page...
        if (x === page) {
          // 'highlight' it but don't make a link
          links.push(
            <div key={x} className="page-{x} current">
              <span>{x}</span>
            </div>,
          );
          // if not current page...
        } else {
          // make it a link
          links.push(
            <div key={x} className="page-{x}">
              <button data-page={x} onClick={this.goToPage.bind(this)}>
                {x}
              </button>
            </div>,
          );
        } // end else
      } // end if
    } // end for

    // if not on last page, show forward and last page links
    if (page !== totalPages) {
      links.push(
        <div key="page-next">
          <button data-page={nextPage} onClick={this.goToPage.bind(this)}>
            Next
          </button>
        </div>,
      );
      links.push(
        <div key="page-last">
          <button data-page={totalPages} onClick={this.goToPage.bind(this)}>
            Last
          </button>
        </div>,
      );
    } // end if
    /****** end build pagination links ******/

    return links;
  }
  render() {
    return <div className="pagination">{this.displayLinks()}</div>;
  }
}
