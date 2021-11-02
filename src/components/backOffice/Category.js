import React from "react";
import { Navbar, Container } from 'react-bootstrap';
import classes from './BackOffice.module.css';

class Category extends React.Component{
    constructor(){
        super();
        this.state={
            categories:["cat1", "cat2", "cat3", "cat1"]
        }
    }    

    render(){
        return(
        <div className={classes.category}>
            <h1 style={{color: 'white', textAlign: 'center'}}>Tables</h1>
            <br />

            {/* display category A CONTINUER POUR AFFICHER LE TABLEAU EN FONCTION */}
            {
                this.state.categories.map(category => {
                    return(
                        <Navbar>
                            <Container>
                                <Navbar.Brand style={{color: 'white'}}>{category}</Navbar.Brand>
                            </Container>
                        </Navbar>
                    )
                })
            }
        </div>
        )
    }
}

export default Category;