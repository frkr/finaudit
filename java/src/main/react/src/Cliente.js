import React, {Component} from 'react';
import "purecss/build/pure.css"
import "./Cliente.css";

class Cliente extends Component {

    constructor() {
        super();
        this.headersDefault = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };

        // this.toggle = this.toggle.bind(this);

        this.state = {};
    }

    componentWillMount() {
        if (localStorage.getItem('painel')) {
            this.setState(JSON.parse(localStorage.getItem("cliente")));
        }
    }

    componentDidUpdate() {
        localStorage.setItem("cliente", JSON.stringify(this.state));
    }

    toggle(e, frm) {
        e.preventDefault();
        const el = document.getElementById(frm);
        if (el.classList.contains("invisible")) {
            el.classList.remove("invisible");
            e.target.innerText = "-";
        } else {
            el.classList.toggle("invisible");
            e.target.innerText = "+";
        }
    }

    render() {
        return (
            <div>
                <form className="pure-form pure-form-aligned">
                    <fieldset>
                        <legend>A Stacked Form <button className="button-small-extra pure-button"
                                                       onClick={(e) => this.toggle(e, "frm1")}>-</button></legend>
                        <div id="frm1">
                            <div className="pure-control-group">
                                <label htmlFor="name">Username</label>
                                <input id="name" type="text" placeholder="Username"/>
                                <span className="pure-form-message-inline">This is a required field.</span>
                            </div>

                            <div className="pure-control-group">
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" placeholder="Password"/>
                            </div>

                            <div className="pure-control-group">
                                <label htmlFor="email">Email Address</label>
                                <input id="email" type="email" placeholder="Email Address"/>
                            </div>

                            <div className="pure-control-group">
                                <label htmlFor="foo">Supercalifragilistic Label</label>
                                <input id="foo" type="text" placeholder="Enter something here..."/>
                            </div>

                            <div className="pure-controls">
                                <label htmlFor="cb" className="pure-checkbox">
                                    <input id="cb" type="checkbox"/> I've read the terms and conditions
                                </label>

                                <button type="submit" className="pure-button pure-button-primary">Submit</button>
                            </div>
                            <br/>
                            &nbsp;
                            <table className="pure-table">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Make</th>
                                    <th>Model</th>
                                    <th>Year</th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr className="pure-table-odd">
                                    <td>1</td>
                                    <td>Honda</td>
                                    <td>Accord</td>
                                    <td>2009</td>
                                </tr>

                                <tr>
                                    <td>2</td>
                                    <td>Toyota</td>
                                    <td>Camry</td>
                                    <td>2012</td>
                                </tr>

                                <tr className="pure-table-odd">
                                    <td>3</td>
                                    <td>Hyundai</td>
                                    <td>Elantra</td>
                                    <td>2010</td>
                                </tr>

                                <tr>
                                    <td>4</td>
                                    <td>Ford</td>
                                    <td>Focus</td>
                                    <td>2008</td>
                                </tr>

                                <tr className="pure-table-odd">
                                    <td>5</td>
                                    <td>Nissan</td>
                                    <td>Sentra</td>
                                    <td>2011</td>
                                </tr>

                                <tr>
                                    <td>6</td>
                                    <td>BMW</td>
                                    <td>M3</td>
                                    <td>2009</td>
                                </tr>

                                <tr className="pure-table-odd">
                                    <td>7</td>
                                    <td>Honda</td>
                                    <td>Civic</td>
                                    <td>2010</td>
                                </tr>

                                <tr>
                                    <td>8</td>
                                    <td>Kia</td>
                                    <td>Soul</td>
                                    <td>2010</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default Cliente;
