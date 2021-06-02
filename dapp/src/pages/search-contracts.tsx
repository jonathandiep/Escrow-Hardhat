import { useState } from 'react'
import { Button, Divider, Heading, Input } from '@chakra-ui/react'

import { lookupContract } from '../util'
import EscrowItem from '../components/EscrowItem'
import Navigation from '../components/Navigation'

function SearchContracts() {
  const [addressInput, setAddressInput] = useState('')
  const [escrowContract, setEscrowContract] = useState<any>()
  return (
    <>
      <Navigation />
      <Heading as="h1" size="lg">
        Search Escrow Contracts
      </Heading>
      <Input placeholder="Search by contract address" margin={2} onChange={(e) => setAddressInput(e.target.value)} />
      <Button margin={2} onClick={async () => setEscrowContract(await lookupContract(addressInput))}>
        Submit
      </Button>
      <Divider margin={2} />
      {escrowContract ? (
        <EscrowItem
          address={escrowContract.address}
          depositor={escrowContract.depositor}
          arbiter={escrowContract.arbiter}
          beneficiary={escrowContract.beneficiary}
          status={escrowContract.status}
          balance={escrowContract.balance}
        />
      ) : null}
    </>
  )
}

export default SearchContracts
