import React, { useState, useEffect } from 'react';
import getWeb3 from './web3';
import Voting from './Voting';

const App: React.FC = () => {
  const [web3, setWeb3] = useState<any>(null);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [candidates, setCandidates] = useState<string[]>([]);
  const [votes, setVotes] = useState<{ [key: string]: number }>({});
  const [newVote, setNewVote] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      setWeb3(web3);
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);

      const candidateList = await Voting.methods.candidateList().call();
      setCandidates(candidateList);

      const votesData: { [key: string]: number } = {};
      for (let candidate of candidateList) {
        const voteCount = await Voting.methods.totalVotesFor(candidate).call();
        votesData[candidate] = parseInt(voteCount);
      }
      setVotes(votesData);
    };

    init();
  }, []);

  const handleVote = async () => {
    await Voting.methods.voteForCandidate(newVote).send({ from: accounts[0] });
    const voteCount = await Voting.methods.totalVotesFor(newVote).call();
    setVotes({
      ...votes,
      [newVote]: parseInt(voteCount)
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Voting DApp</h1>
      <div className="mt-4">
        {candidates.map((candidate, index) => (
          <div key={index} className="mb-2">
            <span className="mr-2">{candidate}:</span>
            <span>{votes[candidate]}</span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          value={newVote}
          onChange={(e) => setNewVote(e.target.value)}
          className="border p-2"
          placeholder="Candidate name"
        />
        <button
          onClick={handleVote}
          className="bg-blue-500 text-white p-2 ml-2"
        >
          Vote
        </button>
      </div>
    </div>
  );
};

export default App;
