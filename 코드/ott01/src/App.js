// 컴포넌트를 정의하는 프로그램
// 실제로 화면에 표시되는 내용들을 정의함
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import LandingPage from './components/LandingPage';
import Main_Page from './components/Main_Page';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hello : [],
    }
  }

  componentDidMount() {
    this._getHello();
  }

  _getHello = async() => {
    const res = await axios.get('/hello');
    this.setState({ hello : res.data.hello })
    console.log(this.state.hello);
  }

  render() {
    return(
      <>
        <h3>get DB data(브라우저 개발모드 콘솔확인)</h3>
      </>
    )
  }
}

export default App;

// function App() {

//   return (
//     <div>
//       <div>
//         {/* <LandingPage></LandingPage> */}
//         <Main_Page></Main_Page>
//       </div>
//     </div>
//   );
// }

// export default App;