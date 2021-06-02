import { Contract, providers } from 'ethers'
import EscrowABI from '../artifacts/contracts/Escrow.sol/Escrow.json'

export async function lookupContract(address: string) {
  try {
    const provider = new providers.Web3Provider((window as any).ethereum)
    const contract = new Contract(address, EscrowABI.abi, provider)
    const depositor = await contract.depositor()
    const arbiter = await contract.arbiter()
    const beneficiary = await contract.beneficiary()
    const status = await contract.status()
    const balance = await provider.getBalance(contract.address)
    return {
      address,
      depositor,
      arbiter,
      beneficiary,
      status,
      balance,
    }
  } catch (err) {
    console.error(err)
  }
}
