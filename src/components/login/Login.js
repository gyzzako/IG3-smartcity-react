import React from "react";
import logo from "../../assets/images/logo-food.png";
import classes from './Login.module.css';
import Header from "../header/Header";

class Login extends React.Component{
    constructor() {
        super();
        this.state={
            username :"",
            password :"",
            usernameError :"",
            passwordError :""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name] : event.target.value});
    }

    validateInputs(){
        let usernameError = "";
        let passwordError ="";

        if(this.state.username === undefined || this.state.username === ""){
            usernameError ="pseudo utilisateur non valide !"
        }
        if(!this.state.username.match(/^([a-zA-Z ]){2,30}$/)){
            usernameError ="pseudo utilisateur non valide !"
        }
        if(usernameError){
            this.setState({usernameError : usernameError});
        }
        if(this.state.password === undefined || this.state.password ===""){
            passwordError ="mot de passe non valide !";
        }
        if(passwordError){
            this.setState({passwordError : passwordError});
        }
    }

    handleSubmit(event){
        const isValidForm = this.validateInputs();
        if(isValidForm){
            console.log(this.state);
        }
        event.preventDefault();
    }

    render(){
        return(
            <div className="text-center">
                <Header />
                <section className={classes.auth}>
                    <h1>Se connecter</h1>
                    <img className="mb-4 " src={logo} alt="" width="100" height="100"/>
                    <form onSubmit={this.handleSubmit}>
                        <div className={classes.control}>
                            <label htmlFor='pseudo'>Pseudo utilisateur</label>
                            <input
                                type='text'
                                id='pseudo'
                                name="username"
                                required=""
                                value={this.state.username}
                                onChange={this.handleChange}/>
                        </div>
                        {
                            this.state.usernameError !== "" ? (
                                <div className="alert alert-warning" role="alert">
                                    {this.state.usernameError}
                                </div>
                            ) : null
                        }
                        <div className={classes.control}>
                            <label htmlFor='password'>Mot de passe</label>
                            <input
                                type='password'
                                id='password' name="password"
                                required=""
                                value={this.state.password}
                                onChange={this.handleChange} />
                        </div>
                        {
                            this.state.passwordError !== "" ? (
                                <div className="alert alert-warning" role="alert">
                                    {this.state.passwordError}
                                </div>
                            ) : null
                        }
                        <div className={classes.actions}>
                            <button>Connexion</button>
                        </div>
                    </form>
                </section>
            </div>
        );
    }
}

export default Login;