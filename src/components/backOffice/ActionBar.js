import React from "react";
import classes from './BackOffice.module.css';
import {Navbar, Container} from 'react-bootstrap';


class ActionBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            categories:["Meal", "User", "Order", "Category"],
            chosenTable: props.chosenTableCallback
        }
    }    

    render(){
        return(
        <div className={classes.category}>
            <h2 style={{color: 'white'}}>Tables</h2>
            <br />

            {
                this.state.categories.map((category, index) => {
                    return(
                        <Navbar key={index}>
                            <Container>
                                <Navbar.Brand onClick={() => this.state.chosenTable(category.toLocaleLowerCase())} style={{color: 'white', cursor: 'pointer'}}>{category}</Navbar.Brand>
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