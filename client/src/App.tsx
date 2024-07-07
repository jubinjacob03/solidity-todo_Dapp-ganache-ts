import React, { useState, useEffect } from 'react';
import { web3, instance } from './web3';

const App: React.FC = () => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [candidates, setCandidates] = useState<string[]>([]);
  const [votes, setVotes] = useState<{ [key: string]: number }>({});
  const [newVote, setNewVote] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      try {
        if (!web3) {
          throw new Error('Web3 instance not initialized.');
        }

        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);

        const candidateList = await instance.methods.candidateList().call();
        setCandidates(candidateList);

        const votesData: { [key: string]: number } = {};
        for (let candidate of candidateList) {
          const voteCount = await instance.methods.totalVotesFor(candidate).call();
          votesData[candidate] = parseInt(voteCount);
        }
        setVotes(votesData);
      } catch (error) {
        console.error('Error initializing web3:', error);
      }
    };

    init();
  }, []);

  const handleVote = async () => {
    try {
      if (!web3) {
        throw new Error('Web3 instance not initialized.');
      }

      await instance.methods.voteForCandidate(newVote).send({ from: accounts[0] });
      const voteCount = await instance.methods.totalVotesFor(newVote).call();
      setVotes({
        ...votes,
        [newVote]: parseInt(voteCount)
      });
    } catch (error) {
      console.error('Error handling vote:', error);
    }
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
