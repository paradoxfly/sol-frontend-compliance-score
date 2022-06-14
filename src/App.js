import { Box, Heading, FormControl, FormLabel, Select, Button, Text } from '@chakra-ui/react';
import { useState } from 'react';
import './App.css';

const initialValues = {
  equity: 0,
  decentralization: 0,
  participation: 0,
  investment: 0,
  utility: 0,
  purpose: 0,
  control: 0,
  derivatives: 0,
  'common enterprise': 0,
}

const mydict = [
  'Good',
  'Acceptable',
  'Outstanding',
  'Marginal'
]

const headers = Object.keys(initialValues)

function App() {

  const [ dto, setDto ] = useState(initialValues);
  const [ prod, setProd ] = useState(undefined)
  const [ compliance, setCompliance ] = useState(undefined)
  const [ memo, setMemo ] = useState(undefined)

  const onChange = (e) => {
    const { name, value } = e.target;
    setDto(() => ({
        ...dto,
        [name]: parseInt(value) ,
    }));
  };

  const onSubmit = () => {
    let product = 1
    for(let element of headers){
      product *= dto[element]
    }
    console.log('product', product)
    const complianceScore = Math.pow((1/9), product)
    console.log('Compliance Score', complianceScore)

    let result =  null
    if(complianceScore < 0.5 ) result = 0 
    else if(complianceScore >= 0.5 ) result = 1
    setMemo(result)
    setProd(product)
    setCompliance(complianceScore)

    //send result variable to sol backend here
    
  }
  return (
    <div className='wrapper'>
      <Heading textAlign={'center'}>Solana Compliance Score</Heading>
      <Box>
        {
          headers.map((value, index) => (
            <FormControl isRequired marginTop={'20px'} padding={'4px'} key={index}>
              <FormLabel textTransform={'capitalize'} htmlFor={value}>{value}</FormLabel>
              <Select
                name={value}
                id={value}
                value={dto[value]}
                onChange={onChange}>
                {
                  mydict.map((type, index) => (
                    <option  key={index} value={index}>{type}</option>
                  ))
                }
              </Select>
            </FormControl>
          ))
        }
        <Button 
          variant={'solid'} 
          colorScheme={'green'} 
          margin={'35px auto'}
          onClick={onSubmit}
        >
          Calculate Compliance Score
        </Button>
      </Box>
      
      {/* Can Delete This Part */}
      <Box>
        <Text>Product: {prod}</Text>
        <Text>Compliance: {compliance}</Text>
        <Text>Memo: {memo}</Text>
      </Box>
    </div>
  );

  
}

export default App;
