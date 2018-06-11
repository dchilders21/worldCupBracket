import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter'


class Home extends React.Component {
  constructor () {
    super()
    this.state = {
      isHidden: true
    }
  }
  render() {
    return(
      <div className="container">
          <div className="row col-md-6 instructions">
            <h4>Everyone ready to give up their mornings for the World Cup.  Of course you are.  That’s why you’re here.</h4>
            <p>This competition will be in two parts. </p>
            <p>1st part is the <b>Group Round</b> and 2nd part is the <b>Knock Round</b>.  For right now we are only focusing on the Group Round as that is all I have time to build.  Here are your steps…</p>
            <ul>
              <li>1. Fill out your email, name, and a bracket name (just in case you want to enter in multiple brackets).</li>
              <li>2. Predict the score of the first 48 group games, Groups A-H.</li>
              <li>3. Make sure you see your picks on the final confirmation page.  That way you know that your picks have been entered into the database.  Also, if you want to see your picks, at any time you can enter your email in the Find Bracket input box and it will bring up your picks.  You can download the picks also but it’s not formatted very well right now.  </li>
              <li>4.  Send $20 to either my PayPal (dchilers21@gmail.com) or my Venmo (@Chnkyfire) account.   After this you are in.  Good luck.</li>
            </ul>
            <p>In a couple of days I will set up a scoreboard page where you can see every bracket entered in and their current score and if they have paid.  By the start of the first game all of the non paid brackets will be removed.</p>
          </div>

          <div className="row col-md-6 instructions">

            <p>Scoring for the Group Round...</p>

            {!this.state.isHidden &&
            <div>
              <p>For each match you can earn a total of 40 points.</p>
              <ul>
                <li>
                  a. Team A correct number of goals scored
                </li>
                <li>
                  b. Team B correct number of goals scored
                </li>
                <li>
                  c. Correct prediction of win, lose, or draw
                </li>
                <li>
                  d. Correct spread i.e. correct difference between what the two teams score
                </li>
              </ul>
            </div>
            }
            </div>

            <div className="row col-md-6 instructions">
            <p>Scoring for the Knockout Round...</p>
            {!this.state.isHidden &&
            <div>
              You’ll need to come back to the site to complete the brackets.  Meaning your picks for who qualifies out of the group stages does not carry over.
            </div>
            }
            </div>


          <div className="row col-md-6 instructions">
            <p>Brief Notes</p>
            {!this.state.isHidden &&<div>
              <p>Also note that I am not participating in the bracket but only hosting it.  I’m trying to make something easy and simple that will help people enjoy the World Cup a little more.  </p>
              <p>DEADLINE to enter into the tournament is before the first game kickoff.  Send this to as many people as you want.  You must have completed all 4 steps (most importantly sending your money) in order for it to count. </p>
              <p>Any questions or comments or issues you see with the site,  email me at chnkyfire@gmail.com.  I’ll probably read it and may or may not get back to you.</p>
              <p>PS.  Bear with me with the site.  I’m putting it together as we go as I got a late jump on making it.    </p>
              <p>Winnings will be split 1st place 60%, 2nd place 25%, 3rd place 15% </p>
            </div>
            }
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing
})

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
