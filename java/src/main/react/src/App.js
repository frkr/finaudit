import React, {Component} from 'react';
import {CONTEXT} from './constants';

class App extends Component {

    constructor() {
        super();
        this.state = {texto: ""};
    }

    componentDidMount() {
        fetch(CONTEXT + "/rs/teste").then((response) => response.text()).then((texto) => this.setState({texto}));
    }

    render() {
        return (
            <div>
                <p>
                    {this.state.texto}
                </p>
            </div>
        );
    }
}

export default App;
