import React, {Component} from 'react';
import {CONTEXT} from './constants';

class App extends Component {

    constructor() {
        super();
        this.state = {texto: ""};
    }

    componentDidMount() {
        fetch(CONTEXT + "/rs/teste").then((response) => response.text()).then((texto) => this.setState({texto}));
        // TODO Talvez nao use mais o nodejs
        //fetch(CONTEXT_BLOCKCHAIN + "/teste").then((response) => response.json()).then((texto) => this.setState({texto}));
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
