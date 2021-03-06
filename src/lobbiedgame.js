import React, { Component } from 'react';
import gql from "graphql-tag";
import { Subscription } from "react-apollo";
import ChattyGame from './chattygame.js';

const WATCH_PLAYERS = gql`
subscription enuf {
  enough_players {
    root
  }
}
`;
// TODO make this not render the game when in lobby mode
class LobbiedGame extends Component {
  render() {
      return(
            <Subscription subscription={WATCH_PLAYERS}>
             {({ loading, error, data }) => {
        	       if (loading) return <span>Loading...</span>;
        	       if (error) return <span>Error :</span>;

        	       return (
                        <div>
                            <ChattyGame playerid={this.props.playerid}/>
                		    <div id="notenoughplayers"
                                style={
                                       (data.enough_players[0].root.enough_players  ?
                                       {display: "none"} :
                                       {display: "block"})}>
                    		    <p>{data.enough_players[0].root.enough_players  ?
                                    "enough" :
                                    "notenough"}</p>
                                <p>{this.props.playerid}</p>
                		    </div>
                        </div>
                    );
        	}}
        	</Subscription>
        );
  }
}

export default LobbiedGame;
