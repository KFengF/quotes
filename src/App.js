import React from 'react';
import twitter from "./Resources/twitter.png";
import github from "./Resources/github.png"

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quote: '',
            author: '',
            color: {
                backgroundColor: 'hsl(360, 100%, 100%)',
                color: 'hsl(360, 100%, 100%)'
            }
        }
    }

    APIlists = {
        quoteList: [],
        authorList: []
    }

    newQuote = () => {
        const random = this.randInt();
        this.setState({
            quote: this.APIlists.quoteList[random],
            author: this.APIlists.authorList[random]
        });
        this.randColor();
    }

    randInt(){
        return Math.floor(Math.random() * 20)
    }

    randColor(){
        const random = Math.floor(Math.random() * 360);
        this.setState({ 
            color: {
                backgroundColor: `hsl(${random}, 100%, 72%)`,
                color: `hsl(${random}, 100%, 72%)`
            }
        });
    }

    componentDidMount(){
        fetch('https://api.quotable.io/quotes')
        .then(response => response.json())
        .then(quotes => {
            this.APIlists.quoteList = quotes.results.map( object => object.content );
            this.APIlists.authorList = quotes.results.map( object => object.author );
        })
        .then(() => this.newQuote())
        .catch(console.log);
    }

    render(){
        const { quote, author, color } = this.state;
        return (
            <div style={ color } className="App flex items-center justify-center vh-100">
                <div className="container br4 pa4">
                    {
                        !this.state.quote ?
                    <h1 className="f1">Loading...</h1> :
                    <div>
                        <h1 className="f1 tj">"{ quote }"</h1>
                        <p className="f2 tr">-{ author }</p>
                        <ul className="flex items-end mt5">
                            <li><a 
                            href={ `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${ quote.split(' ').join('%20') }"%20${ author }` }
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Post a tweet about the quote"
                            >
                                <img src={ twitter } alt="twitter" style={ color } className="br4 pa2 w-100" />
                            </a></li>
                            <li><a href="https://github.com/lukePeavey/quotable" target="_blank" rel="noopener noreferrer" title="Quote API repository">
                                <img src={ github } alt="github" style={ color } className="br4 pa2 w-100"/>
                            </a></li>
                            <li><button onClick={ this.newQuote } style={ color } className="f2 br4 pa2 pointer grow b--silver b" >Quote</button></li>
                        </ul>
                    </div>
                    }
                </div>
            </div>
            )
    }
}

export default App;