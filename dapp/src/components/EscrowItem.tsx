import { Box, Button, Flex, Spacer } from '@chakra-ui/react'
import { BigNumber, Contract, utils } from 'ethers'

import { signer } from '../util'
import Escrow from '../artifacts/contracts/Escrow.sol/Escrow.json'

interface EscrowItemProps {
  address: string
  depositor: string
  arbiter: string
  beneficiary: string
  status: number
  balance: BigNumber
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
