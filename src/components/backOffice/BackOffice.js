import React from "react";
import Header from "../header/Header";
import Category from "./Category";

class backOffice extends React.Component{
    constructor() {
        super();
        this.state={
            
        }
    }

    render(){
        return(
          <div>
              <Header/>
              <Category/>
          </div>
        );
    }
}

export default backOffice;