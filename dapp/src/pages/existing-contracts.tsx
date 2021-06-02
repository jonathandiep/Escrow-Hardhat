import { useEffect, useState } from 'react'
import { Divider, Heading } from '@chakra-ui/react'

import { lookupContract } from '../util'

import EscrowItem from '../components/EscrowItem'
import Navigation from '../components/Navigation'

function ExistingContract() {
  const [escrowContracts, setEscrowContracts] = useState<any[]>([])

  useEffect(() => {
    async function getContracts() {
      let contracts: any = localStorage.getItem('escrowContracts')

      if (contracts) {
        contracts = JSON.parse(contracts).map((contract: string) => lookupContract(contract))
        const contractData = await Promise.all(contracts)
        setEscrowContracts(contractData)
      }

      return []
    }

    getContracts()
  }, [])

  return (
    <>
      <Navigation />
      <Heading as="h1" size="lg">
        Existing Contracts
      </Heading>
      <Divider m="2" />
      {escrowContracts.length > 0 ? (
        escrowContracts.map((escrowContract: any, index: number) => {
          return (
            <EscrowItem
              key={index}
              address={escrowContract.address}
              depositor={escrowContract.depositor}
              arbiter={escrowContract.arbiter}
              beneficiary={escrowContract.beneficiary}
              status={escrowContract.status}
              balance={escrowContract.balance}
            />
          )
        })
      ) : (
        <div>No escrows saved</div>
      )}
    </>
  )
}

export default ExistingContract
