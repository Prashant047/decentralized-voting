import React ,{useState, useEffect} from 'react';

import './bootstrap.min.css';

const App = (props) => {
	const [candidates, setCandidates] = useState([]);
	const [message, setMessage] = useState('');
	const [voted, setVoted] = useState(null);

	useEffect(() => {
		async function activate(){

			let candiArr = [];
			for(let x=0;x<4;x++){
				let {name, party} = await props.Voting.methods.candidates(props.web3.utils.toHex(x)).call();
				name = props.web3.utils.hexToAscii(name);
				party = props.web3.utils.hexToAscii(party);
				candiArr.push({
					name,
					party,
					votes: props.web3.utils.hexToNumber(
						await props.Voting.methods.voteRecord(props.web3.utils.toHex(x+1)).call()
					)
				})
			}	


			// console.log(props.da);
			const hasVoted = await props.Voting.methods.voted(props.da).call();
			// console.log(hasVoted);
			setVoted(hasVoted);
			if(hasVoted){
				setMessage('You have already voted')
			}
			setCandidates(candiArr);
		}
		activate();
	},[])

	function handleVoteClick(e){
		let votedFor = e.target.getAttribute('id');
		console.log(`Voted for: ${votedFor}`);

		props.Voting.methods.vote(props.web3.utils.toHex(votedFor), props.da).send({from:props.da})
		.on('transactionHash', (hash) => {
			console.log(hash);
		})
		.on('confirmation', (confirmationNumner, recepit) => {
			console.log(confirmationNumner, recepit);
			setVoted(true);
			setMessage('Your vote has been recorded');
		});
	}

	const CandidatesDisplayTable = (props) => {
		if(candidates.length !== 0){
			return (
				<table className="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Party</th>
						<th scope="col">Votes</th>
					</tr>
				</thead>
				<tbody>
				{
					candidates.map((candi, index) => (
						<tr key={index}>
							<th scope="row">{index+1}</th>
							<td>{candi.name}</td>
							<td>{candi.party}</td>
							<td>
							{voted?(

								<button 
								className="btn btn-primary" 
								id={index+1} 
								type="button" 
								onClick={handleVoteClick} disabled>Vote</button>
							
							):(
								
								<button 
								className="btn btn-primary" 
								id={index+1} 
								type="button" 
								onClick={handleVoteClick}>Vote</button>
							
							)}
							</td>
						</tr>
					))	
				}
				</tbody>
				</table>
			);
		}		
		else{
			return <h3>Loading Candidate List</h3>;
		}
	}

	return (
		<div className="container">
			<CandidatesDisplayTable/>
			<div className="row">
				<div className="col text-primary">Your account ID: {props.da}</div>
			</div>
			<div className="row">
				<div className="col text-info">{message}</div>
			</div>
		</div>
	);
};


export default App;
