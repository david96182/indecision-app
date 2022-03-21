import { shallowMount} from '@vue/test-utils'
import Counter from '@/components/Counter'

describe('Counter Component', () => {

    let wrapper

    beforeEach( () => {
        wrapper = shallowMount( Counter )
    })

    //test('Debe de hacer match con el snapshot', () => {

        //const wrapper = shallowMount( Counter )

        //expect( wrapper.html() ).toMatchSnapshot()
    //})

    test('h2 debe de tener el valor por defecto', () => {

        expect( wrapper.find('h2').exists()).toBeTruthy()

        const h2Value = wrapper.find('h2').text()

        expect(h2Value).toBe('Counter')

    })

    test('el valor por defecto debe de ser 100 en el p', () => {

        const value = wrapper.find('[data-testid="counter"]').text()

        expect(value).toBe('100')
        
    })

    test('debe de incrementar y decrementar en 1 el valor del contador', async() => {

        const [increasebtn,decreasebtn] = wrapper.findAll('button')

        await increasebtn.trigger('click')
        await increasebtn.trigger('click')
        await increasebtn.trigger('click')

        await decreasebtn.trigger('click')
        await decreasebtn.trigger('click')

        const value = wrapper.find('[data-testid="counter"]').text()

        expect(value).toBe('101')

    })

    test('debe de establecer el valor por defecto', () => {

        const start = wrapper.props('start')
        const value = wrapper.find('[data-testid="counter"]').text()
        
        expect( Number(value)).toBe( start )

    })

    test('debe de mostrar que la prop title', () => {

        const title = 'Hola Mundo!!!!!'

        const wrapper = shallowMount( Counter, { 
            props: { 
                title,
                start: '5'
             }
        } )

        expect(wrapper.find('h2').text()).toBe( title )

        
    })

})