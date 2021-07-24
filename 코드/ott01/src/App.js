// 컴포넌트를 정의하는 프로그램
// 실제로 화면에 표시되는 내용들을 정의함
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './logo.svg';
import Main_Page from './components/Main_Page';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      title: null
    }
  }

  componentDidMount() {
    fetch('http://localhost:3333/api')
      .then(res => res.json())
      .then(data => this.setState({title: data.title}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            {this.state.title? <h1>{this.state.title}</h1>:<h1>loading...</h1>}
          </div>
        </header>
      </div>
    );
  }
}


// function App() {

//   return (
//     <div>
//       <div>
//         <Main_Page></Main_Page>
//       </div>
//     </div>
//   );
// }

export default App;