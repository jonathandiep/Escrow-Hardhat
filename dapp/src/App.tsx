import { RouteComponentProps, Router } from '@reach/router'
import { Container } from '@chakra-ui/react'

import ExistingContract from './pages/existing-contracts'
import NewContract from './pages/new-contract'
import SearchContracts from './pages/search-contracts'

const ExistingContractPage = (props: RouteComponentProps) => <ExistingContract />
const NewContractPage = (props: RouteComponentProps) => <NewContract />
const SearchContractPage = (props: RouteComponentProps) => <SearchContracts />

function App() {
  return (
    <Container marginTop={5}>
      <Router>
        <ExistingContractPage path="/existing-contracts" />
        <SearchContractPage path="/search-contracts" />
        <NewContractPage path="/" />
      </Router>
    </Container>
  )
}

export default App
