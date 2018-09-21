import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import{ Header } from './index';
import Stock from '../../images/student.jpg';
import Success from '../../images/success.jpg';
import Slider from "react-slick";


export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };



  render() {
     var settings = {
      autoplay: true,
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 250,
      infinite: true,
      arrows: false,
    };
    

    return (
    <div style={{height: '100%', width: '100%', backgroundColor: '#3366ff', position: 'fixed'}}>
      <Header/>
      <div>
       <Slider {...settings}>
        <div>
           <img src={Stock} alt="stock" style={{width: '100%' , height: '450px'}}/>
        </div>
        <div>
           <img src={Success} alt="stock" style={{width: '100%' , height: '450px'}}/>
        </div>
      </Slider>
      </div>
      <div>
        <h1 style={{color: 'white', textAlign: 'center', marginTop: '6%'}}>Create and evaluate your surveys easily</h1>
        <h1 style={{color: 'white', textAlign: 'center', marginTop: '6%'}}>Register now and get full access</h1>
        <br></br>
      </div>
    </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
