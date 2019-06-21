pragma solidity >=0.5.0 <0.7.0;

contract Voting{
	// address public voter;
	uint public numVoted;
	uint public numCandidates;

	struct Candidate{
		bytes32 name;
		bytes32 party;
	}

	event Voted(uint cid);
	
	mapping (address => bool) public voted;
	mapping (uint => Candidate) public candidates;
	mapping (uint => uint) public voteRecord;

	function addCandidate(bytes32 _name, bytes32 _party) private {
		uint candidateID = numCandidates++;
		candidates[candidateID] = Candidate(_name, _party);
		
	}
	
	constructor() public {
		addCandidate("Candidate1", "PartyA");
		addCandidate("Candidate2", "PartyB");
		addCandidate("Candidate3", "PartyC");
		addCandidate("Candidate4", "PartyD");

	}

	function vote(uint candidateID, address voter) public {
		require(!voted[voter], "You have already voted!!");
		// require(candidates[candidateID],"Candidate dosent existo");

		voted[voter] = true;
		numVoted++;
		voteRecord[candidateID]++;
		emit Voted(candidateID);
	}
	
	// function setVoter(address _voter) public{
	// 	voter = _voter;
	// }
}
