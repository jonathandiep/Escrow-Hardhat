import { Box, Button, Flex, Spacer } from '@chakra-ui/react'
import { BigNumber, Contract, providers, utils } from 'ethers'

import Escrow from '../artifacts/contracts/Escrow.sol/Escrow.json'

interface EscrowItemProps {
  address: string
  depositor: string
  arbiter: string
  beneficiary: string
  status: number
  balance: BigNumber
}

let provider: providers.Web3Provider
let signer: providers.JsonRpcSigner

try {
  provider = new providers.Web3Provider((window as any).ethereum)
  signer = provider.getSigner()
} catch (err) {
  console.error(err)
}

async function approveEscrow(address: string) {
  const contract = new Contract(address, Escrow.abi, signer)
  await contract.approve()
}

async function declineEscrow(address: string) {
  const contract = new Contract(address, Escrow.abi, signer)
  await contract.decline()
}

function EscrowItem({ address, depositor, arbiter, beneficiary, status, balance }: EscrowItemProps) {
  let statusMsg

  switch (status) {
    case 0:
      statusMsg = 'Pending'
      break
    case 1:
      statusMsg = 'Approved'
      break
    case 2:
      statusMsg = 'Declined'
      break
  }
  return (
    <Box key={address} margin={3}>
      <p>
        <strong>Escrow Address:</strong> {address}
      </p>
      <p>
        <strong>Depositor:</strong> {depositor}
      </p>
      <p>
        <strong>Arbiter:</strong> {arbiter}
      </p>
      <p>
        <strong>Beneficiary:</strong> {beneficiary}
      </p>
      <p>
        <strong>Status:</strong> {statusMsg}
      </p>
      {status === 0 ? (
        <>
          <p>
            <strong>Balance:</strong> {utils.formatEther(balance)} ETH
          </p>
          <Flex mb="8">
            <Spacer />
            <Box mr="3">
              <Button colorScheme="green" onClick={() => approveEscrow(address)}>
                Approve
              </Button>
            </Box>
            <Box>
              <Button colorScheme="red" onClick={() => declineEscrow(address)}>
                Decline
              </Button>
            </Box>
          </Flex>
        </>
      ) : null}
    </Box>
  )
}

export default EscrowItem
