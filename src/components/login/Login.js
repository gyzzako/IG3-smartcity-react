import React from "react";
import logo from "../../assets/logo-food.png"; //tu peux changer de logo si tu veux.
import classes from './Login.module.css';
import Header from "../header/Header";

class Login extends React.Component{
    constructor() {
        super();
        this.state={
            pseudo :"",
            password :""
        }
    }

    render(){
        return(
          <div className="text-center">
              <Header />
              <section className={classes.auth}>
                  <h1>Se connecter</h1>
                  <img className="mb-4 " src={logo} alt="" width="100" height="100"></img>
                  <form>
                      <div className={classes.control}>
                          <label htmlFor='pseudo'>Pseudo utilisateur</label>
                          <input
                              type='text'
                              id='pseudo'
                              name="username"
                              required />
                      </div>
                      <div className={classes.control}>
                          <label htmlFor='password'>Mot de passe</label>
                          <input
                              type='password'
                              id='password' name=""
                              required />
                      </div>

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