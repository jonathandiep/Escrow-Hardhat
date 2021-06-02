import { Link as ReachLink, useMatch } from '@reach/router'
import { Button, Container, Link } from '@chakra-ui/react'

function Navigation() {
  const newContractMatch = useMatch('/')
  const existingContractsMatch = useMatch('/existing-contracts')
  const searchContractsMatch = useMatch('/search-contracts')

  return (
    <Container marginBottom={5} centerContent>
      <div>
        <Link as={ReachLink} to="/">
          <Button colorScheme="blue" variant={newContractMatch ? 'solid' : 'outline'} marginRight={3}>
            New Contract
          </Button>
        </Link>
        <Link as={ReachLink} to="/existing-contracts">
          <Button colorScheme="orange" variant={existingContractsMatch ? 'solid' : 'outline'} marginRight={3}>
            Existing Contracts
          </Button>
        </Link>
        <Link as={ReachLink} to="/search-contracts">
          <Button colorScheme="green" variant={searchContractsMatch ? 'solid' : 'outline'}>
            Search Contracts
          </Button>
        </Link>
      </div>
    </Container>
  )
}

export default Navigation
