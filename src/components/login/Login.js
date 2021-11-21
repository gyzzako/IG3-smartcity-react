import React from "react";
import logo from "../../assets/images/logo-food.png";
import classes from './Login.module.css';
import Header from "../header/Header";
import {loginUserWithAPI} from '../../API/index';

class Login extends React.Component{
    constructor() {
        super();
        this.state={
            username :"",
            password :"",
            usernameError :"",
            passwordError :"",
            loginErrorMessage :"",
            userData : undefined,
            redirectToAdministration : false
        };
        this.handleChange = this.handleChange.bind(this);
        this.jwtToken = null;
    }

    handleChange(event){
        this.setState({[event.target.name] : event.target.value});
    }

    /* --> Cette fonction sera utilisée plus tard , pas supprimer stp.
    validateInputs(){
        let usernameError = "";
        let passwordError ="";

        if(this.state.username === undefined || this.state.username === ""){
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
    }*/

    async loginSubmit(){
        const data = {
            username : this.state.username,
            password : this.state.password
        };

        try{
            const response = await loginUserWithAPI(data);
            if(response){
                localStorage.setItem("jwt", response.data); //stocke le token dans le localstorage
                this.componentDidMount();
            }else{
                this.setState({ loginErrorMessage : "Impossible de  !" })
            }
        }catch(error){
            if(error.response && error.response.status === 404){
                this.setState({ loginErrorMessage : "Erreur d'identification/mot de passe ou pseudo non valide !" })
            }
        }
    }

    logoutSubmit(){
        localStorage.removeItem("jwt");
        this.setState({userData: undefined});

    }

    componentDidMount(){
        this.jwtToken = localStorage.getItem("jwt");
        if(this.jwtToken !== null){
            const jwtPayloadBase64 = this.jwtToken.split(".")[1];
            const payload = JSON.parse(Buffer.from(jwtPayloadBase64, 'base64').toString('utf-8'));
            this.setState({userData: payload.value});
        }
    }

    render(){
        if(this.state.userData !== undefined){
            return(
                <div className="text-center">
                    <Header />  
                    <section className={classes.auth}>
                        <h1>Bonjour</h1>
                        <h2>{this.state.userData.firstname + " " + this.state.userData.lastname}</h2>
                        <img className="mb-4 " src={logo} alt="" width="100" height="100" />
                        <div className={classes.actions}>
                            <button onClick={() => this.logoutSubmit()}>Déconnexion</button>
                        </div>
                    </section>
                </div>
            );
        }else{
            //pas connecté
            return(
                <div className="text-center">
                    <Header />
                    <section className={classes.auth}>
                        <h1>Se connecter</h1>
                        <img className="mb-4 " src={logo} alt="" width="100" height="100"/>
                        <div>
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
                                this.state.loginErrorMessage !== "" ? (
                                    <div className="alert alert-warning" role="alert">
                                        {this.state.loginErrorMessage}
                                    </div>
                                ) : null
                            }
                            <div className={classes.actions}>
                                <button onClick={() => this.loginSubmit()}>Connexion</button>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
    }
}

export default Login;