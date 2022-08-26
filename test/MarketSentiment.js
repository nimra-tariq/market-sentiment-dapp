const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MarketSentiment Contract", async () => {
  let owner, add1, add2, add3, marketSentiment;

  beforeEach(async () => {
    [owner, add1, add2, add3] = await ethers.getSigners();
    const MarketSentiment = await ethers.getContractFactory("MarketSentiment");
    marketSentiment = await MarketSentiment.deploy();
  });

  //function addTicker
  describe("addTicker", () => {
    it("setting the owner", async () => {
      expect(await marketSentiment.owner()).to.be.equal(owner.address);
    });

    it("only owner can add new ticker reverts if called by other", async () => {
      await expect(
        marketSentiment.connect(add1).addTicker("btc")
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("reverts if the ticker already exists", async () => {
      await marketSentiment.addTicker("btc");
      await expect(marketSentiment.addTicker("btc")).to.be.revertedWith(
        "ticker already exists"
      );
    });

    it("updates the tickersArray after adding a ticker", async () => {
      await marketSentiment.addTicker("eth");
      expect(await marketSentiment.tickersArray(0)).to.equal("eth");
    });
  });

  describe("vote", async () => {
    it("reverts if the ticker does not exists", async () => {
      await expect(marketSentiment.vote("btc", true)).to.be.revertedWith(
        "ticker does not exists"
      );
    });

    it("reverts if the votter has already casted vote", async () => {
      await marketSentiment.addTicker("eth");
      await marketSentiment.connect(add1).vote("eth", true);
      await expect(
        marketSentiment.connect(add1).vote("eth", true)
      ).to.be.revertedWith("can't vote twice");
    });

    it("updates the vote up or down correctly", async () => {
      await marketSentiment.addTicker("eth");
      await marketSentiment.connect(add1).vote("eth", true);
      await expect(
        marketSentiment.connect(add1).vote("eth", true)
      ).to.be.revertedWith("can't vote twice");
    });

    it("updates up or down vote count and emits event TickerUpdated", async () => {
      await marketSentiment.addTicker("btc");
      await expect(marketSentiment.vote("btc", false))
        .to.emit(marketSentiment, "TickerUpdated")
        .withArgs("btc", 0, 1, owner.address);
    });
  });

  it("updates and sets up or down vote count", async () => {
    await marketSentiment.addTicker("eth");
    await marketSentiment.connect(add1).vote("eth", true); //add1 vote up
    await marketSentiment.connect(add2).vote("eth", true); //add2 vote up
    await expect(marketSentiment.vote("eth", false)) //owner's vote down
      .to.emit(marketSentiment, "TickerUpdated")
      .withArgs("eth", 2, 1, owner.address);
  });

  describe("getVote", () => {
    it("reverts if the ticker does not exists", async () => {
      await expect(marketSentiment.getVote("btc")).to.be.revertedWith(
        "ticker does not exists"
      );
    });

    it("returns the correct vote count", async () => {
      await marketSentiment.addTicker("eth");
      await marketSentiment.addTicker("btc");
      await marketSentiment.connect(add1).vote("eth", true); //add1 vote eth up
      await marketSentiment.connect(add2).vote("eth", false); //add2 vote eth down
      await marketSentiment.connect(add3).vote("btc", true); //add3 vote btc down
      await marketSentiment.connect(add2).vote("btc", true); //add3 vote btc down
      await marketSentiment.connect(add3).vote("eth", false); //add3 vote eth down
      //eth  1 up and 2 down
      const [up, down] = await marketSentiment.getVote("eth");
      expect(up, down).to.equal(1, 2);
      //btc 2 up and 0 down
      const { _up, _down } = await marketSentiment.getVote("btc");
      expect(_up, _down).to.equal(2, 0);
    });
  });
});
