import React, {Component} from 'react';
import Painel from "./Painel";
import Cliente from "./Cliente";
import "purecss/build/pure.css"
import "./App.css"

class App extends Component {

    constructor() {
        super();
        this.state = {
            style: {
                tab: [
                    ""
                    , "invisible"
                ]
            }
        };

        this.mudar = this.mudar.bind(this);
    }

    mudar(pos) {
        this.setState({
            style: {
                tab: this.state.style.tab.map((value, i) => {
                    if (i === pos) {
                        return "";
                    } else {
                        return "invisible";
                    }
                })
            }
        });
    }

    toggleMenu() {
        document.getElementById('tuckedMenu').classList.toggle('custom-menu-tucked');
        document.getElementById('toggle').classList.toggle('x');
    }

    render() {
        return (
            <div>
                <div className="custom-menu-wrapper">
                    <div className="pure-menu custom-menu custom-menu-top">
                        <a href="#blockchain" className="pure-menu-heading custom-menu-brand">Blockchain</a>
                        <a href="#responsive" className="custom-menu-toggle" id="toggle" onClick={this.toggleMenu}><s className="bar"></s><s
                            className="bar"></s></a>
                    </div>
                    <div
                        className="pure-menu pure-menu-horizontal pure-menu-scrollable custom-menu custom-menu-bottom custom-menu-tucked"
                        id="tuckedMenu">
                        <div className="custom-menu-screen"></div>
                        <ul className="pure-menu-list">
                            <li className="pure-menu-item"><a onClick={() => this.mudar(0)} href="#simulacao" className="pure-menu-link">Simulação</a></li>
                            <li className="pure-menu-item"><a onClick={() => this.mudar(1)} href="#painel" className="pure-menu-link">Painel</a></li>
                        </ul>
                    </div>
                </div>
                <div className="main">
                    <div className={this.state.style.tab[0]}>
                        <Cliente/>
                    </div>
                    <div className={this.state.style.tab[1]}>
                        <Painel/>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
