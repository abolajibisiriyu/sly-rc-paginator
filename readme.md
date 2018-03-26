### Installation

    $ npm install sly-rc-paginator --save

![paginator image](https://drive.google.com/thumbnail?id=1fVONVQQ9-Rv2j8jJzzIFCgC86OL3BMmJ&sz=w1500-h400)

This paginator component assumes that you have a styles for a paginator with the following structure

    <ul>
        <li>
    	    <a></a>
        </li>
    </ul>

Also the paginator truncates the list pages to just 10.

### Usage

    import  React, {  Component  }  from  "react";

    import  Paginator  from  "sly-rc-paginator";

    class  App  extends  Component  {

        constructor()  {
    	    super();
    	    this.state  =  {
    			    meta:  { // demo meta data from API
    				    totalItems:  100,
    				    currentPage:  1,
    				    itemsPerPage:  5
    			    }
    		 };
    	}
        onPageChange(currentPage)  {
    	    this.setState(prevSate => {
    			  return {
    				     meta: { // update meta data
    							  ...prevSate.meta,
    							  currentPage
    						}
    			    };
    	    });
        }
        render()  {

    	    const  pagintorOptions  =  {
    		    ulClassName:  "pagination",
    		    liClassName:  "page-item",
    		    activeClassName:  "active",
    		    disabledClassName:  "disabled"
    	    };
        return  (
    	    <div  className="App">
    		    {/*Show posts*/}
    		    <Paginator
    			    meta={this.state.meta}
    			    options={pagintorOptions}
    			    onPageChange={this.onPageChange.bind(this)}
    		    />
    	    </div>
    	   );
        }
    }
    export  default  App;

### Props

| name                      | type     | required | description                                                                                                          |
| ------------------------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| meta                      | object   | YES      | meta data that with the following keys `totalItems`, `currentPage` , `itemsPerPage`                                  |
| meta.totalItems           | number   | YES      | total number of rows to be paginated                                                                                 |
| meta.currentPage          | number   | YES      | current page being viewed                                                                                            |
| meta.itemsPerPage         | number   | YES      | number of items per page                                                                                             |
| options                   | object   | YES      | the paginator's options with the following keys `ulClassName`, `liClassName`, `activeClassName`, `disabledClassName` |
| options.ulClassName       | string   | YES      | class name for the `ul` tag                                                                                          |
| options.liClassName       | string   | YES      | class name for the `li` tag                                                                                          |
| options.activeClassName   | string   | YES      | class name for the current page to be applied to the `li` tag                                                        |
| options.disabledClassName | string   | YES      | class name for the disabled links to be applied to the `li` tag                                                      |
| options.anchorClassName   | string   | NO       | class name for the `a` tags                                                                                          |
| onPageChange              | function | YES      | the function that gets called when a page is clicked. It returns the `currentPage` as a number                       |
