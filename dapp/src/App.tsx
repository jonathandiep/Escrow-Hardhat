import { RouteComponentProps, Router } from '@reach/router'
import { Button, Container, Flex, Heading, Spacer, useColorMode } from '@chakra-ui/react'

import ExistingContract from './pages/existing-contracts'
import NewContract from './pages/new-contract'
import SearchContracts from './pages/search-contracts'

const ExistingContractPage = (props: RouteComponentProps) => <ExistingContract />
const NewContractPage = (props: RouteComponentProps) => <NewContract />
const SearchContractPage = (props: RouteComponentProps) => <SearchContracts />

function App() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
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
