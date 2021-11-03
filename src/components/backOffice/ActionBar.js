import React from "react";
import classes from './BackOffice.module.css';
import css from './css.css';
import {Navbar, Container} from 'react-bootstrap';


class ActionBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            categories:["Meal", "User", "Order", "Category"],
            chosenTable: props.chosenTableCallback,
            clickedCategoryIndex: undefined
        }
    }    

    setClicked = (number) => {
        this.setState({clickedCategoryIndex: number });
      };

    render(){
        const isActive = this.state.isActive;
        return(
        <div className={classes.category}>
            <h2 style={{color: 'white'}}>Tables</h2>
            <br />

            {
                this.state.categories.map((category, index) => {
                    return(
                        <Navbar>
                            <Container>
                                <Navbar.Brand key={index} className={index === this.state.clickedCategoryIndex ? "clicked" : null} onClick={() => {
                                    this.state.chosenTable(category.toLocaleLowerCase());
                                    this.setClicked(index);
                                }} style={{color: 'white', cursor: 'pointer'}}>{category}</Navbar.Brand>
                            </Container>
                        </Navbar>
                    )
                })
            }
        </div>
        )
    }
}

export default ActionBar;