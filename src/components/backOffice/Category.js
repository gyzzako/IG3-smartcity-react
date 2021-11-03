import React from "react";
import classes from './BackOffice.module.css';
import {Navbar, Container} from 'react-bootstrap';


class Category extends React.Component{
    constructor(props){
        super(props);
        this.state={
            categories:[{
                id:1,
                name: "cat1"
            },
            {
                id:2,
                name: "cat2"
            },
            {
                id:3,
                name: "cat3"
            }],
            chosenCategory: props.chosenCategoryCallback
        }
    }    

    render(){
        return(
        <div className={classes.category}>
            <h2 style={{color: 'white'}}>Tables</h2>
            <br />

            {/* display category A CONTINUER POUR AFFICHER LE TABLEAU EN FONCTION */}
            {
                this.state.categories.map(category => {
                    return(
                        <Navbar key={category.id}>
                            <Container>
                                <Navbar.Brand onClick={() => this.state.chosenCategory(category.name)} style={{color: 'white'}}>{category.name}</Navbar.Brand>
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