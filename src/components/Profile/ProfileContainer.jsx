import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {getUserProfile} from '../../redux/profile-reducer';
import {useLocation, useNavigate, useParams} from "react-router-dom";




class ProfileContainer extends React.Component {
  
  componentDidMount() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = 2;
    }
    this.props.getUserProfile(userId);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isAuth) {
      this.props.router.navigate('/login');
    }
  }

  render() {
    return <div>
      <Profile {...this.props} profile={this.props.profile} userId={this.userId}/>
    </div>
  }
};
let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth

})

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
          <Component{...props}
              router={{ location, navigate, params }}
          />
      );
  }
  
  return ComponentWithRouterProp;
}

export default connect(mapStateToProps, {getUserProfile})(withRouter(ProfileContainer));