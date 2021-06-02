const { assert, expect } = require('chai');

describe('Escrow', function () {
  let contract;
  let depositor;
  let beneficiary;
  let arbiter;
  const deposit = ethers.utils.parseEther('1');
  beforeEach(async () => {
    depositor = ethers.provider.getSigner(0);
    beneficiary = ethers.provider.getSigner(1);
    arbiter = ethers.provider.getSigner(2);
    const Escrow = await ethers.getContractFactory('Escrow');
    contract = await Escrow.deploy(
      arbiter.getAddress(),
      beneficiary.getAddress(),
      {
        value: deposit,
      }
    );
    await contract.deployed();
  });

  it('should be funded initially', async () => {
    let balance = await ethers.provider.getBalance(contract.address);
    assert.equal(balance.toString(), deposit.toString());
  });

  describe('after approval from address other than the arbiter', () => {
    it('should revert', async () => {
      let ex;
      try {
        await contract.connect(beneficiary).approve();
      } catch (_ex) {
        ex = _ex;
      }
      assert(
        ex,
        'Attempted to approve the Escrow from the beneficiary address. Expected transaction to revert!'
      );
    });
  });

  describe('after approval from the arbiter', () => {
    it('should transfer balance to beneficiary', async () => {
      const before = await ethers.provider.getBalance(beneficiary.getAddress());
      await contract.connect(arbiter).approve();
      const after = await ethers.provider.getBalance(beneficiary.getAddress());
      assert.equal(after.sub(before).toString(), deposit.toString());
      assert.equal(await contract.status(), 1);
    });
  });

  describe('decline escrow from random address', () => {
    it('should revert', async () => {
      let err;
      try {
        await contract.connect(ethers.provider.getSigner(5)).decline();
      } catch (_err) {
        err = _err;
      }
      assert(
        err,
        'Attempted to decline the Escrow from the depositor address. Expected transaction to revert!'
      );
    });
  });

  describe('after decline from the depositor', () => {
    it('should transfer deposit back to depositor', async () => {
      const before = await ethers.provider.getBalance(depositor.getAddress());
      await contract.decline();
      const after = await ethers.provider.getBalance(depositor.getAddress());
      assert(
        before.lt(after),
        'Expected deposited funds to return back to depositor'
      );
      assert.equal(await contract.status(), 2);
    });
  });

  describe('after decline from the arbiter', () => {
    it('should transfer deposit back to depositor', async () => {
      const before = await ethers.provider.getBalance(depositor.getAddress());
      await contract.connect(arbiter).decline();
      const after = await ethers.provider.getBalance(depositor.getAddress());
      assert(
        before.lt(after),
        'Expected deposited funds to return back to depositor'
      );
    });
  });

  describe('after decline from the beneficiary', () => {
    it('should transfer deposit back to depositor', async () => {
      const before = await ethers.provider.getBalance(depositor.getAddress());
      await contract.connect(beneficiary).decline();
      const after = await ethers.provider.getBalance(depositor.getAddress());
      assert(
        before.lt(after),
        'Expected deposited funds to return back to depositor'
      );
    });
  });
});
