import React, {Component} from 'react';
import Painel from "./Painel";
import "./App.css"
import "purecss/build/pure.css"
import Cliente from "./Cliente";

class App extends Component {

    constructor() {
        super();
        this.state = {
            style: {
                tab: [
                    "",
                    "invisible"
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

    render() {
        return (
            <div>
                <div>
                    <button onClick={() => this.mudar(0)}>Mudar 1</button>
                    <button onClick={() => this.mudar(1)}>Mudar 2</button>
                </div>
                <div className={this.state.style.tab[0]}>
                    <Cliente/>
                </div>
                <div className={this.state.style.tab[1]}>
                    <Painel/>
                </div>
            </div>
        )
    }
}

export default App;
