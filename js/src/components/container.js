'use strict';

/*
 *
 * Dependencies
 *
 */

const React = require('react');
const _     = require('lodash');

const User     = require('./user');

// const libUsers = require('../lib/users');


const USER_DATA = require('../../../data/users.js');
const AVATAR_DATA = require('../../../data/avatars.js');
const FRIEND_DATA = require('../../../data/friends.js');



/*
 *
 * Component Definition
 *
 */

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeUserId: 2,
            users: USER_DATA,
            avatars: AVATAR_DATA,
            friends: FRIEND_DATA,
        };
    }



    // componentDidUpdate(nextProps, nextState) {
    //     console.log(`container::componentDidUpdate()`, nextState.activeUserId);
    // }



    render() {
        // console.log(this.state.friends);
        const userFriends = _.filter(this.state.friends, f => {
            // console.log(f);
            return f.userId === this.state.activeUserId;
        });

        return (
            <div>

                <nav id='navbar' className='navbar navbar-default'>
                    <div className='container-fluid'>
                        <div className='navbar-header'><a href='./' className='navbar-brand'>Friend Tracker</a></div>
                        <div>
                            <ul className='nav navbar-nav navbar-right'>
                                <li>
                                    <a title='Add User' onClick={this.__addUser.bind(this)}>
                                        <i className='fa fa-user-plus'></i>
                                        <span className='nav-label'>Add User</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div id='app-root' className='container'>
                    <div className='row'>
                        <div className='col-md-12'>

                            <User
                                id      = {this.state.activeUserId}
                                users   = {this.state.users}
                                avatars = {this.state.avatars}
                                friends = {userFriends}

                                handlers = {{
                                    setActiveUser: this.__setActiveUser.bind(this),
                                    setUserName: this.__setUserName.bind(this),
                                    setUserAvatar: this.__setUserAvatar.bind(this),
                                    addFriend: this.__addFriend.bind(this),
                                    removeFriend: this.__removeFriend.bind(this),
                                }}
                            />

                        </div>
                    </div>
                </div>




                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <pre>app state: {JSON.stringify(this.state, null, '    ')}</pre>
                        </div>
                    </div>
                </div>

            </div>
        );
    }


    __setActiveUser(activeUserId) {
        console.log(`container::__setActiveUser(${activeUserId})`);
        this.setState({activeUserId});
    }


    __addUser() {
        console.log(`container::__addUser()`);

        this.setState(state => {
            const id = Object.keys(this.state.users).length + 1;
            const newUser = {
                id,
                avatarId: _.random(1, 4),
            };

            // console.log('newUser', newUser);

            state.users[id] = newUser;
            state.activeUserId = id;
            return state;
        });

        document.getElementById('user-name').focus();
    }



    __getUser(id) {
        const user = _.find(this.state.users, u => u.get('id') === id);

        console.log(`__getUser(${id})`, user.toJS());

        return user;
    }


    __setUserName(id, name) {
        console.log(`container::__setUserName(${id})`);

        this.setState(state => {
            state.users[id].name = name;
            return {users: state.users};
        });
    }


    __setUserAvatar(userId, avatarId) {
        console.log(`container::__setUserAvatar(${userId}, ${avatarId})`);

        this.setState(state => {
            state.users[userId].avatarId = avatarId;
            return {users: state.users};
        });
    }


    __addFriend(userId, friendId) {
        console.log(`container::__addFriend(${userId}, ${friendId})`);

        this.setState(state => {
            const id = Object.keys(this.state.friends).length + 1;
            const newFriend = {
                id,
                userId,
                friendId,
            };

            state.friends[id] = newFriend;

            return {friends: state.friends};
        });
    }


    __removeFriend(userId, friendId) {
        console.log(`container::__removeFriend(${userId}, ${friendId})`);

        this.setState(state => {
            const friends = _.filter(state.friends, friend => !(
                friend.userId === userId
                && friend.friendId === friendId
            ));

            return {friends};
        });
    }
}





/*
 *
 * Export Module
 *
 */

module.exports = App;
