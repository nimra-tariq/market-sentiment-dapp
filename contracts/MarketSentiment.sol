// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract MarketSentiment is Ownable {
    string[] public tickersArray;

    struct ticker {
        bool exists;
        uint256 up;
        uint256 down;
        mapping(address => bool) voters;
    }

    //mapping ticker name to its info
    mapping(string => ticker) private Tickers;

    event TickerUpdated(
        string ticker,
        uint256 up,
        uint256 down,
        address votter
    );

    /// @dev add new ticker to the list
    function addTicker(string memory _ticker) public onlyOwner {
        require(!Tickers[_ticker].exists, "ticker already exists");
        ticker storage _newTicker = Tickers[_ticker];
        _newTicker.exists = true;
        tickersArray.push(_ticker);
    }

    /// @dev vote a ticker up or down
    function vote(string memory _ticker, bool _vote) public {
        require(Tickers[_ticker].exists, "ticker does not exists");
        require(!Tickers[_ticker].voters[msg.sender], "can't vote twice");
        ticker storage t = Tickers[_ticker];
        t.voters[msg.sender] = true;
        if (_vote) t.up++;
        else t.down++;
        // console.log(t.down, "down");
        // console.log(t.up, "up");
        emit TickerUpdated(_ticker, t.up, t.down, msg.sender);
    }

    /// @dev getVote for a specific ticker
    function getVote(string memory _ticker)
        public
        view
        returns (uint256 _up, uint256 _down)
    {
        require(Tickers[_ticker].exists, "ticker does not exists");
        ticker storage t = Tickers[_ticker];
        return (t.up, t.down);
    }

    function totalTicker() public view returns (uint256 _tickerTicker) {
        return tickersArray.length;
    }
}
