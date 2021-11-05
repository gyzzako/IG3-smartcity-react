import React from "react";
import classes from './BackOffice.module.css';
import './css.css';
import {Navbar, Container} from 'react-bootstrap';


class ActionBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            categories:[{meal: "Repas"}, {user: "Utilisateur"}, {order: "Commande"}, {category: "Catégorie"}],
            chosenTable: props.chosenTableCallback,
            clickedCategoryIndex: undefined
        }
    }    

    setClicked = (number) => {
        this.setState({clickedCategoryIndex: number });
      };

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
                                <Navbar.Brand className={index === this.state.clickedCategoryIndex ? "clicked" : null} onClick={() => {
                                    this.state.chosenTable(Object.keys(category)[0]);
                                    this.setClicked(index);
                                }} style={{color: 'white', cursor: 'pointer'}}>{Object.values(category)[0]}</Navbar.Brand>
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