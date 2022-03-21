import { shallowMount } from '@vue/test-utils'
import Indecision from '@/components/Indecision'

describe('Indecision component', () => {

    let wrapper
    let clgSpy

    global.fetch = jest.fn( () => Promise.resolve({
        json: () => Promise.resolve({
            "answer": "yes",
            "forced": false,
            "image": "https://yesno.wtf/assets/yes/2.gif"
        })
    }))

    beforeEach( () => {
        wrapper = shallowMount( Indecision )

        clgSpy = jest.spyOn( console, 'log' )

        jest.clearAllMocks()
    })

    test('Must match with snapshot', () => {

        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('Write in the input shouldnt trigger anything (console.log())', async() => {
        
        const getAnswerSpy = jest.spyOn( wrapper.vm , 'getAnswer' )

        const input = wrapper.find('input')
        await input.setValue('Hello world')

        expect( clgSpy ).toHaveBeenCalledTimes(1)
        expect( getAnswerSpy).not.toHaveBeenCalled()

    }) 

    test('Write (?) must trigger getAnswer', async() => {

        const getAnswerSpy = jest.spyOn( wrapper.vm , 'getAnswer' )

        const input = wrapper.find('input')
        await input.setValue('Hello world?')

        expect( clgSpy ).toHaveBeenCalledTimes(1)
        expect( getAnswerSpy).toHaveBeenCalled()

    })

    test('getAnswers tests', async() => {

        await wrapper.vm.getAnswer()

        const img = wrapper.find('img')
        
        expect(img.exists()).toBeTruthy()
        expect(wrapper.vm.img).toBe("https://yesno.wtf/assets/yes/2.gif")
        expect(wrapper.vm.answer).toBe("Yes")


    })

    test('tests in getAnswer - API fail', async() => {
        
        fetch.mockImplementationOnce( () => Promise.reject('API is down') )
         
        await wrapper.vm.getAnswer()
        const img = wrapper.find('img')

        expect(img.exists()).toBeFalsy()
        expect(wrapper.vm.answer).toBe("couldnt load API")
    })

})