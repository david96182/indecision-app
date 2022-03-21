
describe( 'Example Component', () => {

  test( 'Must be greater than 10', () => {

    //Arreglar
    let value = 10

    //Estimulo
    value = value + 2

    //Observar el resultado
    expect(value).toBeGreaterThan(10)
    


  } )
} )
