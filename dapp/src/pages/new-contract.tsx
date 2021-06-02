import { Button, Divider, Input, FormControl, FormLabel, FormErrorMessage, Heading, useToast } from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import { BigNumber, ContractFactory, providers, utils } from 'ethers'

import Escrow from '../artifacts/contracts/Escrow.sol/Escrow.json'

import Navigation from '../components/Navigation'

const provider = new providers.Web3Provider((window as any).ethereum)

async function deploy(arbiter: string, beneficiary: string, value: BigNumber) {
  await (window as any).ethereum.request({ method: 'eth_requestAccounts' })
  const signer = provider.getSigner()
  const factory = new ContractFactory(Escrow.abi, Escrow.bytecode, signer)
  return factory.deploy(arbiter, beneficiary, { value })
}

function validateAddress(address: string) {
  let error

  if (!address || !utils.isAddress(address)) {
    error = 'Invalid address'
  }

  return error
}

function validateDeposit(value: string) {
  let error

  if (!value || !utils.parseEther(value)) {
    error = 'Invalid deposit'
  }

  return error
}

function NewContract() {
  const initialValues = { arbiterAddress: '', beneficiaryAddress: '', depositAmount: '' }
  const toast = useToast()

  return (
    <>
      <Navigation />
      <Heading as="h1" size="lg">
        New Contract
      </Heading>
      <Divider marginY={5} />
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, actions) => {
            try {
              const escrow = await deploy(
                values.arbiterAddress,
                values.beneficiaryAddress,
                utils.parseEther(values.depositAmount)
              )
              toast({
                title: 'Escrow created',
                status: 'success',
                duration: 9000,
                isClosable: true,
              })

              const escrowContracts: string[] = JSON.parse(String(localStorage.getItem('escrowContracts'))) || []
              escrowContracts.push(escrow.address)
              localStorage.setItem('escrowContracts', JSON.stringify(escrowContracts))
            } catch (err) {
              console.error(err)
              toast({
                title: 'Escrow was not created',
                status: 'warning',
                duration: 9000,
                isClosable: true,
              })
            } finally {
              actions.setSubmitting(false)
            }
          }}
        >
          {(props) => (
            <Form>
              <Field name="arbiterAddress" validate={validateAddress}>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.arbiterAddress && form.touched.arbiterAddress} marginBottom={2}>
                    <FormLabel htmlFor="arbiterAddress">Arbiter Address</FormLabel>
                    <Input {...field} id="arbiterAddress" placeholder="0x..." />
                    <FormErrorMessage>{form.errors.arbiterAddress}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="beneficiaryAddress" validate={validateAddress}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.beneficiaryAddress && form.touched.beneficiaryAddress}
                    marginBottom={2}
                  >
                    <FormLabel htmlFor="beneficiaryAddress">Beneficiary Address</FormLabel>
                    <Input {...field} id="beneficiaryAddress" placeholder="0x..." />
                    <FormErrorMessage>{form.errors.beneficiaryAddress}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="depositAmount" validate={validateDeposit}>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.depositAmount && form.touched.depositAmount}>
                    <FormLabel htmlFor="depositAmount">Deposit Amount (ETH)</FormLabel>
                    <Input {...field} id="depositAmount" placeholder="1" />
                    <FormErrorMessage>{form.errors.depositAmount}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button mt={4} type="submit" isLoading={props.isSubmitting} isDisabled={!props.isValid || !props.touched}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default NewContract
