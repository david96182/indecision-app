<template>
    <img v-if="img" :src="img" alt="bg">
    <div class="bg-dark"></div>
    <br>

    <div class="indecision-container">

        <input 
        type="text" 
        placeholder="Ask me anything"
        v-model="question">

        <p>Remember to end with a question mark (?)</p>
    
    <div>
        <br>
        <h2 v-if="isValidQuestion">{{ question }}</h2>
        <h1>{{ answer }}</h1>
    </div>

    </div>
  
</template>

<script>
export default {
    data() {
        return {
            question: null,
            answer: null,
            img: null,
            isValidQuestion: false
        }
    },
    methods: {
        async getAnswer() {
            try {
                this.answer = 'Thinking...'

                const { answer,image } =  await fetch('https://yesno.wtf/api').then( r => r.json() )
            
                this.answer = answer
                this.img = image
            } catch (error) {
                this.answer = 'couldnt load API'
                this.img = null
            }
            
        }
    },
    watch: {
        question( value, oldValue ) {

            this.isValidQuestion = false

            if ( !value.includes('?') ) return 

            this.isValidQuestion = true

            this.getAnswer()
        }
    }

}
</script>

<style>

    img, .bg-dark {
        height: 100vh;
        left: 0px;
        max-height: 100%;
        max-width: 100%;
        position: fixed;
        top: 0px;
        width: 100vw;
    }

    .bg-dark {
        background-color: rgba(0, 0, 0, 0.4);
    }

    .indecision-container {
        position: relative;
        z-index: 99;
    }
    
    input {
        width: 250px;
        padding: 10px 15px;
        border-radius: 5px;
        border: none;
    }
    input:focus {
        outline: none;
    }

    p {
        color: white;
        font-size: 20px;
        margin-top: 0px;
    }

    h1, h2 {
        color: white;
    }
    
    h2 {
        margin-top: 150px;
    }

</style>