import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import matches from '../../matches'

class TableCalculator extends React.Component {
  componentDidMount() {
    // console.log(this.props.step);
  }

  toTitleCase = str => {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, finalStep, prevStep, formValues, groupName } = this.props
    const stats = {
      team: '',
      pl: 0,
      w: 0,
      d: 0,
      l: 0,
      pt: 0,
      gf: 0,
      ga: 0,
      gd: 0
    }

    let groupMatches;
    let results = {};
    let data = [];

    // Only pull in the relevant group from matches
    for (var m in matches) {
      if (Object.keys(matches[m])[0] == groupName) {
        groupMatches = [...matches][m][groupName];
      }
    }

    // Using 'matches' layout
    for (var d in formValues) {
      if (!(d.includes("user"))) {
        var matchNumber = d.substring(7, 13);
        var team = d.substring(14);
        team = team.replace(/_/g, ' ');
        team = this.toTitleCase(team);
        // add stats to team and push the team to
        if (!(team in results)) {
          results[team] = {...stats};
          results[team].team = team;
        }
        //console.log(results);
        //console.log('the top is results');
        groupMatches[matchNumber][team] = formValues[d];
      }
    }

    //console.log(groupMatches);
    console.log( " -------- begin ------- ")
    console.log(results);

    for (var match in groupMatches) {

      console.log(groupMatches[match]);
      // If both teasms are entered
      const team1 = Object.keys(groupMatches[match])[0];
      const team2 = Object.keys(groupMatches[match])[1];
      //console.log(team1);
      //console.log(team2);
      const score1 = groupMatches[match][team1];
      const score2 = groupMatches[match][team2];
      // console.log(score1);
      // console.log(score2);
      //console.log(' ============== ');
      if ((score1 !== "") && (score2 !== "")) {
        // Goals For/Goals Against
        // console.log(team1);
        results[team1] = {...stats};
        results[team2] = {...stats};
        results[team1].pl+= 1;
        results[team2].pl += 1;
        console.log(results);
        console.log("< ======== if end ===== >")
        console.log('MATCHESSSSS', matches);
        //console.log(results[team2]['pl']);
        //console.log(results[team1]['pl']);
        results[team1]['gf'] += Number(score1), results[team1]['ga'] += Number(score2);
        results[team2]['ga'] += Number(score1), results[team2]['gf'] += Number(score2);

        // Goal Differential
        results[team1]['gd'] = results[team1]['gf'] - results[team1]['ga'];
        results[team2]['gd'] = results[team2]['gf'] - results[team2]['ga'];

        // Determine Win, Loss, Draw / Give them the points
        if (score1 > score2) {
          results[team1]['w']++;
          results[team2]['l']++;

          results[team1]['pt'] += 3;
        } else if (score2 > score1) {
          results[team1]['l']++;
          results[team2]['w']++;

          results[team2]['pt'] += 3;
        } else {
          results[team1]['d']++, results[team2]['d']++;
          results[team1]['pt'] += 1, results[team2]['pt'] += 1;
        }
      }
    }

    // Putting the data in the format the table needs
   for (var r in results) {
     data.push(results[r]);
   }

   // Sort the data by Points then if a tie by Goal Differential
   data.sort(function(obj1, obj2) {
    if (obj2.pt == obj1.pt) {
      return obj2.gd - obj1.gd;
    } else {
      return obj2.pt - obj1.pt;
    }
  });

  // Loop to set the rank attribute to the index it's in the array
  for (var i in data) {
    data[i].rank = Number(i)+ Number(1);
  }

    return(
      <div>
        <BootstrapTable data={data} striped hover>
            <TableHeaderColumn isKey dataField='rank'>Rank</TableHeaderColumn>
            <TableHeaderColumn dataField='team'>Team</TableHeaderColumn>
            <TableHeaderColumn dataField='pl'>PL</TableHeaderColumn>
            <TableHeaderColumn dataField='w'>W</TableHeaderColumn>
            <TableHeaderColumn dataField='d'>D</TableHeaderColumn>
            <TableHeaderColumn dataField='l'>L</TableHeaderColumn>
            <TableHeaderColumn dataField='pt'>PT</TableHeaderColumn>
            <TableHeaderColumn dataField='gf'>GF</TableHeaderColumn>
            <TableHeaderColumn dataField='ga'>GA</TableHeaderColumn>
            <TableHeaderColumn dataField='gd'>GD</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  step: state.counter.count,
  bracket: state.bracket
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableCalculator)
