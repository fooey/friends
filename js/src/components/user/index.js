'use strict';

/*
 *
 * Dependencies
 *
 */

const React     = require('react');
const _         = require('lodash');


// const libUsers = require('../../lib/users');
// console.log('DATA::users', DATA.users.toJS());
// console.log('DATA::friends', DATA.friends.toJS());



/*
 *
 * Component Definition
 *
 */

class User extends React.Component {
    static propTypes = {
        avatars : React.PropTypes.object.isRequired,
        friends : React.PropTypes.array.isRequired,
        handlers: React.PropTypes.object.isRequired,
        id      : React.PropTypes.number.isRequired,
        users   : React.PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);

        console.log('default props', props);

        this.state = this.__getInitialState.call(this, props);
    }



    __getInitialState(props) {
        const friendIdArray = _.chain(props.friends)
            .pluck('friendId')      // id's of current friends
            .concat(props.id)  // don't friend self either
            .value();

        let nonFriends = _.reject(
            props.users,
            user => _.contains(friendIdArray, user.id)
        );

        // console.log(
        //     friendIdArray,
        //     nonFriends,
        //     this.props.id,
        // );

        const activeTab = this.state && this.state.activeTab || 'friends';

        return {
            user: this.__getUser(props.id),
            activeTab,
            nonFriends,
        };
    }


    // shouldComponentUpdate(nextProps) {
    //     return !Immutable.is(this.props.id, nextProps.id);
    // }



    // componentDidMount() {
    //     console.log('user::componentDidMount');
    // }



    componentWillReceiveProps(nextProps) {
        // console.log('user::componentWillReceiveProps', nextProps);

        this.setState(this.__getInitialState.call(this, nextProps));
    }



    // componentDidUpdate(nextProps, nextState) {
    //     console.log('user::componentDidUpdate::nextProps', nextProps);
    //     console.log('user::componentDidUpdate::nextState', nextState);
    // }



    render() {
        return (
            <section className='user-panel'>

                <section className='panel panel-info user-controls'>
                    <div className='panel-heading'><h4>
                        {(this.state.user.name && this.state.user.name.length)
                            ? `Edit User: ${this.state.user.name}`
                            : 'Create User'
                        }
                    </h4></div>

                    <div className='panel-body'>
                        {/*<div>ID: {this.props.id}</div>*/}
                        <div>
                            <h4><label htmlFor='user-name'>Name</label></h4>
                            <div>
                                <input
                                    type='text'
                                    className='input-lg'
                                    name='user-name'
                                    id='user-name'
                                    placeholder='New User'
                                    value={this.state.user.name}
                                    onChange={this.__setUserName.bind(this, this.props.id)}
                                />
                            </div>
                        </div>

                        <ul className='list-inline avatar-selector'>
                            {_.map(this.props.avatars, a => (
                                <li key={a.id}>
                                    <img
                                        onClick={this.__setUserAvatar.bind(this, this.props.id, a.id)}
                                        className={`avatar-option ${a.id === this.state.user.avatarId ? 'active' : ''}`}
                                        src={a.src}
                                    />
                                </li>
                            ))}
                        </ul>



                        <section className='friends-manager'>

                            <ul className='nav nav-tabs'>
                                <li className={this.state.activeTab === 'friends' ? 'active' : ''}>
                                    <a title='My Friends' onClick={() => this.setState({activeTab: 'friends'})}>
                                        <i className='fa fa-users'></i>
                                        <span className='nav-label'>Current Friends</span>
                                    </a>
                                </li>
                                <li className={this.state.activeTab === 'friends-add' ? 'active' : ''}>
                                    <a title='Find Friends' onClick={() => this.setState({activeTab: 'friends-add'})}>
                                        <i className='fa fa-user-plus'></i>
                                        <span className='nav-label'>Add Friends</span>
                                    </a>
                                </li>
                                <li className={this.state.activeTab === 'friends-network' ? 'active' : ''}>
                                    <a title='Friends Network' onClick={() => this.setState({activeTab: 'friends-network'})}>
                                        <i className='fa fa-cloud'></i>
                                        <span className='nav-label'>Show Friend Network</span>
                                    </a>
                                </li>
                            </ul>



                            <div className='tab-panels'>

                                <div className={`tab-content friends ${this.state.activeTab === 'friends' ? 'active' : ''}`}>
                                    <ul className='list-unstyled users-list current-friends'>
                                        {_.map(this.props.friends, friend => {
                                            const user = this.props.users[friend.friendId.toString()];

                                            return (
                                                <li key={user.id}>
                                                    <span className='friend-actions'>
                                                        <a title="Remove Friend" className='friend-action' onClick={this.__removeFriend.bind(this, this.props.id, user.id)}>
                                                            <i className='fa fa-user-times'></i>
                                                        </a>
                                                        <a title="Edit User" className='friend-action' onClick={this.__setActiveUser.bind(this, user.id)}>
                                                            <i className='fa fa-pencil-square-o'></i>
                                                        </a>
                                                    </span>

                                                    <span>
                                                        <img className='avatar' src={this.props.avatars[user.avatarId].src} />
                                                        {user.name}
                                                    </span>

                                                </li>
                                            );
                                        })}

                                        {this.props.friends.length === 0
                                            ? <li>No friends defined</li>
                                            : null
                                        }

                                    </ul>
                                </div>

                                <div className={`tab-content friends-add ${this.state.activeTab === 'friends-add' ? 'active' : ''}`}>
                                    <ul className='list-unstyled users-list non-friends'>
                                        {_.map(this.state.nonFriends, user => {

                                            return (
                                                <li key={user.id}>
                                                    <span className='friend-actions'>
                                                        <a title="Make Friend" className='friend-action' onClick={this.__addFriend.bind(this, this.props.id, user.id)}>
                                                            <i className='fa fa-user-plus'></i>
                                                        </a>
                                                        <a title="Edit User" className='friend-action' onClick={this.__setActiveUser.bind(this, user.id)}>
                                                            <i className='fa fa-pencil-square-o'></i>
                                                        </a>
                                                    </span>

                                                    <span>
                                                        <img className='avatar' src={this.props.avatars[user.avatarId].src} />
                                                        {user.name}
                                                    </span>

                                                </li>
                                            );
                                        })}

                                        {this.state.nonFriends.length === 0
                                            ? <li>Already friends with everyone</li>
                                            : null
                                        }

                                    </ul>
                                </div>
                                <div className={`tab-content friends-network ${this.state.activeTab === 'friends-network' ? 'active' : ''}`}>
                                    <div>
                                    </div>
                                </div>

                            </div>

                        </section>



                    </div>
                </section>




                <section className='panel panel-default'>
                    <div className='panel-heading'><h4>User List</h4></div>
                    <div className='panel-body'>
                        <ul className='list-unstyled users-list'>
                            {_.map(this.props.users, user => {
                                return (
                                    <li key={user.id}>
                                        <span className='friend-actions'>
                                            <a className='friend-action' onClick={this.__setActiveUser.bind(this, user.id)}>
                                                <i className='fa fa-pencil-square-o'></i>
                                            </a>
                                        </span>
                                        <span>
                                            <img className='avatar' src={this.props.avatars[user.avatarId].src} />
                                            {user.name}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>

                <pre>user: {JSON.stringify(this.state.user, null, '    ')}</pre>
                <pre>friends: {JSON.stringify(this.props.friends, null, '    ')}</pre>
                {/*<pre>users: {JSON.stringify(this.props.users, null, '    ')}</pre>*/}
            </section>
        );
    }


    __getUser(id) {
        return this.props.users[id];
    }


    __setActiveUser(id) {
        console.log(`user::__setActiveUser(${id})`);
        this.props.handlers.setActiveUser(id);
    }


    __setUserName(id, e) {
        console.log(`user::__setActiveUser(${id})`, e.target.value);
        this.props.handlers.setUserName(id, e.target.value);
    }


    __setUserAvatar(userId, avatarId) {
        console.log(`user::__setUserAvatar(${userId}, ${avatarId})`);
        this.props.handlers.setUserAvatar(userId, avatarId);
    }


    __addFriend(userId, friendId) {
        console.log(`user::__addFriend(${userId}, ${friendId})`);
        this.props.handlers.addFriend(userId, friendId);
    }


    __removeFriend(userId, friendId) {
        console.log(`user::__removeFriend(${userId}, ${friendId})`);
        this.props.handlers.removeFriend(userId, friendId);
    }
}





/*
 *
 * Export Module
 *
 */

module.exports = User;
