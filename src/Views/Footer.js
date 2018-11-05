import React from 'react';

export default class Footer extends React.Component {
    render () {
        return (
        <footer className="footer footer-black  footer-white ">
        <div className="container-fluid">
          <div className="row">
            <nav className="footer-nav">
              <ul>
                <li>
                  <a href="https://www.creative-tim.com" >Driving App</a>
                </li>
                <li>
                  <a href="http://blog.creative-tim.com/" >Documentation</a>
                </li>
                <li>
                  <a href="https://www.creative-tim.com/license" >Cenidet</a>
                </li>
              </ul>
            </nav>
            <div className="credits ml-auto">
              <span className="copyright">
                ©
                <script>
                  document.write(new Date().getFullYear())
                </script>, based in <i className="fa fa-heart heart"></i> Creative Tim template by Driving App
              </span>
            </div>
          </div>
        </div>
      </footer>
      ) 
    }
}