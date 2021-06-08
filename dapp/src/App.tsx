import { useState } from 'react'
import { RouteComponentProps, Router } from '@reach/router'
import { Button, Container, Flex, Heading, Spacer, useColorMode } from '@chakra-ui/react'

import ExistingContract from './pages/existing-contracts'
import NewContract from './pages/new-contract'
import SearchContracts from './pages/search-contracts'

import { provider } from './util'

const ExistingContractPage = (props: RouteComponentProps) => <ExistingContract />
const NewContractPage = (props: RouteComponentProps) => <NewContract />
const SearchContractPage = (props: RouteComponentProps) => <SearchContracts />

function App() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [network, setNetwork] = useState('')

  if (!(window as any).ethereum) {
    return <Container>MetaMask or Web3 browser required</Container>
  }

  provider.on('network', (newNetwork, oldNetwork) => {
    const networkName = newNetwork.name === 'unknown' ? 'localhost(?)' : newNetwork.name
    setNetwork(networkName)

    if (oldNetwork) {
      window.location.reload()
    }
  })

  return (
    <>
      {network ? <Button m="3">{network}</Button> : null}
      <Container marginTop={5}>
        <Flex mb="5">
          <Heading>Escrow App</Heading>
          <Spacer />
          <Button size="sm" onClick={toggleColorMode}>
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button>
        </Flex>
        <Router>
          <ExistingContractPage path="/existing-contracts" />
          <SearchContractPage path="/search-contracts" />
          <NewContractPage path="/" />
        </Router>
      </Container>
    </>
  )
}

export default App
